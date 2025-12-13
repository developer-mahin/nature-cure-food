"use client";

import React from "react";
import { IconButton, Typography, Box } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: "24px",
  height: "24px",
  backgroundColor: theme.palette.grey[100],
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
  "& .MuiSvgIcon-root": {
    fontSize: "12px",
    color: theme.palette.grey[600],
  },
}));

const QuantityControl = ({ quantity, onIncrease, onDecrease, min = 1 }) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <StyledIconButton
        onClick={onDecrease}
        disabled={quantity <= min}
        size="small"
      >
        <Remove />
      </StyledIconButton>

      <Typography
        variant="body2"
        sx={{
          minWidth: "20px",
          textAlign: "center",
          fontWeight: 500,
          color: "#111827",
        }}
      >
        {quantity}
      </Typography>

      <StyledIconButton onClick={onIncrease} size="small">
        <Add />
      </StyledIconButton>
    </Box>
  );
};

export default QuantityControl;
