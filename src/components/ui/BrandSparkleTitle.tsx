"use client";

import type { ReactNode } from "react";
import { SparklesText } from "@/components/ui/sparkles-text";

/** One typographic system for animated page and section headings. */
export function BrandSparkleTitle({
  children,
  className = "",
  count = 9,
  color = "pink",
}: {
  children: ReactNode;
  className?: string;
  count?: number;
  color?: "pink" | "salmon" | "yellow";
}) {
  const palette = color === "salmon"
    ? { first: "#F98181", second: "#FEC810" }
    : color === "yellow"
      ? { first: "#FEC810", second: "#F85BAA" }
      : { first: "#F85BAA", second: "#F98181" };
  return (
    <SparklesText colors={palette} sparklesCount={count}
      className={"brand-sparkle-title inline text-[inherit] " + className}>
      {children}
    </SparklesText>
  );
}
