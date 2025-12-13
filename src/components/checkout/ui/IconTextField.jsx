"use client";

import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
    fontWeight: 500,
    color: "#374151",
  },
  "& .MuiInputBase-input": {
    padding: "12px 14px",
  },
}));

const IconTextField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  required = false,
  icon: Icon,
  ...props
}) => {
  return (
    <StyledTextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      name={name}
      required={required}
      variant="outlined"
      InputProps={{
        startAdornment: Icon && (
          <InputAdornment position="start">
            <Icon sx={{ color: "#9CA3AF", fontSize: "20px" }} />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default IconTextField;
