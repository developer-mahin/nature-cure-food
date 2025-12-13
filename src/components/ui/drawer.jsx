"use client";

import * as React from "react";
import MuiDrawer from "@mui/material/Drawer";
import { cn } from "@/lib/utils";

const DrawerContext = React.createContext({});

function Drawer({ children, open, onOpenChange, ...props }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    if (onOpenChange) onOpenChange(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <DrawerContext.Provider value={{ isOpen, handleOpen, handleClose }}>
      <div data-slot="drawer" {...props}>
        {children}
      </div>
    </DrawerContext.Provider>
  );
}

function DrawerTrigger({ children, asChild, ...props }) {
  const { handleOpen } = React.useContext(DrawerContext);

  if (asChild) {
    return React.cloneElement(children, { onClick: handleOpen });
  }

  return (
    <button data-slot="drawer-trigger" onClick={handleOpen} {...props}>
      {children}
    </button>
  );
}

function DrawerPortal({ children, ...props }) {
  return <>{children}</>;
}

function DrawerClose({ children, asChild, ...props }) {
  const { handleClose } = React.useContext(DrawerContext);

  if (asChild) {
    return React.cloneElement(children, { onClick: handleClose });
  }

  return (
    <button data-slot="drawer-close" onClick={handleClose} {...props}>
      {children}
    </button>
  );
}

function DrawerOverlay({ className, ...props }) {
  return (
    <div
      data-slot="drawer-overlay"
      className={cn("fixed inset-0 z-50 bg-black/50", className)}
      {...props}
    />
  );
}

function DrawerContent({ className, children, ...props }) {
  const { isOpen, handleClose } = React.useContext(DrawerContext);

  return (
    <MuiDrawer
      data-slot="drawer-content"
      anchor="bottom"
      open={isOpen}
      onClose={handleClose}
      className={cn(className)}
      PaperProps={{
        className: cn(
          "group/drawer-content bg-background flex h-auto flex-col max-h-[80vh] rounded-t-lg",
          className
        ),
      }}
      {...props}
    >
      <div className="bg-muted mx-auto mt-4 h-2 w-[100px] shrink-0 rounded-full" />
      {children}
    </MuiDrawer>
  );
}

function DrawerHeader({ className, ...props }) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }) {
  return (
    <h2
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }) {
  return (
    <p
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
