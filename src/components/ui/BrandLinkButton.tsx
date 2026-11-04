"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { brandButtonClasses, type BrandButtonVariant, type BrandButtonSize } from "@/components/ui/MyHayatButton";

/** Actual anchor for navigation; never nest a button inside a link. */
export function BrandLinkButton({ href, children, variant = "primary", size = "lg", className = "" }: {
  href: string;
  children: ReactNode;
  variant?: BrandButtonVariant;
  size?: BrandButtonSize;
  className?: string;
}) {
  return (
    <Link href={href} className={brandButtonClasses(variant, size, className)}>
      <span className="inline-flex items-center justify-center gap-2">{children}</span>
    </Link>
  );
}
