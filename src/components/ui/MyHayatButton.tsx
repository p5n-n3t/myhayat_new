"use client";

import React from "react";

export type BrandButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type BrandButtonSize = "sm" | "md" | "lg";

interface MyHayatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BrandButtonVariant;
  size?: BrandButtonSize;
  children: React.ReactNode;
}

const BUTTON_BASE = "relative inline-flex items-center justify-center font-titan tracking-wide border-[3px] transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-myhayat-yellow disabled:pointer-events-none disabled:opacity-50 rounded-full";

const BUTTON_VARIANTS: Record<BrandButtonVariant,string> = {
  primary: "bg-myhayat-pink text-[#211723] border-myhayat-yellow shadow-[4px_5px_0_#F98181] hover:shadow-[5px_6px_0_#FEC810]",
  secondary: "bg-myhayat-yellow text-[#211723] border-myhayat-salmon shadow-[4px_5px_0_#F85BAA] hover:shadow-[5px_6px_0_#F98181]",
  outline: "bg-[#292c3a] text-myhayat-yellow border-myhayat-salmon shadow-[4px_5px_0_#F85BAA] hover:bg-[#382438]",
  ghost: "bg-[#211723] text-myhayat-salmon border-myhayat-pink shadow-[3px_4px_0_#FEC810] hover:bg-[#292c3a]",
};
const BUTTON_SIZES: Record<BrandButtonSize,string> = {
  sm: "min-h-9 px-4 text-sm",
  md: "min-h-11 px-6 text-base",
  lg: "min-h-14 px-6 sm:px-8 text-base sm:text-lg",
};

export function brandButtonClasses(variant: BrandButtonVariant = "primary", size: BrandButtonSize = "md", extra = "") {
  return [BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], extra].filter(Boolean).join(" ");
}

export const MyHayatButton = React.forwardRef<HTMLButtonElement, MyHayatButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <button ref={ref} className={brandButtonClasses(variant, size, className)} {...props}>
      <span className="inline-flex items-center justify-center gap-2">{children}</span>
    </button>
  )
);
MyHayatButton.displayName = "MyHayatButton";
