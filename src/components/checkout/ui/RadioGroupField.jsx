"use client";

import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiFormLabel-root": {
    fontSize: "16px",
    fontWeight: 500,
    color: "#111827",
    marginBottom: theme.spacing(2),
  },
  "& .MuiRadio-root": {
    color: theme.palette.primary.main,
    "&.Mui-checked": {
      color: theme.palette.primary.main,
    },
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    fontSize: "14px",
    color: "#374151",
  },
}));

const RadioGroupField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  ...props
}) => {
  return (
    <StyledFormControl component="fieldset" fullWidth>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange} {...props}>
        {options.map((option) => (
          <StyledFormControlLabel
            key={option.id || option.value}
            value={option.id || option.value}
            control={<Radio />}
            label={
              <Box display="flex" justifyContent="space-between" width="100%">
                <Typography variant="body2" color="text.primary">
                  {option.name || option.label}
                </Typography>
                {option.price !== undefined && (
                  <Typography variant="body2" color="text.secondary">
                    {option.price === 0 ? "Free" : `৳ ${option.price}.00`}
                  </Typography>
                )}
              </Box>
            }
          />
        ))}
      </RadioGroup>
    </StyledFormControl>
  );
};

export default RadioGroupField;
