"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  IconButton,
} from "@mui/material";
import { X } from "lucide-react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "sm",
  fullWidth = true,
  className = "",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      className={className}
      PaperProps={{
        sx: {
          margin: "auto",
          maxHeight: "80vh",
          borderRadius: "12px",
          width: { xs: "90%", sm: "500px" },
          maxWidth: "500px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "#f8f9fa",
        }}
      >
        <span className="text-lg font-semibold text-gray-900">{title}</span>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "#6b7280",
            "&:hover": {
              backgroundColor: "#f3f4f6",
            },
          }}
        >
          <X className="h-5 w-5" />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          padding: "24px",
          backgroundColor: "white",
        }}
      >
        {children}
      </DialogContent>

      {actions && (
        <DialogActions
          sx={{
            padding: "16px 24px",
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "#f8f9fa",
            gap: "8px",
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
