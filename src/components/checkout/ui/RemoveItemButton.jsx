"use client";

import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: "24px",
  height: "24px",
  backgroundColor: theme.palette.error.light,
  "&:hover": {
    backgroundColor: theme.palette.error.main,
    "& .MuiSvgIcon-root": {
      color: "white",
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: "12px",
    color: theme.palette.error.dark,
  },
}));

const RemoveItemButton = ({ onRemove, tooltip = "Remove item" }) => {
  return (
    <Tooltip title={tooltip} arrow>
      <StyledIconButton onClick={onRemove} size="small">
        <Delete />
      </StyledIconButton>
    </Tooltip>
  );
};

export default RemoveItemButton;
