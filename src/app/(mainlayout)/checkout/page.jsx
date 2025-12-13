"use client";

import CheckoutTracker from "@/components/analytics/CheckoutTracker";
import { updatePixelUserData } from "@/components/analytics/FacebookPixel";
import {
  CheckoutLayout,
  DeliveryForm,
  OrderSummary,
  PaymentForm,
} from "@/components/checkout";
import { useCart } from "@/context/CartContext";
import { getAddressDetails, getFullAddressFromIds } from "@/lib/getAddressById";
import { API_CONFIG } from "@/services";
import { storeCustomerDataForPixel } from "@/utils/pixelMatchingHelpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, updateVariantQuantity, removeVariant, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    phoneNumber: "",
    address: "",
    addressField: null,
    shippingMethod: "inside-dhaka",
    billingAddress: "same",
    note: "",
  });

  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CREATE_ORDER}`;
  const incomplete_order_url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CREATE_IN_COMPLETE_ORDER}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let updatedFormData;
    if (name === "addressField" && typeof value === "object") {
      updatedFormData = {
        ...formData,
        addressField: {
          ...(formData.addressField || {}),
          ...value,
        },
      };
    } else {
      updatedFormData = {
        ...formData,
        [name]: value,
      };
    }

    setFormData(updatedFormData);

    if (name === "name" || name === "phoneNumber") {
      storeCustomerDataForPixel({
        name: updatedFormData.name,
        phone: updatedFormData.phoneNumber,
      });

      updatePixelUserData({
        name: updatedFormData.name,
        phone: updatedFormData.phoneNumber,
      });
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (items.length === 0) {
      router.push("/");
    }
  }, [items.length, router]);

  useEffect(() => {
    const phoneNumber = formData.phoneNumber;
    const customerName = formData.name;

    if (phoneNumber?.length !== 11) return;

    const debounceTimer = setTimeout(() => {
      const abortController = new AbortController();

      const fetchIncompleteOrder = async () => {
        try {
          await fetch(incomplete_order_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customerPhone: phoneNumber,
              customerName: customerName || "",
            }),
            signal: abortController.signal,
          });
        } catch (error) {
          if (error.name === "AbortError") return;

          console.error("Incomplete order tracking failed:", error);
        }
      };

      fetchIncompleteOrder();

      return () => abortController.abort();
    }, 800);

    return () => clearTimeout(debounceTimer);
  }, [formData.phoneNumber, formData.name, incomplete_order_url]);

  const prepareOrderProducts = () => {
    const products = [];

    items.forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach((variant) => {
          if (variant.quantity > 0 && variant.variantId) {
            products.push({
              productId: product.id,
              productQuantity: variant.quantity,
              variantId: String(variant.variantId),
            });
          }
        });
      }
    });

    return products;
  };

  const createOrderPayload = (products, totalBill, deliveryCost) => {
    const fullAddress = formData.addressField
      ? getFullAddressFromIds(formData.addressField, formData.address || "")
      : formData.address || "";

    const addressDetails = formData.addressField
      ? getAddressDetails(formData.addressField)
      : {
          division: { name: "" },
          district: { name: "" },
          upazila: { name: "" },
          union: { name: "" },
        };

    return {
      order: {
        customerPhone: formData.phoneNumber,
        customerName: formData.name,
        customerAddress: fullAddress,
        totalBill: totalBill,
        collectable: totalBill,
        deliveryCost: deliveryCost,
        status: "PROCESSING",
        orderNote: formData.note || "",
        customerDivision: addressDetails.division.name || "",
        customerDistrict: addressDetails.district.name || "",
        customerUpazila: addressDetails.upazila.name || "",
        customerUnion: addressDetails.union.name || "",
        tenantName: process.env.NEXT_PUBLIC_TANENT_NAME,
        source: "checkout_page",
        products,
        comboPacks: [],
      },
    };
  };

  const handlePayNow = async () => {
    if (!formData.name || !formData.phoneNumber || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.phoneNumber.length !== 11) {
      toast.error("Please enter a valid 11-digit phone number");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      const products = prepareOrderProducts();

      if (products.length === 0) {
        toast.error("No items in cart to order");
        setIsProcessing(false);
        return;
      }

      const orderData = createOrderPayload(products, total, shippingCost);

      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(orderData));

      const response = await fetch(url, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Order submission failed: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();

      toast.success(
        `অর্ডার সফলভাবে গৃহীত হয়েছে!\n\nআপনার অর্ডার নম্বর: ${
          result?.data?.id || "N/A"
        }\n\nআমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।`,
        { duration: 5000 }
      );

      clearCart();

      const orderId = result?.data?.id || "";
      setTimeout(() => {
        router.push(`/?payment=success${orderId ? `&orderId=${orderId}` : ""}`);
      }, 1500);
    } catch (error) {
      console.error("❌ Order submission error:", error);
      toast.error(
        `অর্ডার জমা দেওয়ার সময় একটি ত্রুটি হয়েছে।\n\nError: ${error.message}\n\nঅনুগ্রহ করে আবার চেষ্টা করুন।`,
        { duration: 5000 }
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = items.reduce((sum, product) => {
    return (
      sum +
      product.variants.reduce((variantSum, variant) => {
        const price = variant.discountPrice || variant.price || 0;
        return variantSum + price * variant.quantity;
      }, 0)
    );
  }, 0);

  const shippingCost =
    formData.shippingMethod === "inside-dhaka"
      ? 0
      : formData.shippingMethod === "inside-tangail"
      ? 70
      : 100;
  const total = subtotal + shippingCost;

  const orderSummary = (
    <OrderSummary
      items={items}
      subtotal={subtotal}
      shippingCost={shippingCost}
      total={total}
      onUpdateQuantity={updateVariantQuantity}
      onRemoveItem={removeVariant}
    />
  );

  return (
    <>
      <CheckoutTracker cartItems={items} />

      <CheckoutLayout orderSummary={orderSummary}>
        <DeliveryForm
          formData={formData}
          onInputChange={handleInputChange}
          onRadioChange={handleRadioChange}
        />

        <PaymentForm
          formData={formData}
          onRadioChange={handleRadioChange}
          onPayNow={handlePayNow}
          isProcessing={isProcessing}
        />
      </CheckoutLayout>
    </>
  );
}
