"use client";

import {
  CheckoutLayout,
  DeliveryForm,
  OrderSummary,
  PaymentForm,
  PhoneNumberForm,
} from "@/components/checkout";
import { useCart } from "@/context/CartContext";
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
    shippingMethod: "inside-dhaka",
    billingAddress: "same",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const handlePayNow = async () => {
    if (!formData.name || !formData.phoneNumber || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Payment processed successfully!");

      clearCart();

      setTimeout(() => {
        router.push("/?payment=success");
      }, 1000);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = items.reduce((sum, product) => {
    return (
      sum +
      product.variants.reduce((variantSum, variant) => {
        return variantSum + variant.price * variant.quantity;
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
    <CheckoutLayout orderSummary={orderSummary}>
      <PhoneNumberForm formData={formData} onInputChange={handleInputChange} />

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
  );
}
