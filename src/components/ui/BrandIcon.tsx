import Image from "next/image";

const ICONS = {
  heart: "/decor_heart.svg",
  bloom: "/Spring Daisy Icon.svg",
  sparkle: "/decor_twinkle_pink.svg",
  sun: "/decor_sun.svg",
  eye: "/decor_eye_in_hand.svg",
  flower: "/decor_flower_1.svg",
  lips: "/decor_lips.svg",
  mushroom: "/decor_mushroom_1.svg",
  planet: "/decor_hayat_planet_2.svg",
  smile: "/decor_melting_smiley.svg",
  asterisk: "/decor_yellow_asterisk.svg",
} as const;

/** Reuse My Hayat's illustrated, playful SVG vocabulary rather than generic line icons. */
export function BrandIcon({ kind, size = 40, className = "" }: {
  kind: keyof typeof ICONS;
  size?: number;
  className?: string;
}) {
  return <Image src={ICONS[kind]} width={size} height={size} alt="" aria-hidden="true"
    className={"inline-block object-contain " + className} />;
}
