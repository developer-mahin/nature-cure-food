"use client";

import React from "react";
import {
  Pagination as MuiPagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";

const StyledPagination = styled(MuiPagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    borderRadius: "8px",
    fontWeight: 500,
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
    },
  },
}));

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showInfo = true,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
      {showInfo && (
        <Typography variant="body2" color="text.secondary">
          Showing {startItem} to {endItem} of {totalItems} products
        </Typography>
      )}

      <StyledPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{
              previous: ChevronLeft,
              next: ChevronRight,
              first: FirstPage,
              last: LastPage,
            }}
          />
        )}
      />
    </Stack>
  );
};

export default Pagination;
