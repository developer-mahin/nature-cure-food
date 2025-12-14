"use client";

import { useLandingCart } from "@/context/LandingCartContext";
import { getAddressDetails, getFullAddressFromIds } from "@/lib/getAddressById";
import { API_CONFIG } from "@/services";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  calculateOrderTotals,
  createOrderPayload,
  handlePixelTracking,
  prepareOrderItems,
} from "./landing.utils";
import LandingOrderForm from "./LandingOrderFrom";
import styles from "./LandingOrderWrapper.module.css";
import OrderSummary from "./OrderSummary";
import ProductComponent from "./ProductComponent";
import ThankOutModal from "./ThankOutModal";

const LandingOrderWrapper = ({
  products = [],
  combos = [],
  deliveryRateInside,
  deliveryRateOutside,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [shippingMethod, setShippingMethod] = useState("free-delivery");
  const [deselectedItems, setDeselectedItems] = useState(new Set()); // Track explicitly deselected items
  const [phoneNumber, setPhoneNumber] = useState();
  const [customerName, setCustomerName] = useState();
  const [customerAddress, setCustomerAddress] = useState();
  const [addressField, setAddressField] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const formRef = useRef(null);
  const incompleteOrderAbortRef = useRef(null);
  const incompleteOrderTimerRef = useRef(null);
  const isOrderSubmittingRef = useRef(false);

  const {
    addItem,
    items: cartItems,
    itemCount,
    removeProduct,
    clearCart,
  } = useLandingCart();

  // const addToLandingCart = (item, itemType, overrideQuantity = null) => {
  //   const quantity =
  //     overrideQuantity !== null ? overrideQuantity : quantities[item.id] || 1;

  //   if (itemType === "product") {
  //     const cartItem = {
  //       id: item.id,
  //       name: item.product.name,
  //       price: parseFloat(
  //         item.variant?.discountPrice || item.variant?.price || 0
  //       ),
  //       coverImg: item.product.coverImg,
  //       description: item.product.description,
  //       variant: item.variant
  //         ? {
  //             variantId: item.variant.id,
  //             size: item.variant.size,
  //             measurement: item.variant.measurement,
  //           }
  //         : null,
  //     };
  //     addItem(cartItem, quantity, true);
  //   } else if (itemType === "combo") {
  //     const cartItem = {
  //       id: item.id,
  //       name: item.combo.name,
  //       price: parseFloat(item.combo?.discountPrice || item.combo?.price || 0),
  //       coverImg: item.combo.imageUrl,
  //       description: item.combo.description,
  //     };
  //     addItem(cartItem, quantity, true);
  //   }
  // };

  const addToLandingCart = (item, itemType, overrideQuantity = null) => {
    const quantity =
      overrideQuantity !== null ? overrideQuantity : quantities[item.id] || 1;

    if (itemType === "product") {
      const cartItem = {
        id: item.id,
        name: item.product.name,
        price: parseFloat(
          item.variant?.discountPrice || item.variant?.price || 0
        ),
        coverImg: item.product.coverImg,
        description: item.product.description,
        variant: item.variant
          ? {
              variantId: item.variant.id,
              size: item.variant.size,
              measurement: item.variant.measurement,
            }
          : null,
      };
      addItem(cartItem, quantity, true);
    } else if (itemType === "combo") {
      const cartItem = {
        id: item.id,
        name: item.combo.name,
        price: parseFloat(item.combo?.discountPrice || item.combo?.price || 0),
        coverImg: item.combo.imageUrl,
        description: item.combo.description,
      };
      addItem(cartItem, quantity, true);
    }
  };

  useEffect(() => {
    clearCart();
    // Clear deselected items when products/combos change
    setDeselectedItems(new Set());

    // Find all products/combos with isSelected: true for multiple selection
    const selectedProducts = products.filter((p) => p.isSelected === true);
    const selectedCombos = combos.filter((c) => c.isSelected === true);

    const initialSelectedItems = [];
    const initialQuantities = {};

    // Add all selected products
    selectedProducts.forEach((product) => {
      const quantity = product.quantity || 1;
      initialSelectedItems.push({ id: product.id, type: "product" });
      initialQuantities[product.id] = quantity;
      addToLandingCart(product, "product", quantity);
    });

    // Add all selected combos
    selectedCombos.forEach((combo) => {
      const quantity = combo.quantity || 1;
      initialSelectedItems.push({ id: combo.id, type: "combo" });
      initialQuantities[combo.id] = quantity;
      addToLandingCart(combo, "combo", quantity);
    });

    // If no items are pre-selected, select first product/combo (backward compatibility)
    if (initialSelectedItems.length === 0) {
      if (products.length > 0) {
        const firstProduct = products[0];
        const quantity = firstProduct.quantity || 1;
        initialSelectedItems.push({ id: firstProduct.id, type: "product" });
        initialQuantities[firstProduct.id] = quantity;
        addToLandingCart(firstProduct, "product", quantity);
      } else if (combos.length > 0) {
        const firstCombo = combos[0];
        initialSelectedItems.push({ id: firstCombo.id, type: "combo" });
        initialQuantities[firstCombo.id] = 1;
        addToLandingCart(firstCombo, "combo", 1);
      }
    }

    setSelectedItems(initialSelectedItems);
    setQuantities(initialQuantities);
  }, [products, combos, clearCart]);

  useEffect(() => {
    if (subTotal >= 1000 && shippingMethod !== "free-delivery") {
      setShippingMethod("free-delivery");
    }
  }, [subTotal, shippingMethod]);

  const displayItems = selectedItems
    .map((selectedItem) => {
      if (selectedItem.type === "product") {
        return products.find((p) => p.id === selectedItem.id);
      } else {
        return combos.find((c) => c.id === selectedItem.id);
      }
    })
    .filter(Boolean);

  const toggleItemSelection = (itemId, itemType) => {
    const isCurrentlySelected = isItemSelected(itemId);

    if (isCurrentlySelected) {
      // Remove item from selection (multiple select - allow deselection)
      setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));

      // Remove quantity for this item
      setQuantities((prev) => {
        const newQuantities = { ...prev };
        delete newQuantities[itemId];
        return newQuantities;
      });

      // Remove from cart
      removeProduct(itemId);

      // Mark as explicitly deselected (even if it has isSelected: true)
      setDeselectedItems((prev) => new Set(prev).add(itemId));
      return;
    }

    // Add item to selection (multiple select - allow multiple items)
    // Remove from deselected items if it was previously deselected
    setDeselectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });

    // Add to selected items
    setSelectedItems((prev) => {
      // Check if already in array (shouldn't happen, but safety check)
      if (prev.some((item) => item.id === itemId)) {
        return prev;
      }
      return [...prev, { id: itemId, type: itemType }];
    });

    // Preserve or set quantity
    const preservedQuantity = quantities[itemId] || 1;
    setQuantities((prev) => ({
      ...prev,
      [itemId]: preservedQuantity,
    }));

    // Add to cart
    const itemToAdd =
      itemType === "product"
        ? products.find((p) => p.id === itemId)
        : combos.find((c) => c.id === itemId);

    if (itemToAdd) {
      addToLandingCart(itemToAdd, itemType, preservedQuantity);
    }
  };

  const isItemSelected = (itemId) => {
    // Item is selected if it's in selectedItems AND not explicitly deselected
    return (
      selectedItems.some((item) => item.id === itemId) &&
      !deselectedItems.has(itemId)
    );
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));

    const selectedItem = selectedItems.find((item) => item.id === itemId);
    if (selectedItem) {
      const itemToUpdate =
        selectedItem.type === "product"
          ? products.find((p) => p.id === itemId)
          : combos.find((c) => c.id === itemId);

      if (itemToUpdate) {
        addToLandingCart(itemToUpdate, selectedItem.type, newQuantity);
      }
    }
  };

  const incrementQuantity = (itemId) => {
    updateQuantity(itemId, (quantities[itemId] || 1) + 1);
  };

  const decrementQuantity = (itemId) => {
    updateQuantity(itemId, Math.max(1, (quantities[itemId] || 1) - 1));
  };

  const shippingCost =
    subTotal >= 1000
      ? 0
      : shippingMethod === "inside-dhaka"
      ? deliveryRateInside
      : deliveryRateOutside;
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CREATE_ORDER}`;

  const incomplete_order_url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CREATE_IN_COMPLETE_ORDER}`;

  useEffect(() => {
    if (phoneNumber?.length !== 11) return;
    if (isSubmitting || isOrderSubmittingRef.current) {
      if (incompleteOrderTimerRef.current) {
        clearTimeout(incompleteOrderTimerRef.current);
        incompleteOrderTimerRef.current = null;
      }
      if (incompleteOrderAbortRef.current) {
        incompleteOrderAbortRef.current.abort();
        incompleteOrderAbortRef.current = null;
      }
      return;
    }

    const debounceTimer = setTimeout(() => {
      if (isSubmitting || isOrderSubmittingRef.current) {
        if (incompleteOrderAbortRef.current) {
          incompleteOrderAbortRef.current.abort();
          incompleteOrderAbortRef.current = null;
        }
        return;
      }

      const abortController = new AbortController();
      incompleteOrderAbortRef.current = abortController;

      const fetchIncompleteOrder = async () => {
        if (isOrderSubmittingRef.current) {
          abortController.abort();
          return;
        }

        try {
          const fullAddress = customerAddress
            ? getFullAddressFromIds(addressField || {}, customerAddress)
            : customerAddress || "";

          const productIds = cartItems
            .map((cartItem) => {
              const product = products.find((p) => p.id === cartItem.id);

              return {
                productId: product?.productId,
                variantId: product?.variantId,
                quantity: cartItem.quantity,
              };
            })
            .filter(Boolean);

          const comboIds = cartItems
            .map((cartItem) => {
              const combo = combos.find((c) => c.id === cartItem.id);

              return {
                comboId: combo?.comboId,
                quantity: cartItem.quantity,
              };
            })
            .filter(Boolean);

          const payload = {
            customerPhone: phoneNumber,
            customerName: customerName || "",
            customerAddress: fullAddress,
            source: "unipharma",
            ...(productIds.length > 0 && { productId: productIds }),
            ...(comboIds.length > 0 && { comboPackId: comboIds }),
          };

          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
              reject(new Error("Request timeout"));
            }, 4000);
          });

          await Promise.race([
            fetch(incomplete_order_url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
              signal: abortController.signal,
            }),
            timeoutPromise,
          ]);
        } catch (error) {
          if (error.name === "AbortError") return;

          if (error.message === "Request timeout") {
            return;
          }
        } finally {
          if (incompleteOrderAbortRef.current === abortController) {
            incompleteOrderAbortRef.current = null;
          }
        }
      };

      fetchIncompleteOrder();
    }, 4000);

    incompleteOrderTimerRef.current = debounceTimer;

    return () => {
      clearTimeout(debounceTimer);
      incompleteOrderTimerRef.current = null;
      if (incompleteOrderAbortRef.current) {
        incompleteOrderAbortRef.current.abort();
        incompleteOrderAbortRef.current = null;
      }
    };
  }, [
    phoneNumber,
    customerName,
    customerAddress,
    addressField,
    cartItems,
    products,
    combos,
    isSubmitting,
    incomplete_order_url,
  ]);

  const handleOrderConfirm = async (data) => {
    isOrderSubmittingRef.current = true;

    if (incompleteOrderTimerRef.current) {
      clearTimeout(incompleteOrderTimerRef.current);
      incompleteOrderTimerRef.current = null;
    }
    if (incompleteOrderAbortRef.current) {
      incompleteOrderAbortRef.current.abort();
      incompleteOrderAbortRef.current = null;
    }

    setIsSubmitting(true);

    try {
      const fullAddress = getFullAddressFromIds(
        data.addressField || {},
        data.address || ""
      );
      const addressDetails = getAddressDetails(data.addressField || {});

      const { products, comboPacks } = prepareOrderItems(
        displayItems,
        selectedItems,
        quantities
      );

      const { totalBill, deliveryCost } = calculateOrderTotals(
        displayItems,
        selectedItems,
        quantities,
        data.shippingMethod,
        deliveryRateInside,
        deliveryRateOutside
      );

      const orderData = createOrderPayload(
        data,
        fullAddress,
        addressDetails,
        totalBill,
        deliveryCost,
        products,
        comboPacks
      );

      const formData = new FormData();
      formData.append("data", JSON.stringify(orderData));

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Order submission failed: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();

      await handlePixelTracking(
        data,
        result,
        addressDetails,
        products,
        comboPacks,
        totalBill,
        displayItems
      );

      // Set order details for thank you modal
      setOrderDetails({
        orderId: result?.data?.id || "N/A",
        items: displayItems.map((item) => {
          const selectedItem = selectedItems.find((s) => s.id === item.id);
          const quantity = quantities[item.id] || 1;

          if (selectedItem?.type === "product") {
            const variant = item.variant;
            const price = parseFloat(
              variant?.discountPrice || variant?.price || 0
            );
            return {
              type: "product",
              name: item.product.name,
              size: variant?.size,
              measurement: variant?.measurement,
              quantity,
              price,
              total: price * quantity,
              image: variant?.images?.[0] || item.product.coverImg,
            };
          } else {
            const combo = item.combo;
            const price = parseFloat(combo?.discountPrice || combo?.price || 0);
            return {
              type: "combo",
              name: combo.name,
              quantity,
              price,
              total: price * quantity,
              image: combo.imageUrl,
            };
          }
        }),
        totalBill,
        deliveryCost,
        customerName: data.customerName || customerName || "",
      });

      // Show thank you modal
      setShowThankYouModal(true);

      if (formRef.current?.clear) {
        formRef.current.clear();
      }

      setPhoneNumber(undefined);
      setCustomerName(undefined);
      setCustomerAddress(undefined);
      setAddressField({});
    } catch (error) {
      toast.error(
        `অর্ডার জমা দেওয়ার সময় একটি ত্রুটি হয়েছে।\n\nError: ${error.message}\n\nঅনুগ্রহ করে আবার চেষ্টা করুন।`
      );
    } finally {
      setIsSubmitting(false);
      isOrderSubmittingRef.current = false;
    }
  };

  const handleConfirmClick = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <div className={styles.orderWrapper}>
      <ProductComponent
        products={products}
        combos={combos}
        isItemSelected={isItemSelected}
        toggleItemSelection={toggleItemSelection}
        decrementQuantity={decrementQuantity}
        incrementQuantity={incrementQuantity}
        quantities={quantities}
        deselectedItems={deselectedItems}
      />

      {/* Order Form Section */}
      <LandingOrderForm
        ref={formRef}
        onOrderConfirm={handleOrderConfirm}
        onShippingChange={setShippingMethod}
        setPhoneNumber={setPhoneNumber}
        setCustomerName={setCustomerName}
        setCustomerAddress={setCustomerAddress}
        setAddressField={setAddressField}
        deliveryRateInside={deliveryRateInside}
        deliveryRateOutside={deliveryRateOutside}
        subTotal={subTotal}
      >
        <OrderSummary
          items={displayItems}
          selectedItems={selectedItems}
          quantities={quantities}
          onOrderConfirm={handleConfirmClick}
          isSubmitting={isSubmitting}
          shippingCost={shippingCost}
          setSubTotal={setSubTotal}
        />
      </LandingOrderForm>

      <ThankOutModal
        showThankYouModal={showThankYouModal}
        setShowThankYouModal={setShowThankYouModal}
        orderDetails={orderDetails}
      />
    </div>
  );
};

export default LandingOrderWrapper;
