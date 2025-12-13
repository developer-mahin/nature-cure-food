"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

import { cn } from "@/lib/utils";
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { assets } from "../../../../../public/assets";

export default function AddToCartButton({ product, className = "" }) {
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stockStatus === "Stock Out") return;

    setIsLoading(true);

    // Check if product has variants
    if (product.variants && product.variants.length > 0) {
      // Product has variants - add the first variant by default
      const firstVariant = product.variants[0];
      const variantPrice =
        firstVariant.discountPrice || firstVariant.price || 0;

      const cartItem = {
        id: product.id,
        name: product.name,
        description: product.description || "",
        price: variantPrice,
        image: product.coverImg || product.image,
        category:
          typeof product.category === "object"
            ? product.category?.name
            : product.category,
        variant: {
          variantId: firstVariant.id,
          size: firstVariant.size,
          measurement: firstVariant.measurement,
          price: variantPrice,
        },
      };

      addItem(cartItem, 1);
    } else {
      // Product without variants - use direct price
      const possiblePrices = [
        product.discountedPrice,
        product.price,
        product.salePrice,
        product.regularPrice,
        product.unitPrice,
        product.cost,
        product.amount,
      ].filter((price) => price !== undefined && price !== null && price > 0);

      const finalPrice = possiblePrices.length > 0 ? possiblePrices[0] : 0;

      const cartItem = {
        id: product.id,
        name: product.name,
        description: product.description || "",
        price: finalPrice,
        image: product.coverImg || product.image,
        category:
          typeof product.category === "object"
            ? product.category?.name
            : product.category,
      };

      addItem(cartItem, 1);
    }

    // Show spinner for 1 second, then show success message
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Added to cart!");
    }, 1000);
  };

  return (
    <div className={cn("lg:px-4 px-3 mt-auto", className)}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <Button
          disabled={product.stockStatus === "Stock Out" || isLoading}
          variant="outline"
          className="w-full group flex items-center justify-center gap-2 lg:h-11 h-9 lg:!text-lg !text-xs"
          onClick={handleAddToCart}
        >
          {isLoading ? (
            <CircularProgress size={20} sx={{ color: "#097B35" }} />
          ) : (
            <>
              <Image
                src={assets.icons.cart}
                width={20}
                height={20}
                alt="cart"
                className="group-hover:hidden"
              />
              <Image
                src={assets.icons.cartWhite}
                width={20}
                height={20}
                alt="cart"
                className="hidden group-hover:block"
              />
              Add to Cart
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
