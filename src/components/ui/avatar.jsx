"use client";

import * as React from "react";
import MuiAvatar from "@mui/material/Avatar";
import { cn } from "@/lib/utils";

function Avatar({ className, ...props }) {
  return (
    <MuiAvatar
      data-slot="avatar"
      className={cn("size-8", className)}
      {...props}
    />
  );
}

function AvatarImage({ className, src, alt, ...props }) {
  return (
    <MuiAvatar
      data-slot="avatar-image"
      src={src}
      alt={alt}
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, children, ...props }) {
  return (
    <MuiAvatar
      data-slot="avatar-fallback"
      className={cn("bg-muted size-full", className)}
      {...props}
    >
      {children}
    </MuiAvatar>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
