"use client";

import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import EmotionRegistry from "./EmotionRegistry";
import { getCurrentColors } from "@/lib/colors";

/**
 * Dynamically creates an MUI theme based on current color palette
 */
const createDynamicTheme = (colors = getCurrentColors()) =>
  createTheme({
    palette: {
      primary: {
        main: colors.primary[500],
        light: colors.primary[400],
        dark: colors.primary[700],
      },
      secondary: {
        main: colors.secondary[400],
        light: colors.secondary[300],
        dark: colors.secondary[600],
      },
      success: { main: colors.success },
      warning: { main: colors.warning },
      error: { main: colors.error },
      info: { main: colors.info },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
          },
        },
      },
    },
  });

export default function AppThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(() => createDynamicTheme());

  // Listen for color palette changes and update the MUI theme dynamically
  React.useEffect(() => {
    const handleColorChange = () => setTheme(createDynamicTheme());

    window.addEventListener("colorPaletteChanged", handleColorChange);
    handleColorChange(); // initialize

    return () => {
      window.removeEventListener("colorPaletteChanged", handleColorChange);
    };
  }, []);

  return (
    <EmotionRegistry options={{ key: "mui", prepend: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </EmotionRegistry>
  );
}
