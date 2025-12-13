"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import { Search, FilterList, Sort } from "@mui/icons-material";
import { motion } from "framer-motion";
import ProductCard from "../main/Homepage/ProductSection/ProductCard";
import Pagination from "../ui/Pagination";

const CategoryLayout = ({
  categoryData,
  products,
  currentPage,
  onPageChange,
  itemsPerPage = 12,
}) => {
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort(
          (a, b) => a.discountedPrice - b.discountedPrice
        );
        break;
      case "price-high":
        filtered = [...filtered].sort(
          (a, b) => b.discountedPrice - a.discountedPrice
        );
        break;
      case "rating":
        filtered = [...filtered].sort(
          (a, b) => (b.rating || 0) - (a.rating || 0)
        );
        break;
      case "popular":
        filtered = [...filtered].sort(
          (a, b) => (b.salesCount || 0) - (a.salesCount || 0)
        );
        break;
      default:
        // Keep original order for "featured"
        break;
    }

    return filtered;
  }, [products, searchTerm, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    onPageChange(1); // Reset to first page when sorting changes
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onPageChange(1); // Reset to first page when searching
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontSize: { xs: "28px", md: "36px" },
            fontWeight: 700,
            color: "text.primary",
            mb: 2,
          }}
        >
          {categoryData.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, maxWidth: "600px" }}
        >
          {categoryData.description}
        </Typography>

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Chip
            label={`${filteredAndSortedProducts.length} Products`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`${
              Math.round(
                (filteredAndSortedProducts.reduce(
                  (acc, p) => acc + (p.rating || 0),
                  0
                ) /
                  filteredAndSortedProducts.length) *
                  10
              ) / 10
            } Avg Rating`}
            color="secondary"
            variant="outlined"
          />
        </Box>
      </Box>

      {/* Filters and Search */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          border: "1px solid",
          borderColor: "grey.200",
          borderRadius: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          {/* Search */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </Grid>

          {/* Sort */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                label="Sort by"
                startAdornment={
                  <InputAdornment position="start">
                    <Sort color="action" />
                  </InputAdornment>
                }
                sx={{
                  borderRadius: "8px",
                }}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="popular">Most Popular</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Products Grid */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paginatedProducts.map((product, index) => (
              <div item key={index} xs={6} lg={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} mainClass="lg:!h-[550px] h-[390px]"/>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            totalItems={filteredAndSortedProducts.length}
            itemsPerPage={itemsPerPage}
          />
        </>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filter criteria
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CategoryLayout;
