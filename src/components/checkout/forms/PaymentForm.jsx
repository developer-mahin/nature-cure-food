"use client";

import React from "react";
import { Typography, Box, Grid, Paper, Divider, Link } from "@mui/material";
import { CreditCard, Security } from "@mui/icons-material";
import RadioGroupField from "../ui/RadioGroupField";
import CheckoutButton from "../ui/CheckoutButton";
import CheckoutCard from "../ui/CheckoutCard";

const billingOptions = [
  { id: "same", name: "Same as shipping address" },
  { id: "different", name: "Use a different billing address" },
];

const PaymentForm = ({
  formData,
  onRadioChange,
  onPayNow,
  isProcessing = false,
}) => {
  return (
    <CheckoutCard title="Payment">
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Security color="primary" />
        <Typography variant="body2" color="text.secondary">
          All transactions are secure and encrypted.
        </Typography>
      </Box>

      {/* SSLCOMMERZ Integration */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "primary.main",
          borderRadius: 2,
          p: 2,
          mb: 3,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" color="white" fontWeight={600}>
            SSLCOMMERZ
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              component="img"
              src="/assets/images/sslcom 1.png"
              alt="SSL"
              sx={{ height: "32px" }}
            />
            <Box display="flex" gap={0.5}>
              <Box
                sx={{
                  width: "24px",
                  height: "16px",
                  backgroundColor: "blue.600",
                  borderRadius: "2px",
                }}
              />
              <Box
                sx={{
                  width: "24px",
                  height: "16px",
                  backgroundColor: "red.600",
                  borderRadius: "2px",
                }}
              />
              <Box
                sx={{
                  width: "24px",
                  height: "16px",
                  backgroundColor: "yellow.600",
                  borderRadius: "2px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Payment Flow Diagram */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "grey.50",
          borderRadius: 2,
          p: 2,
          mb: 3,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "white",
              border: "2px solid",
              borderColor: "grey.300",
              borderRadius: 2,
              p: 1.5,
              textAlign: "center",
              minWidth: "120px",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Current Page
            </Typography>
          </Paper>

          <Typography variant="h6" color="text.secondary">
            →
          </Typography>

          <Paper
            elevation={0}
            sx={{
              backgroundColor: "primary.light",
              border: "2px solid",
              borderColor: "primary.main",
              borderRadius: 2,
              p: 1.5,
              textAlign: "center",
              minWidth: "120px",
            }}
          >
            <Typography variant="body2" color="primary.dark">
              SSLCOMMERZ
            </Typography>
          </Paper>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mt={1}
        >
          After clicking 'Pay now', you will be redirected to SSLCOMMERZ to
          complete your purchase securely.
        </Typography>
      </Paper>

      {/* Billing Address */}
      <Box mb={3}>
        <RadioGroupField
          label="Billing Address"
          name="billingAddress"
          value={formData.billingAddress}
          onChange={onRadioChange}
          options={billingOptions}
        />
      </Box>

      {/* Pay Now Button */}
      <CheckoutButton
        variant="contained"
        fullWidth
        startIcon={<CreditCard />}
        onClick={onPayNow}
        loading={isProcessing}
        sx={{ mb: 2 }}
      >
        Pay Now
      </CheckoutButton>

      <Divider sx={{ my: 2 }} />

      {/* Footer Links */}
      <Box textAlign="center">
        <Link
          href="#"
          variant="body2"
          color="text.secondary"
          sx={{ mr: 2, textDecoration: "none" }}
        >
          Terms of service
        </Link>
        <Link
          href="#"
          variant="body2"
          color="text.secondary"
          sx={{ textDecoration: "none" }}
        >
          Refund policy
        </Link>
      </Box>
    </CheckoutCard>
  );
};

export default PaymentForm;
