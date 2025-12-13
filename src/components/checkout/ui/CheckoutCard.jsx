"use client";

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  "&:hover": {
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  "&:last-child": {
    paddingBottom: theme.spacing(3),
  },
}));

const CheckoutCard = ({ title, children, ...props }) => {
  return (
    <StyledCard {...props}>
      <StyledCardContent>
        {title && (
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#111827",
              marginBottom: 2,
            }}
          >
            {title}
          </Typography>
        )}
        {children}
      </StyledCardContent>
    </StyledCard>
  );
};

export default CheckoutCard;
