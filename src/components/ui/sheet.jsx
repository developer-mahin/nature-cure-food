"use client";

import { cn } from "@/lib/utils";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { XIcon } from "lucide-react";
import * as React from "react";

const SheetContext = React.createContext({});

function Sheet({
  children,
  open,
  onOpenChange,
  listenToOpenEvent = false,
  ...props
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalOpen;

  const handleOpen = () => {
    if (open === undefined) {
      setInternalOpen(true);
    }
    if (onOpenChange) onOpenChange(true);
  };

  const handleClose = () => {
    if (open === undefined) {
      setInternalOpen(false);
    }
    if (onOpenChange) onOpenChange(false);
  };

  // Listen for global openCart event
  React.useEffect(() => {
    if (listenToOpenEvent) {
      const handleOpenEvent = () => {
        handleOpen();
      };
      window.addEventListener("openCart", handleOpenEvent);
      return () => window.removeEventListener("openCart", handleOpenEvent);
    }
  }, [listenToOpenEvent]);

  return (
    <SheetContext.Provider value={{ isOpen, handleOpen, handleClose }}>
      <div data-slot="sheet" {...props}>
        {children}
      </div>
    </SheetContext.Provider>
  );
}

function SheetTrigger({ children, asChild, ...props }) {
  const { handleOpen } = React.useContext(SheetContext);

  if (asChild) {
    return React.cloneElement(children, { onClick: handleOpen });
  }

  return (
    <button data-slot="sheet-trigger" onClick={handleOpen} {...props}>
      {children}
    </button>
  );
}

function SheetClose({ children, asChild, ...props }) {
  const { handleClose } = React.useContext(SheetContext);

  if (asChild) {
    return React.cloneElement(children, { onClick: handleClose });
  }

  return (
    <button data-slot="sheet-close" onClick={handleClose} {...props}>
      {children}
    </button>
  );
}

function SheetContent({ className, children, side = "right", ...props }) {
  const { isOpen, handleClose } = React.useContext(SheetContext);

  const anchor =
    side === "left"
      ? "left"
      : side === "top"
      ? "top"
      : side === "bottom"
      ? "bottom"
      : "right";

  return (
    <MuiDrawer
      data-slot="sheet-content"
      anchor={anchor}
      open={isOpen}
      onClose={handleClose}
      className={cn(className)}
      PaperProps={{
        className: cn(
          "bg-background flex flex-col shadow-lg",
          side === "right" && "w-[92vw] sm:w-[480px] h-full",
          side === "left" && "w-3/4 sm:max-w-sm h-full",
          side === "top" && "h-auto",
          side === "bottom" && "h-auto",
          className
        ),
        style: {
          marginTop: side === "right" || side === "left" ? "0" : "0",
        },
      }}
      {...props}
    >
      {children}
    </MuiDrawer>
  );
}

function SheetHeader({ className, ...props }) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }) {
  return (
    <h2
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold text-lg", className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }) {
  return (
    <p
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
