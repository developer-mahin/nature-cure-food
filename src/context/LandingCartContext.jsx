"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { trackAddToCart } from "@/components/analytics/FacebookPixel";
import { trackTikTokAddToCart } from "@/components/analytics/TikTokPixel";

const LandingCartContext = createContext(null);

function landingCartReducer(state, action) {
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
          // No variant, update product quantity
          const newItems = [...state.items];
          if (setQuantity) {
            newItems[existingProductIndex] = {
              ...existingProduct,
              quantity: quantity,
            };
          } else {
            newItems[existingProductIndex] = {
              ...existingProduct,
              quantity: existingProduct.quantity + quantity,
            };
          }

          return { ...state, items: newItems };
        }
      } else {
        // Product doesn't exist, add it
        const newItem = {
          ...item,
          quantity: quantity,
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

        return { ...state, items: [...state.items, newItem] };
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
            if (newVariants.length === 0) {
              // If no variants left, remove the entire product
              return null;
            }
            return { ...product, variants: newVariants };
          }
          return product;
        })
        .filter(Boolean);

      return { ...state, items: newItems };
    }
    case "UPDATE_VARIANT_QTY": {
      const { productId, variantId, quantity } = action.payload;
      if (quantity <= 0) {
        return landingCartReducer(state, {
          type: "REMOVE_VARIANT",
          payload: { productId, variantId },
        });
      }

      const newItems = state.items.map((product) => {
        if (product.id === productId) {
          const newVariants = product.variants.map((variant) =>
            variant.variantId === variantId ? { ...variant, quantity } : variant
          );
          return { ...product, variants: newVariants };
        }
        return product;
      });

      return { ...state, items: newItems };
    }
    case "REMOVE_PRODUCT": {
      const productId = action.payload;
      const newItems = state.items.filter(
        (product) => product.id !== productId
      );
      return { ...state, items: newItems };
    }
    case "CLEAR": {
      return { ...state, items: [] };
    }
    case "TOGGLE_CART": {
      return { ...state, isCartOpen: !state.isCartOpen };
    }
    case "SET_CART_OPEN": {
      return { ...state, isCartOpen: action.payload };
    }
    default:
      return state;
  }
}

const initialLandingCartState = {
  items: [],
  isCartOpen: false,
};

export function LandingCartProvider({ children }) {
  const [state, dispatch] = useReducer(
    landingCartReducer,
    initialLandingCartState
  );

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("landing-cart-state");
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
      console.error("Failed to load landing cart from storage", error);
    }
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("landing-cart-state", JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save landing cart to storage", e);
    }
  }, [state]);

  const addItem = useCallback((item, quantity = 1, setQuantity = false) => {
    dispatch({ type: "ADD_ITEM", payload: { item, quantity, setQuantity } });

    // Track AddToCart event for Facebook Pixel
    trackAddToCart({
      id: item.id,
      name: item.name,
      category: item.category || "Health Products",
      value: item.price * quantity,
    });

    // Track AddToCart event for TikTok Pixel
    trackTikTokAddToCart({
      id: item.id,
      name: item.name,
      category: item.category || "Health Products",
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
    // Dispatch custom event to open landing cart
    const event = new CustomEvent("openLandingCart");
    window.dispatchEvent(event);
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: "TOGGLE_CART" });
  }, []);

  const setCartOpen = useCallback((isOpen) => {
    dispatch({ type: "SET_CART_OPEN", payload: isOpen });
  }, []);

  const totals = useMemo(() => {
    let subtotal = 0;
    let itemCount = 0;

    state.items.forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        product.variants.forEach((variant) => {
          subtotal += (variant.price ?? 0) * (variant.quantity ?? 1);
          itemCount += variant.quantity ?? 1;
        });
      } else {
        subtotal += (product.price ?? 0) * (product.quantity ?? 1);
        itemCount += product.quantity ?? 1;
      }
    });

    return { subtotal, itemCount };
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
      toggleCart,
      setCartOpen,
      isCartOpen: state.isCartOpen,
      subtotal: totals.subtotal,
      itemCount: totals.itemCount,
    }),
    [
      state.items,
      state.isCartOpen,
      addItem,
      removeVariant,
      updateVariantQuantity,
      removeProduct,
      clearCart,
      openCart,
      toggleCart,
      setCartOpen,
      totals.subtotal,
      totals.itemCount,
    ]
  );

  return (
    <LandingCartContext.Provider value={value}>
      {children}
    </LandingCartContext.Provider>
  );
}

export function useLandingCart() {
  const ctx = useContext(LandingCartContext);
  if (!ctx)
    throw new Error("useLandingCart must be used within LandingCartProvider");
  return ctx;
}
