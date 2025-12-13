"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Tag, CheckCircle, XCircle } from "lucide-react";
import Modal from "./Modal";

const CouponModal = ({ open, onClose, onApply, appliedCoupon = null }) => {
  const [couponCode, setCouponCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleApply = async () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await onApply(couponCode.trim());
      if (result.success) {
        setSuccess(result.message || "Coupon applied successfully!");
        setCouponCode("");
        // Auto close after success
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(result.message || "Invalid coupon code");
      }
    } catch (error) {
      setError("Failed to apply coupon. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCouponCode("");
    setError("");
    setSuccess("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Apply Coupon Code"
      actions={
        <React.Fragment>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderColor: "#d1d5db",
              color: "#6b7280",
              "&:hover": {
                borderColor: "#9ca3af",
                backgroundColor: "#f9fafb",
              },
            }}
          >
            Close
          </Button>
          <Button
            onClick={handleApply}
            variant="contained"
            disabled={isLoading || !couponCode.trim()}
            startIcon={
              isLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <Tag className="h-4 w-4" />
              )
            }
            sx={{
              backgroundColor: "#097B35",
              "&:hover": {
                backgroundColor: "#00662A",
              },
              "&:disabled": {
                backgroundColor: "#9ca3af",
              },
            }}
          >
            {isLoading ? "Applying..." : "Apply Coupon"}
          </Button>
        </React.Fragment>
      }
    >
      <Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 3 }}
        >
          Enter your coupon code below to get discounts on your order.
        </Typography>

        {/* Applied Coupon Display */}
        {appliedCoupon && (
          <Alert
            severity="success"
            icon={<CheckCircle className="h-5 w-5" />}
            sx={{ marginBottom: 3 }}
          >
            <Typography variant="body2">
              <strong>{appliedCoupon.code}</strong> applied successfully!
              <br />
              Discount: {appliedCoupon.discount}
            </Typography>
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert
            severity="error"
            icon={<XCircle className="h-5 w-5" />}
            sx={{ marginBottom: 3 }}
          >
            {error}
          </Alert>
        )}

        {/* Success Message */}
        {success && (
          <Alert
            severity="success"
            icon={<CheckCircle className="h-5 w-5" />}
            sx={{ marginBottom: 3 }}
          >
            {success}
          </Alert>
        )}

        <TextField
          fullWidth
          value={couponCode}
          onChange={(e) => {
            setCouponCode(e.target.value);
            setError("");
            setSuccess("");
          }}
          placeholder="Enter coupon code (e.g., SAVE10, WELCOME20)"
          variant="outlined"
          disabled={isLoading}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#d1d5db",
              },
              "&:hover fieldset": {
                borderColor: "#9ca3af",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#097B35",
              },
            },
          }}
        />

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", marginTop: 2 }}
        >
          Popular codes: SAVE10 (10% off), WELCOME20 (20% off), FIRST50 (৳50
          off)
        </Typography>
      </Box>
    </Modal>
  );
};

export default CouponModal;
