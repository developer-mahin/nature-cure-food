"use client";

import { LocalOffer, Login } from "@mui/icons-material";
import {
  Alert,
  Box,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CheckoutButton from "../ui/CheckoutButton";
import CheckoutCard from "../ui/CheckoutCard";
import OrderItem from "./OrderItem";

const OrderSummary = ({
  items,
  subtotal,
  shippingCost,
  total,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleCouponApply = () => {
    // Simulate coupon application
    if (couponCode === "DISCOUNT10") {
      setCouponDiscount(subtotal * 0.1);
    } else {
      setCouponDiscount(0);
    }
  };

  const finalTotal = total - couponDiscount;

  return (
    <Box sx={{ position: "sticky", top: "32px", width: "350px" }}>
      <CheckoutCard>
        {/* Sign In Link */}
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Link
            href="#"
            variant="body2"
            color="primary"
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Login fontSize="small" />
            Sign in
          </Link>
        </Box>

        {/* Order Items */}
        <Box mb={3}>
          <Typography
            variant="h6"
            fontWeight={600}
            color="text.primary"
            sx={{ mb: 2 }}
          >
            Your Order
          </Typography>

          {items.length === 0 ? (
            <Alert severity="info" sx={{ textAlign: "center" }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Your cart is empty
              </Typography>
              <Link href="/" color="primary" sx={{ textDecoration: "none" }}>
                Continue Shopping
              </Link>
            </Alert>
          ) : (
            items
              .map((product, productIndex) =>
                product.variants.map((variant, variantIndex) => (
                  <OrderItem
                    key={`${product.id}-${variant.variantId}`}
                    product={product}
                    variant={variant}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveItem={onRemoveItem}
                  />
                ))
              )
              .flat()
          )}
        </Box>

        {/* Coupon Code */}
        <Box mb={3}>
          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              size="small"
              placeholder="কুপন কোড"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
            <CheckoutButton
              variant="contained"
              size="small"
              onClick={handleCouponApply}
              startIcon={<LocalOffer />}
            >
              এপ্লাই
            </CheckoutButton>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Order Totals */}
        <Box className="font-hind">
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">
              সাব টোটাল
            </Typography>
            <Typography variant="body2" color="text.primary">
              ৳{subtotal.toFixed(2)}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" color="text.secondary">
              ডেলিভারি চার্জ
            </Typography>
            <Typography variant="body2" color="text.primary">
              {shippingCost === 0 ? "Free" : `৳${shippingCost.toFixed(2)}`}
            </Typography>
          </Box>

          {couponDiscount > 0 && (
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="success.main">
                কুপন ডিসকাউন্ট
              </Typography>
              <Typography variant="body2" color="success.main">
                -৳{couponDiscount.toFixed(2)}
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 1 }} />

          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" fontWeight={600} color="text.primary">
              সর্বমোট
            </Typography>
            <Typography variant="h6" fontWeight={600} color="text.primary">
              ৳{finalTotal.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </CheckoutCard>
    </Box>
  );
};

export default OrderSummary;
