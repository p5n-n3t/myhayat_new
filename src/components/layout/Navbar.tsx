"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { SITE_NAV_ITEMS } from "@/lib/site-navigation";
import { PixelHoverPill } from "@/components/ui/PixelHoverPill";
import { MyHayatButton } from "@/components/ui/MyHayatButton";

const CLOUDS = [
  { asset: "/decor_cloud_1.svg", lane: "sky-cloud--1" },
  { asset: "/decor_cloud_2.svg", lane: "sky-cloud--2" },
  { asset: "/decor_cloud_3.svg", lane: "sky-cloud--3" },
  { asset: "/decor_cloud_1.svg", lane: "sky-cloud--4" },
  { asset: "/decor_cloud_2.svg", lane: "sky-cloud--5" },
  { asset: "/decor_cloud_3.svg", lane: "sky-cloud--6" },
  { asset: "/decor_cloud_1.svg", lane: "sky-cloud--7" },
  { asset: "/decor_cloud_2.svg", lane: "sky-cloud--8" },
];

const CloudSky = () => (
  <div className="site-clouds" aria-hidden="true">
    {CLOUDS.map((cloud) => (
      <img key={cloud.lane} src={cloud.asset} alt="" className={"sky-cloud " + cloud.lane} />
    ))}
  </div>
);

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t, locale, toggleLocale } = useTranslation();
  const navLinks = SITE_NAV_ITEMS.map((item) => ({ name: t(item.key), href: item.href }));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
¶»§q«^