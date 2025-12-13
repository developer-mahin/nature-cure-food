"use client";

import { Box, MenuItem, TextField } from "@mui/material";
import { getAllDistrict, getAllUpazila } from "bd-divisions-to-unions";
import { useMemo } from "react";
import { FiChevronDown } from "react-icons/fi";

/**
 * Standalone Address Select Component
 * Works with controlled inputs (no React Hook Form required)
 * For use in checkout page where FormProvider is not available
 */
const StandaloneAddressSelect = ({
  value,
  onChange,
  name = "addressField",
}) => {
  const addressValue = value || { district: "", upazila: "" };

  // Memoize the static data (fetched once)
  const districtsData = useMemo(() => getAllDistrict("en"), []);
  const upazilasData = useMemo(() => getAllUpazila("en"), []);

  // Memoize filtered districts - show all districts since division is not used
  const filteredDistricts = useMemo(() => {
    // Flatten all districts from all divisions since division select is commented out
    const allDistricts = [];
    Object.keys(districtsData).forEach((divisionId) => {
      if (
        districtsData[divisionId] &&
        Array.isArray(districtsData[divisionId])
      ) {
        allDistricts.push(...districtsData[divisionId]);
      }
    });
    return allDistricts;
  }, [districtsData]);

  // Memoize filtered upazilas based on selected district
  const filteredUpazilas = useMemo(() => {
    if (!addressValue.district || !upazilasData[addressValue.district])
      return [];
    return upazilasData[addressValue.district];
  }, [addressValue.district, upazilasData]);

  // Common styles (memoized to avoid recreation)
  const textFieldStyles = useMemo(
    () => ({
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: "2px solid #6366f1",
        },
        "&:hover fieldset": {
          border: "2px solid #8b5cf6",
        },
        "&.Mui-focused fieldset": {
          border: "2px solid #a855f7",
          boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.2)",
        },
        "&.Mui-error fieldset": {
          border: "2px solid #ef4444",
        },
        "&.Mui-error:hover fieldset": {
          border: "2px solid #dc2626",
        },
        "&.Mui-error.Mui-focused fieldset": {
          border: "2px solid #b91c1c",
          boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.2)",
        },
      },
      "& .MuiSelect-select": {
        color: "#1e293b",
        "&.Mui-disabled": {
          color: "rgba(100, 116, 139, 0.5)",
        },
      },
      "& .MuiInputLabel-root": {
        color: "rgba(100, 116, 139, 0.8)",
        "&.Mui-focused": {
          color: "#6366f1",
          fontWeight: 600,
        },
        "&.MuiInputLabel-shrink": {
          display: "none",
        },
      },
      "& .MuiFormHelperText-root": {
        color: "rgba(239, 68, 68, 0.8)",
        fontWeight: 500,
      },
    }),
    []
  );

  // Handle district change
  const handleDistrictChange = (e) => {
    const districtValue = e.target.value;
    onChange({
      ...addressValue,
      district: districtValue,
      upazila: "", // Clear upazila when district changes
    });
  };

  // Handle upazila change
  const handleUpazilaChange = (e) => {
    const upazilaValue = e.target.value;
    onChange({
      ...addressValue,
      upazila: upazilaValue,
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* District Select */}
      <TextField
        select
        label="জেলা (District)"
        size="small"
        value={addressValue.district || ""}
        onChange={handleDistrictChange}
        fullWidth
        sx={textFieldStyles}
        SelectProps={{
          IconComponent: () => <FiChevronDown className="mr-2" />,
        }}
      >
        <MenuItem value="">
          <em>Select District</em>
        </MenuItem>
        {filteredDistricts.map((district) => (
          <MenuItem key={district.value} value={String(district.value)}>
            {district.title}
          </MenuItem>
        ))}
      </TextField>

      {/* Upazila Select */}
      <TextField
        select
        label="উপজেলা (Upazila)"
        size="small"
        value={addressValue.upazila || ""}
        onChange={handleUpazilaChange}
        fullWidth
        disabled={!addressValue.district}
        sx={textFieldStyles}
        SelectProps={{
          IconComponent: () => <FiChevronDown className="mr-2" />,
        }}
      >
        <MenuItem value="">
          <em>Select Upazila</em>
        </MenuItem>
        {filteredUpazilas.map((upazila) => (
          <MenuItem key={upazila.value} value={String(upazila.value)}>
            {upazila.title}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default StandaloneAddressSelect;
