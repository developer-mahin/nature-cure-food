"use client";

import { useColors } from "@/lib/providers/ColorProvider";
import { Button } from "@/components/ui/button";

const ColorSwitcher = () => {
  const { currentPalette, availablePalettes, switchPalette } = useColors();

  return (
    <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border">
      <h3 className="text-sm font-medium mb-3">Color Palette Switcher</h3>
      <div className="flex flex-col gap-2">
        {availablePalettes.map((palette) => (
          <Button
            key={palette}
            variant={currentPalette === palette ? "default" : "outline"}
            size="sm"
            onClick={() => switchPalette(palette)}
            className="text-xs"
          >
            {palette.replace(/([A-Z])/g, " $1").trim()}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ColorSwitcher;
