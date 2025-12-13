// Centralized Color Palette System
// Change these colors to update the entire website's color scheme

export const colorPalettes = {
  // Natural Cure (Current Green Theme) - Original Working Colors
  naturalCure: {
    primary: {
      50: "#e8f5e8",
      100: "#c8e6c9",
      200: "#a5d6a7",
      300: "#81c784",
      400: "#66bb6a",
      500: "#097B35", // Original working green
      600: "#00662A",
      700: "#1B5E20",
      800: "#1B5E20",
      900: "#0d4a1a",
    },
    secondary: {
      50: "#f0fff4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#57FF98", // Original working light green
      600: "#22c55e",
      700: "#16a34a",
      800: "#15803d",
      900: "#14532d",
    },
    accent: {
      50: "#f8f9fa",
      100: "#EDE3D1", // Original offer section color
      200: "#CAFFCE", // Original footer background
      300: "#dadce0",
      400: "#bdc1c6",
      500: "#9aa0a6",
      600: "#80868b",
      700: "#5f6368",
      800: "#3c4043",
      900: "#202124",
    },
    success: "#4caf50",
    warning: "#ff9800",
    error: "#f44336",
    info: "#2196f3",
  },
};

// Current active palette - Change this to switch themes
export const currentPalette = "naturalCure";

// Get current colors
export const getCurrentColors = () => colorPalettes[currentPalette];

// CSS Variables generator
export const generateCSSVariables = (palette = getCurrentColors()) => {
  const cssVars = {};

  // Primary colors
  Object.entries(palette.primary).forEach(([key, value]) => {
    cssVars[`--color-primary-${key}`] = value;
  });

  // Secondary colors
  Object.entries(palette.secondary).forEach(([key, value]) => {
    cssVars[`--color-secondary-${key}`] = value;
  });

  // Accent colors
  Object.entries(palette.accent).forEach(([key, value]) => {
    cssVars[`--color-accent-${key}`] = value;
  });

  // Semantic colors
  cssVars["--color-success"] = palette.success;
  cssVars["--color-warning"] = palette.warning;
  cssVars["--color-error"] = palette.error;
  cssVars["--color-info"] = palette.info;

  return cssVars;
};
