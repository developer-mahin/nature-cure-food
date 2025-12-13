"use client";

import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import Modal from "./Modal";

const NoteModal = ({ open, onClose, onSave, initialNote = "" }) => {
  const [note, setNote] = useState(initialNote);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(note);
      onClose();
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNote(initialNote);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add Order Note"
      actions={
        <React.Fragment>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderColor: "#d1d5db",
              color: "#6b7280",
              "&:hover": {
                borderColor: "#9ca3af",
                backgroundColor: "#f9fafb",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={isLoading}
            sx={{
              backgroundColor: "#097B35",
              "&:hover": {
                backgroundColor: "#00662A",
              },
              "&:disabled": {
                backgroundColor: "#9ca3af",
              },
            }}
          >
            {isLoading ? "Saving..." : "Save Note"}
          </Button>
        </React.Fragment>
      }
    >
      <Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 2 }}
        >
          Add any special instructions or notes for your order. This will help
          us prepare your order exactly as you need it.
        </Typography>

        <TextField
          multiline
          rows={6}
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter your order note here... (e.g., 'Please deliver after 6 PM', 'No spicy items', etc.)"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#d1d5db",
              },
              "&:hover fieldset": {
                borderColor: "#9ca3af",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#097B35",
              },
            },
          }}
        />

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", marginTop: 1 }}
        >
          {note.length}/500 characters
        </Typography>
      </Box>
    </Modal>
  );
};

export default NoteModal;
