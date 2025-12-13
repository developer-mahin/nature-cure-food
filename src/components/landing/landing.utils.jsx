import { normalizePhoneToE164 } from "@/utils/phoneNormalizer";
import { storeCustomerDataForPixel } from "@/utils/pixelMatchingHelpers";
import { trackPurchase, updatePixelUserData } from "../analytics/FacebookPixel";
import {
  trackTikTokPurchase,
  updateTikTokPixelUserData,
} from "../analytics/TikTokPixel";

/**
 * Prepares products and combo packs from selected items
 * @returns {{ products: Array, comboPacks: Array }}
 */
export const prepareOrderItems = (displayItems, selectedItems, quantities) => {
  const products = displayItems
    .filter((item) =>
      selectedItems.some(
        (selected) => selected.id === item.id && selected.type === "product"
      )
    )
    .map((item) => ({
      productId: item.productId,
      productQuantity: quantities[item.id] || 1,
      variantId: item.variantId,
    }));

  const comboPacks = displayItems
    .filter((item) =>
      selectedItems.some(
        (selected) => selected.id === item.id && selected.type === "combo"
      )
    )
    .map((item) => ({
      comboPackId: item.comboId,
      comboQuantity: quantities[item.id] || 1,
    }));

  return { products, comboPacks };
};

/**
 * Calculates order totals (subtotal, delivery cost, total bill)
 * @returns {{ subtotal: number, deliveryCost: number, totalBill: number }}
 */
export const calculateOrderTotals = (
  displayItems,
  selectedItems,
  quantities,
  shippingMethod,
  deliveryRateInside = 0,
  deliveryRateOutside = 0
) => {
  const subtotal = displayItems.reduce((total, item) => {
    const quantity = quantities[item.id] || 1;
    const selectedItem = selectedItems.find(
      (selected) => selected.id === item.id
    );

    if (selectedItem?.type === "product") {
      const price = parseFloat(
        item.variant?.discountPrice || item.variant?.price || 0
      );
      return total + price * quantity;
    } else if (selectedItem?.type === "combo") {
      const price = parseFloat(
        item.combo?.discountPrice || item.combo?.price || 0
      );
      return total + price * quantity;
    }
    return total;
  }, 0);

  const deliveryCost =
    subtotal >= 1000
      ? 0
      : shippingMethod === "inside-dhaka"
      ? deliveryRateInside
      : deliveryRateOutside;
  const totalBill = subtotal + deliveryCost;

  return { subtotal, deliveryCost, totalBill };
};

/**
 * Creates the order payload for API submission
 * @returns {{ order: Object }}
 */
export const createOrderPayload = (
  formData,
  fullAddress,
  addressDetails,
  totalBill,
  deliveryCost,
  products,
  comboPacks
) => {
  return {
    order: {
      customerPhone: formData.mobile,
      customerName: formData.name,
      customerAddress: fullAddress,
      totalBill: totalBill,
      collectable: totalBill,
      deliveryCost: deliveryCost,
      status: "PROCESSING",
      orderNote: formData.note,
      tenantName: process.env.NEXT_PUBLIC_TANENT_NAME,
      source: "landing_page",
      products,
      comboPacks,
    },
  };
};

/**
 * Handles Facebook & TikTok Pixel tracking after successful order
 * Implements Advanced/Enhanced Matching and Purchase event with deduplication
 */
export const handlePixelTracking = async (
  formData,
  result,
  addressDetails,
  products,
  comboPacks,
  totalBill,
  displayItems
) => {
  try {
    storeCustomerDataForPixel({
      name: formData.name,
      phone: formData.mobile,
      email: result?.data?.email || "",
    });

    const pixelEventId = result?.data?.pixelEventId;

    if (!pixelEventId) {
      console.warn(
        "⚠️ No pixelEventId returned from server, skipping browser Purchase event"
      );
      return;
    }

    const e164Phone = normalizePhoneToE164(formData.mobile);

    await Promise.all([
      updatePixelUserData({
        name: formData.name,
        phone: e164Phone,
        email: result?.data?.email || "",
        city: addressDetails?.district?.name || "",
        state: addressDetails?.division?.name || "",
        country: "bd",
      }),
      updateTikTokPixelUserData({
        email: result?.data?.email || "",
        phone: e164Phone,
        external_id: result?.data?.id || null,
      }),
    ]);

    const allProductIds = [
      ...products.map((p) => p.productId),
      ...comboPacks.map((c) => c.comboPackId),
    ];

    const totalItems =
      products.reduce((sum, p) => sum + p.productQuantity, 0) +
      comboPacks.reduce((sum, c) => sum + c.comboQuantity, 0);

    const purchaseData = {
      content_ids: allProductIds,
      value: totalBill,
      currency: "BDT",
      num_items: totalItems,
      content_name: displayItems
        .map((item) => item?.product?.name || item?.combo?.name || "")
        .filter(Boolean)
        .join(", "),
    };

    const tiktokPurchaseData = {
      value: totalBill,
      currency: "BDT",
      content_type: "product",
      contents: displayItems.map((item) => {
        const isProduct = item?.product;
        return {
          content_id: isProduct ? item.product.id : item.combo.id,
          content_name: isProduct ? item.product.name : item.combo.name,
          content_category: isProduct ? item.product.category?.name : "Combo",
          brand: isProduct ? item.product.brand?.name : null,
          price: isProduct
            ? item.product.variants?.[0]?.price || 0
            : item.combo.price || 0,
          quantity: item.quantity || 1,
        };
      }),
    };

    trackPurchase(purchaseData, pixelEventId);
    trackTikTokPurchase(tiktokPurchaseData, pixelEventId);
  } catch (error) {
    console.error("Pixel tracking error:", error);
  }
};
