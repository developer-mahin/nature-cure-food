"use client";

import { Avatar, Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import QuantityControl from "../ui/QuantityControl";
import RemoveItemButton from "../ui/RemoveItemButton";

const OrderItem = ({ product, variant, onUpdateQuantity, onRemoveItem }) => {
  const handleIncrease = () => {
    onUpdateQuantity(product?.id, variant?.variantId, variant?.quantity + 1);
  };

  const handleDecrease = () => {
    onUpdateQuantity(
      product?.id,
      variant?.variantId,
      Math.max(1, variant?.quantity - 1)
    );
  };

  const handleRemove = () => {
    onRemoveItem(product?.id, variant?.variantId);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 2,
        p: 2,
        mb: 2,
      }}
    >
      <Box display="flex" gap={2}>
        {/* Product Image */}
        <Avatar
          variant="rounded"
          sx={{
            width: 48,
            height: 48,
            backgroundColor: "grey.100",
          }}
        >
          <Image
            src={product.image || "/assets/products/product-1.png"}
            alt={product.name}
            width={48}
            height={48}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Avatar>

        {/* Product Details */}
        <Box flex={1} minWidth={0}>
          <Typography
            variant="body2"
            fontWeight={500}
            color="text.primary"
            sx={{ mb: 0.5 }}
          >
            {product.name}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {variant?.measurement} {variant?.size}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            ৳{Number(variant?.price).toFixed(2)} each
          </Typography>

          <QuantityControl
            quantity={variant?.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            min={1}
          />
        </Box>

        {/* Price and Remove Button */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          gap={1}
        >
          <Typography variant="body2" fontWeight={500} color="text.primary">
            ৳{(variant?.price * variant?.quantity).toFixed(2)}
          </Typography>

          <RemoveItemButton onRemove={handleRemove} />
        </Box>
      </Box>
    </Paper>
  );
};

export default OrderItem;
