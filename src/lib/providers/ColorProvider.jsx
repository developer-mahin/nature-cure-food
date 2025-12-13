"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  colorPalettes,
  getCurrentColors,
  generateCSSVariables,
} from "../colors";

const ColorContext = createContext(null);

export function ColorProvider({ children, initialPalette = "naturalCure" }) {
  const [currentPalette, setCurrentPalette] = useState(initialPalette);

  // Apply CSS variables when palette changes
  useEffect(() => {
    const palette = colorPalettes[currentPalette];
    const cssVars = generateCSSVariables(palette);

    // Apply CSS variables to root
    const root = document.documentElement;
    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Dispatch custom event for MUI theme updates
    const event = new CustomEvent("colorPaletteChanged", {
      detail: { palette: currentPalette, colors: palette },
    });
    window.dispatchEvent(event);
  }, [currentPalette]);

  // Apply initial colors immediately
  useEffect(() => {
    const palette = colorPalettes[currentPalette];
    const cssVars = generateCSSVariables(palette);

    // Apply CSS variables to root immediately
    const root = document.documentElement;
    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, []);

  const switchPalette = (paletteName) => {
    if (colorPalettes[paletteName]) {
      setCurrentPalette(paletteName);
    }
  };

  const value = {
    currentPalette,
    availablePalettes: Object.keys(colorPalettes),
    colors: getCurrentColors(),
    switchPalette,
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}

export function useColors() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColors must be used within a ColorProvider");
  }
  return context;
}
