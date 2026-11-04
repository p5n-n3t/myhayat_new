import { describe, expect, test } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { readFileSync } from "node:fs";
import { BrandLinkButton } from "@/components/ui/BrandLinkButton";
import { brandButtonClasses } from "@/components/ui/MyHayatButton";

describe("My Hayat CTA and visual contracts", () => {
  test("navigation CTA is a real anchor with no nested button", () => {
    const html = renderToStaticMarkup(createElement(BrandLinkButton, { href: "/chat" }, "Try Demo"));
    expect(html).toContain('href="/chat"');
    expect(html).not.toContain("<button");
    expect(html).toContain("bg-myhayat-pink");
  });

  test("branded variants never use a white button fill", () => {
    for (const variant of ["primary", "secondary", "outline", "ghost"] as const) {
      expect(brandButtonClasses(variant)).not.toContain("bg-white");
    }
  });

  test("pricing choices map to chat or an actual waitlist modal", () => {
    const source = readFileSync("src/app/pricing/page.tsx", "utf8");
    expect(source).toContain('href: "/chat"');
    expect(source.match(/href: "#waitlist-modal"/g)).toHaveLength(2);
    expect(source).toContain("<BrandLinkButton");
    const layout = readFileSync("src/app/layout.tsx", "utf8");
    expect(layout).toContain("<WaitlistModal />");
  });

  test("hero beam traces the heart and its three detached rays", () => {
    const beam = readFileSync("public/myhayat_hero_traces.svg", "utf8");
    expect(beam.match(/class="beam track-/g)).toHaveLength(4);
    expect(beam).toContain("stroke-dasharray:6 94");
  });
});
