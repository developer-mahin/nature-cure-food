// "use client";

// import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";

// const CartContext = createContext(null);

// function cartReducer(state, action) {
//   switch (action.type) {
//     case "INIT_FROM_STORAGE": {
//       return action.payload ?? state;
//     }
//     case "ADD_ITEM": {
//       const { item, quantity } = action.payload;
//       const existing = state.items.find((it) => it.id === item.id);
//       let newItems;
//       if (existing) {
//         newItems = state.items.map((it) =>
//           it.id === item.id ? { ...it, quantity: it.quantity + quantity } : it
//         );
//       } else {
//         newItems = [...state.items, { ...item, quantity }];
//       }
//       return { ...state, items: newItems };
//     }
//     case "REMOVE_ITEM": {
//       const id = action.payload;
//       return { ...state, items: state.items.filter((it) => it.id !== id) };
//     }
//     case "UPDATE_QTY": {
//       const { id, quantity } = action.payload;
//       if (quantity <= 0) {
//         return { ...state, items: state.items.filter((it) => it.id !== id) };
//       }
//       return {
//         ...state,
//         items: state.items.map((it) => (it.id === id ? { ...it, quantity } : it)),
//       };
//     }
//     case "CLEAR": {
//       return { ...state, items: [] };
//     }
//     default:
//       return state;
//   }
// }

// const initialCartState = {
//   items: [],
// };

// export function CartProvider({ children }) {
//   const [state, dispatch] = useReducer(cartReducer, initialCartState);

//   // hydrate from localStorage
//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem("cart-state");
//       if (raw) {
//         const parsed = JSON.parse(raw);
//         if (parsed && typeof parsed === "object" && Array.isArray(parsed.items)) {
//           dispatch({ type: "INIT_FROM_STORAGE", payload: parsed });
//         }
//       }
//     } catch (e) {
//       // ignore
//     }
//   }, []);

//   // persist to localStorage
//   useEffect(() => {
//     try {
//       localStorage.setItem("cart-state", JSON.stringify(state));
//     } catch (e) {
//       // ignore
//     }
//   }, [state]);

//   const addItem = useCallback((item, quantity = 1) => {
//     dispatch({ type: "ADD_ITEM", payload: { item, quantity } });
//   }, []);

//   const removeItem = useCallback((id) => {
//     dispatch({ type: "REMOVE_ITEM", payload: id });
//   }, []);

//   const updateQuantity = useCallback((id, quantity) => {
//     dispatch({ type: "UPDATE_QTY", payload: { id, quantity } });
//   }, []);

//   const clearCart = useCallback(() => {
//     dispatch({ type: "CLEAR" });
//   }, []);

//   const totals = useMemo(() => {
//     const subtotal = state.items.reduce(
//       (sum, it) => sum + (it.price ?? 0) * (it.quantity ?? 1),
//       0
//     );
//     const itemCount = state.items.reduce((sum, it) => sum + (it.quantity ?? 1), 0);
//     return { subtotal, itemCount };
//   }, [state.items]);

//   const value = useMemo(
//     () => ({
//       items: state.items,
//       addItem,
//       removeItem,
//       updateQuantity,
//       clearCart,
//       subtotal: totals.subtotal,
//       itemCount: totals.itemCount,
//     }),
//     [state.items, addItem, removeItem, updateQuantity, clearCart, totals.subtotal, totals.itemCount]
//   );

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// }

// export function useCart() {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used within CartProvider");
//   return ctx;
// }

"use client";

