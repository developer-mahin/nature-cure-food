"use client";

import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "16px",
  padding: "12px 24px",
  ...(variant === "contained" && {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "&:disabled": {
      backgroundColor: theme.palette.grey[400],
      color: theme.palette.grey[600],
    },
  }),
  ...(variant === "outlined" && {
    borderColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    "&:hover": {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
  }),
}));

const CheckoutButton = ({
  children,
  variant = "contained",
  fullWidth = false,
  size = "large",
  onClick,
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      onClick={onClick}
      disabled={disabled || loading}
      startIcon={loading ? null : startIcon}
      endIcon={endIcon}
      {...props}
    >
      {loading ? "Processing..." : children}
    </StyledButton>
  );
};

export default CheckoutButton;
