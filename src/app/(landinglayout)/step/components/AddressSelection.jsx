"use client";

import getNestedError from "@/lib/nestedError";
import { Box, MenuItem, TextField } from "@mui/material";
import { getAllDistrict, getAllUpazila } from "bd-divisions-to-unions";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";

const AddressSelect = ({ name }) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  // Watch form values for cascading filtering
  const districtValue = watch(`${name}.district`);

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
    if (!districtValue || !upazilasData[districtValue]) return [];
    return upazilasData[districtValue];
  }, [districtValue, upazilasData]);

  // Get errors
  const districtError = getNestedError(errors, `${name}.district`);
  const upazilaError = getNestedError(errors, `${name}.upazila`);

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* District Select */}
      <Controller
        name={`${name}.district`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="জেলা (District)"
            size="small"
            value={field.value || ""}
            onChange={(e) => {
              const v = e.target.value;
              field.onChange(v);
              setValue(`${name}.upazila`, "");
            }}
            fullWidth
            error={!!districtError}
            helperText={districtError?.message}
            sx={textFieldStyles}
            SelectProps={{
              IconComponent: () => <FiChevronDown className="mr-2" />,
            }}
          >
            {filteredDistricts.map((district) => (
              <MenuItem key={district.value} value={String(district.value)}>
                {district.title}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Upazila Select */}
      <Controller
        name={`${name}.upazila`}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="উপজেলা (Upazila)"
            size="small"
            error={!!upazilaError}
            helperText={upazilaError?.message}
            value={field.value || ""}
            onChange={(e) => field.onChange(e.target.value)}
            fullWidth
            disabled={!districtValue}
            sx={textFieldStyles}
            SelectProps={{
              IconComponent: () => <FiChevronDown className="mr-2" />,
            }}
          >
            {filteredUpazilas.map((upazila) => (
              <MenuItem key={upazila.value} value={String(upazila.value)}>
                {upazila.title}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Box>
  );
};

export default AddressSelect;
