"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { Home, ChevronRight } from "@mui/icons-material";
import CategoryLayout from "./CategoryLayout";
import { categoryProducts } from "@/lib/categoryProducts";

const CategoryPage = ({ categorySlug }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Get category data
  const categoryData = categoryProducts[categorySlug];
  const products = categoryData?.products || [];

  // Handle page changes from URL
  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Update URL without causing a full page reload
    const url = new URL(window.location);
    url.searchParams.set("page", page.toString());
    router.push(url.pathname + url.search, { scroll: false });
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (!categoryData) {
    return (
      <Container maxWidth="lg" className="">
        <Box sx={{ py: 8, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Category not found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The requested category does not exist.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="lg:mt-0 mt-10 lg:!px-24">
      {/* Breadcrumbs */}
      <Box sx={{ py: 2 }}>
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
            {categoryData.title}
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Category Content */}
      <CategoryLayout
        categoryData={categoryData}
        products={products}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={12}
      />
    </Container>
  );
};

export default CategoryPage;
