"use client";

// import { useChat } from "@/components/chat/ChatProvider";
import { useCart as useCartContext } from "@/context/CartContext";
import { Button } from "@mui/material";
import { MessageCircle, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProductActions({
  product,
  selectedVariant,
  variantQuantities = {},
  onQuantityChange,
}) {
  const { addItem, updateVariantQuantity, removeVariant } = useCartContext();
  // const { openChat } = useChat();
  const router = useRouter();

  const handleAddToCart = () => {
    if (product) {
      let updatedCount = 0;
      let updatedVariants = [];

      // Check if any variant has quantity > 0
      const hasQuantity = product.variants?.some(
        (variant) => (variantQuantities[variant.id] || 0) > 0
      );

      // If no variant has quantity, automatically add quantity 1 to selected variant or first variant
      let quantitiesToProcess = { ...variantQuantities };
      if (!hasQuantity && product.variants && product.variants.length > 0) {
        const targetVariant = selectedVariant || product.variants[0];
        if (targetVariant) {
          quantitiesToProcess[targetVariant.id] = 1;
          // Update parent state to reflect the change in UI
          if (onQuantityChange) {
            onQuantityChange(targetVariant.id, 1);
          }
        }
      }

      product.variants?.forEach((variant) => {
        const quantity = quantitiesToProcess[variant.id] || 0;
        if (quantity > 0) {
          const variantPrice = variant.discountPrice || variant.price;
          const finalPrice =
            variantPrice || product.discountedPrice || product.price;

          const cartItem = {
            id: product.id,
            name: product.name,
            description: product.description || "",
            price: finalPrice || product.discountedPrice || product.price || 0,
            image: product.coverImg || product.image,
            category:
              typeof product.category === "object"
                ? product.category?.name
                : product.category,
            variant: {
              size: variant.size,
              measurement: variant.measurement,
              variantId: variant.id,
              price: finalPrice,
            },
          };

          // Add the item to cart with setQuantity=true to set exact quantity
          addItem(cartItem, quantity, true);
          updatedCount += quantity;

          updatedVariants.push({
            size: `${variant.measurement} ${variant.size}`,
            quantity,
            price: finalPrice,
          });
        }
      });

      if (updatedCount > 0) {
        const variantText = updatedVariants
          .map((v) => `${v.size} (${v.quantity})`)
          .join(", ");

        toast.success(
          `Updated cart with ${updatedCount} item${
            updatedCount > 1 ? "s" : ""
          }! (${variantText})`
        );
      }
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addItem(product, 1, true);
      router.push("/checkout");
    } else {
      toast.error("Product not found");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* <Button
        onClick={() => router.push(`/checkout/${product.id}`)}
        disabled={product?.variants?.length === 0}
        variant="contained"
        className="!capitalize w-full !py-2 !bg-[#189D07]"
      >
        Pay Online
      </Button> */}

      <Button
        onClick={() => {
          handleAddToCart();
          handleBuyNow();
        }}
        disabled={product?.variants?.length === 0}
        variant="contained"
        className="!capitalize w-full !py-2 !bg-[#189D07]"
      >
        Buy Now
      </Button>

      <Button
        variant="contained"
        className="!capitalize !text-sm w-full !text-black !py-2 !bg-[#2CE514] font-hind"
      >
        আমাদের কাছে সরাসরি সংগ্রহ করুন
      </Button>
      <Button
        variant="contained"
        className="!capitalize w-full !py-2 !bg-[#097B35]"
        onClick={handleAddToCart}
      >
        <ShoppingCart size={20} />
        Add To Cart
      </Button>

      <Button
        variant="contained"
        className="!capitalize w-full !py-2 bg-gradient-to-r from-[#28B2FB] to-[#1A6EFA]"
        // onClick={openChat}
      >
        <MessageCircle size={20} />
        Chat with us
      </Button>

      <Button
        variant="contained"
        className="!capitalize w-full !py-2 bg-gradient-to-r from-[#3BD36D] via-[#238D7E] to-[#145E54]"
        onClick={() => {
          const phoneNumber = "8801785767584"; // Bangladesh country code (880) + your number
          const message = encodeURIComponent(
            `Hi, I'm interested in ${product?.name}. Can you provide more details?`
          );
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
          window.open(whatsappUrl, "_blank");
        }}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        WhatsApp App
      </Button>
    </div>
  );
}
