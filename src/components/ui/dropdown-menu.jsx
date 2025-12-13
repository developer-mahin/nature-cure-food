"use client";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { cn } from "@/lib/utils";

function DropdownMenu({ children, open, onClose, onOpenChange, ...props }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = anchorEl !== null;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (onOpenChange) onOpenChange(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (onOpenChange) onOpenChange(false);
    if (onClose) onClose();
  };

  return (
    <DropdownMenuContext.Provider
      value={{ anchorEl, handleClick, handleClose, menuOpen }}
    >
      {children}
    </DropdownMenuContext.Provider>
  );
}

const DropdownMenuContext = React.createContext({});

function DropdownMenuPortal({ children, ...props }) {
  return <>{children}</>;
}

function DropdownMenuTrigger({ children, asChild, ...props }) {
  const { handleClick } = React.useContext(DropdownMenuContext);

  if (asChild) {
    return React.cloneElement(children, { onClick: handleClick });
  }

  return (
    <div onClick={handleClick} {...props}>
      {children}
    </div>
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  children,
  ...props
}) {
  const { anchorEl, handleClose, menuOpen } =
    React.useContext(DropdownMenuContext);

  return (
    <Menu
      data-slot="dropdown-menu-content"
      anchorEl={anchorEl}
      open={menuOpen}
      onClose={handleClose}
      className={cn(className)}
      slotProps={{
        paper: {
          className: cn(
            "bg-popover text-popover-foreground min-w-[8rem] rounded-md border shadow-md",
            className
          ),
        },
      }}
      {...props}
    >
      {children}
    </Menu>
  );
}

function DropdownMenuGroup({ children, ...props }) {
  return (
    <div data-slot="dropdown-menu-group" {...props}>
      {children}
    </div>
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  children,
  onClick,
  ...props
}) {
  const { handleClose } = React.useContext(DropdownMenuContext);

  const handleClick = (e) => {
    if (onClick) onClick(e);
    handleClose();
  };

  return (
    <MenuItem
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 px-2 py-1.5 text-sm",
        variant === "destructive" && "text-destructive",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </MenuItem>
  );
}

function DropdownMenuCheckboxItem({ className, children, checked, ...props }) {
  return (
    <MenuItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex items-center gap-2 py-1.5 pr-2 pl-8 text-sm",
        className
      )}
      {...props}
    >
      {checked && <span className="absolute left-2">✓</span>}
      {children}
    </MenuItem>
  );
}

function DropdownMenuRadioGroup({ children, ...props }) {
  return (
    <div data-slot="dropdown-menu-radio-group" {...props}>
      {children}
    </div>
  );
}

function DropdownMenuRadioItem({ className, children, ...props }) {
  return (
    <MenuItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex items-center gap-2 py-1.5 pr-2 pl-8 text-sm",
        className
      )}
      {...props}
    >
      {children}
    </MenuItem>
  );
}

function DropdownMenuLabel({ className, inset, children, ...props }) {
  return (
    <div
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuSeparator({ className, ...props }) {
  return (
    <Divider
      data-slot="dropdown-menu-separator"
      className={cn("my-1", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({ className, children, ...props }) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("text-muted-foreground ml-auto text-xs", className)}
      {...props}
    >
      {children}
    </span>
  );
}

function DropdownMenuSub({ children, ...props }) {
  return (
    <div data-slot="dropdown-menu-sub" {...props}>
      {children}
    </div>
  );
}

function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
  return (
    <MenuItem
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground flex items-center px-2 py-1.5 text-sm",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
    </MenuItem>
  );
}

function DropdownMenuSubContent({ className, children, ...props }) {
  return (
    <Menu
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground min-w-[8rem] rounded-md border shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </Menu>
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
