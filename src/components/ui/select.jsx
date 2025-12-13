"use client";

import * as React from "react";
import MuiSelect from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { cn } from "@/lib/utils";

function Select({ children, ...props }) {
  return (
    <FormControl fullWidth size="small">
      <MuiSelect data-slot="select" {...props}>
        {children}
      </MuiSelect>
    </FormControl>
  );
}

function SelectGroup({ children, ...props }) {
  return (
    <div data-slot="select-group" {...props}>
      {children}
    </div>
  );
}

function SelectValue({ placeholder, ...props }) {
  return (
    <span data-slot="select-value" {...props}>
      {placeholder}
    </span>
  );
}

function SelectTrigger({ className, size = "default", children, ...props }) {
  return (
    <div
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SelectContent({ className, children, position = "popper", ...props }) {
  return (
    <div
      data-slot="select-content"
      className={cn(
        "bg-popover text-popover-foreground relative z-50 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SelectLabel({ className, ...props }) {
  return (
    <div
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-sm font-medium", className)}
      {...props}
    />
  );
}

function SelectItem({ className, children, value, ...props }) {
  return (
    <MenuItem
      data-slot="select-item"
      value={value}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm",
        className
      )}
      {...props}
    >
      {children}
    </MenuItem>
  );
}

function SelectSeparator({ className, ...props }) {
  return (
    <hr
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({ className, ...props }) {
  return (
    <div
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    />
  );
}

function SelectScrollDownButton({ className, ...props }) {
  return (
    <div
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    />
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
