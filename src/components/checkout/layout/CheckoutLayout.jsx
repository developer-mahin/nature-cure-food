"use client";

import React from "react";
import { Box, Container, Grid } from "@mui/material";
import CheckoutHeader from "./CheckoutHeader";

const CheckoutLayout = ({ children, orderSummary }) => {
  return (
    <Box
      sx={{
        backgroundColor: "grey.50",
        minHeight: "100vh",
      }}
    >
      <CheckoutHeader />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <div className="flex lg:flex-row flex-col-reverse gap-x-10">
          {/* Left Column - Forms */}
          <div>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {children}
            </Box>
          </div>

          {/* Right Column - Order Summary */}
          <Grid item xs={12} lg={4}>
            {orderSummary}
          </Grid>
        </div>
      </Container>
    </Box>
  );
};

export default CheckoutLayout;
