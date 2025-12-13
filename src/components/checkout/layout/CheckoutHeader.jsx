"use client";

import React from "react";
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import { Home, ChevronRight } from "@mui/icons-material";

const CheckoutHeader = () => {
  return (
    <Box>
      {/* Green line at top */}
      <Box
        sx={{
          height: "4px",
          backgroundColor: "primary.main",
        }}
      />

      {/* Header Content */}
      <Box
        sx={{
          backgroundColor: "white",
          py: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: "1280px",
            mx: "auto",
            px: 2,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontSize: { xs: "24px", md: "32px" },
              fontWeight: 700,
              color: "text.primary",
              mb: 1,
            }}
          >
            Checkout
          </Typography>

          <Breadcrumbs
            separator={<ChevronRight fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              underline="hover"
              color="text.secondary"
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              <Home fontSize="small" />
              Home
            </Link>
            <Typography color="text.primary" variant="body2">
              Checkout
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutHeader;
