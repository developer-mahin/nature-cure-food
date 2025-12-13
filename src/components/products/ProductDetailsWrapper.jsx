"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useRef, useState } from "react";
import ProductActions from "./ProductActions";
import ProductInfo from "./ProductInfo";

export default function ProductDetailsWrapper({ product }) {
  const { items, updateVariantQuantity, removeVariant } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [variantQuantities, setVariantQuantities] = useState({});

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const cartProduct = items.find((item) => item.id === product.id);
    const quantities = { ...variantQuantities };
    let shouldUpdate = false;

    if (product?.variants) {
      product.variants.forEach((variant) => {
        const variantInCart = cartProduct?.variants?.find(
          (v) => v.variantId === variant.id
        );

        if (variantInCart) {
          quantities[variant.id] = variantInCart.quantity;
          shouldUpdate = true;
        } else {
          const isSelected = selectedVariant?.id === variant.id;

          if (quantities[variant.id] === undefined) {
            quantities[variant.id] = isSelected ? 1 : 0;
            shouldUpdate = true;
          }
        }
      });

      if (product.variants.length > 0 && !selectedVariant) {
        // Find variant with showOnFrontend property, or fallback to first variant
        const variantWithShowOnFrontend = product.variants.find(
          (variant) =>
            variant.showOnFrontend === true || variant.showOnFrontend === "true"
        );
        const defaultVariant = variantWithShowOnFrontend || product.variants[0];
        setSelectedVariant(defaultVariant);

        const defaultVariantInCart = cartProduct?.variants?.find(
          (v) => v.variantId === defaultVariant.id
        );
        if (!defaultVariantInCart) {
          quantities[defaultVariant.id] = 1;
          shouldUpdate = true;
        }
      }
    }

    if (shouldUpdate) {
      setVariantQuantities(quantities);
    }

    if (items.length > 0 || product?.variants) {
      initialized.current = true;
    }
  }, [items, product.id, product?.variants]);

  const handleVariantChange = (variant) => {
    const prevVariant = selectedVariant;
    setSelectedVariant(variant);

    setVariantQuantities((prev) => {
      const newQuantities = { ...prev };

      if (prevVariant && prevVariant.id !== variant.id) {
        const cartProduct = items.find((item) => item.id === product.id);
        const prevVariantInCart = cartProduct?.variants?.find(
          (v) => v.variantId === prevVariant.id
        );

        if (!prevVariantInCart) {
          newQuantities[prevVariant.id] = 0;
        }
      }

      if ((newQuantities[variant.id] || 0) === 0) {
        newQuantities[variant.id] = 1;
      }

      return newQuantities;
    });
  };

  const handleQuantityChange = (variantId, newQuantity) => {
    const finalQuantity = Math.max(0, newQuantity);

    setVariantQuantities((prev) => ({
      ...prev,
      [variantId]: finalQuantity,
    }));
  };

  return (
    <>
      <ProductInfo
        product={product}
        onVariantChange={handleVariantChange}
        selectedVariant={selectedVariant}
        variantQuantities={variantQuantities}
        onQuantityChange={handleQuantityChange}
      />

      <div className="bg-white rounded-lg shadow-md p-6 mt-4">
        <ProductActions
          product={product}
          selectedVariant={selectedVariant}
          variantQuantities={variantQuantities}
          onQuantityChange={handleQuantityChange}
        />
      </div>
    </>
  );
}