import { trackAddToCart } from "@/components/analytics/FacebookPixel";
import { trackTikTokAddToCart } from "@/components/analytics/TikTokPixel";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "INIT_FROM_STORAGE": {
      return action.payload ?? state;
    }
    case "ADD_ITEM": {
      const { item, quantity, setQuantity = false } = action.payload;

      // Find if product already exists in cart
      const existingProductIndex = state.items.findIndex(
        (it) => it.id === item.id
      );

      if (existingProductIndex !== -1) {
        // Product exists, check if variant exists
        const existingProduct = state.items[existingProductIndex];

        if (item.variant) {
          const existingVariantIndex = existingProduct.variants.findIndex(
            (v) => v.variantId === item.variant.variantId
          );

          const newVariants = [...existingProduct.variants];

          if (existingVariantIndex !== -1) {
            // Variant exists, either set or increase quantity
            if (setQuantity) {
              // Set to exact quantity
              newVariants[existingVariantIndex] = {
                ...newVariants[existingVariantIndex],
                quantity: quantity,
              };
            } else {
              // Increase quantity
              newVariants[existingVariantIndex] = {
                ...newVariants[existingVariantIndex],
                quantity: newVariants[existingVariantIndex].quantity + quantity,
              };
            }
          } else {
            // Variant doesn't exist, add it
            newVariants.push({
              variantId: item.variant.variantId,
              size: item.variant.size,
              measurement: item.variant.measurement,
              price: item.price,
              quantity: quantity,
            });
          }

          const newItems = [...state.items];
          newItems[existingProductIndex] = {
            ...existingProduct,
            variants: newVariants,
          };

          return { ...state, items: newItems };
        } else {
          // No variant, handle product without variants
          const newItems = [...state.items];
          const existingProduct = newItems[existingProductIndex];

          if (existingProduct.quantity !== undefined) {
            // Product already has quantity, update it
            if (setQuantity) {
              existingProduct.quantity = quantity;
            } else {
              existingProduct.quantity =
                (existingProduct.quantity || 0) + quantity;
            }
            // Update price if provided
            if (item.price !== undefined) {
              existingProduct.price = item.price;
            }
          } else {
            // Product exists but has variants, shouldn't happen
            return state;
          }

          return { ...state, items: newItems };
        }
      } else {
        // Product doesn't exist, add new product with variant
        const newProduct = {
          id: item.id,
          name: item.name,
          description: item.description || "",
          image: item.image,
          category: item.category,
          price: item.price,
          quantity: item.variant ? undefined : quantity, // Only set quantity if no variant
          variants: item.variant
            ? [
                {
                  variantId: item.variant.variantId,
                  size: item.variant.size,
                  measurement: item.variant.measurement,
                  price: item.price,
                  quantity: quantity,
                },
              ]
            : [],
        };

        return { ...state, items: [...state.items, newProduct] };
      }
    }
    case "REMOVE_VARIANT": {
      const { productId, variantId } = action.payload;

      const newItems = state.items
        .map((product) => {
          if (product.id === productId) {
            const newVariants = product.variants.filter(
              (v) => v.variantId !== variantId
            );

            // If no variants left, we'll filter out the product entirely
            if (newVariants.length === 0) {
              return null;
            }

            return { ...product, variants: newVariants };
          }
          return product;
        })
        .filter(Boolean); // Remove null entries

      return { ...state, items: newItems };
    }
    case "UPDATE_VARIANT_QTY": {
      const { productId, variantId, quantity } = action.payload;

      if (quantity <= 0) {
        // Remove the variant if quantity is 0 or less
        if (variantId === null) {
          // Remove entire product if no variants
          return cartReducer(state, {
            type: "REMOVE_PRODUCT",
            payload: productId,
          });
        } else {
          return cartReducer(state, {
            type: "REMOVE_VARIANT",
            payload: { productId, variantId },
          });
        }
      }

      const newItems = state.items.map((product) => {
        if (product.id === productId) {
          if (variantId === null) {
            // Update product quantity (no variants)
            return { ...product, quantity };
          } else {
            // Update variant quantity
            const newVariants = product.variants.map((variant) =>
              variant.variantId === variantId
                ? { ...variant, quantity }
                : variant
            );
            return { ...product, variants: newVariants };
          }
        }
        return product;
      });

      return { ...state, items: newItems };
    }
    case "REMOVE_PRODUCT": {
      const productId = action.payload;
      return {
        ...state,
        items: state.items.filter((product) => product.id !== productId),
      };
    }
    case "CLEAR": {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

const initialCartState = {
  items: [],
  isCartOpen: false,
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart-state");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (
          parsed &&
          typeof parsed === "object" &&
          Array.isArray(parsed.items)
        ) {
          dispatch({ type: "INIT_FROM_STORAGE", payload: parsed });
        }
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    }
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart-state", JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }, [state]);

  const addItem = useCallback((item, quantity = 1, setQuantity = false) => {
    dispatch({ type: "ADD_ITEM", payload: { item, quantity, setQuantity } });

    // Track AddToCart event for Facebook Pixel
    trackAddToCart({
      id: item.id,
      name: item.name,
      category: item.category,
      value: item.price * quantity,
    });

    // Track AddToCart event for TikTok Pixel
    trackTikTokAddToCart({
      id: item.id,
      name: item.name,
      category: item.category,
      value: item.price * quantity,
      quantity: quantity,
    });
  }, []);

  const removeVariant = useCallback((productId, variantId) => {
    dispatch({ type: "REMOVE_VARIANT", payload: { productId, variantId } });
  }, []);

  const updateVariantQuantity = useCallback(
    (productId, variantId, quantity) => {
      dispatch({
        type: "UPDATE_VARIANT_QTY",
        payload: { productId, variantId, quantity },
      });
    },
    []
  );

  const removeProduct = useCallback((productId) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: productId });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const openCart = useCallback(() => {
    // Dispatch custom event to open cart
    const event = new CustomEvent("openCart");
    window.dispatchEvent(event);
  }, []);

  const totals = useMemo(() => {
    let subtotal = 0;
    let productCount = 0; // Count unique products, not total quantity

    state.items.forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        // Product with variants
        product.variants.forEach((variant) => {
          const variantTotal = (variant.price ?? 0) * (variant.quantity ?? 1);
          subtotal += variantTotal;
        });
        productCount += 1; // Count each product once
      } else if (product.quantity !== undefined) {
        // Product without variants
        const productTotal = (product.price ?? 0) * (product.quantity ?? 1);
        subtotal += productTotal;
        productCount += 1; // Count each product once
      }
    });

    return { subtotal, itemCount: productCount }; // Return productCount as itemCount
  }, [state.items]);

  const value = useMemo(
    () => ({
      items: state.items,
      addItem,
      removeVariant,
      updateVariantQuantity,
      removeProduct,
      clearCart,
      openCart,
      subtotal: totals.subtotal,
      itemCount: totals.itemCount,
    }),
    [
      state.items,
      addItem,
      removeVariant,
      updateVariantQuantity,
      removeProduct,
      clearCart,
      openCart,
      totals.subtotal,
      totals.itemCount,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
