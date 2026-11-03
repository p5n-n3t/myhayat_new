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
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const openContact = () => {
    setIsOpen(false);
    window.location.hash = "contact-modal";
  };

  return (
    <>
      <nav aria-label="Primary navigation" className="fixed top-3 md:top-4 inset-x-0 z-50 pointer-events-none px-3 md:px-5">
        {/* On phones the whole island is only the clickable logo, anchored to the right. */}
        <div className="flex justify-end lg:hidden max-w-7xl mx-auto">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="myhayat-mobile-navigation"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setIsOpen((prev) => !prev)}
            className="pointer-events-auto relative flex items-center justify-center w-[4.15rem] h-[3.65rem] rounded-[1.6rem] border-[3px] border-myhayat-salmon bg-[#292c3a]/95 dark:bg-[#211723]/95 shadow-[4px_5px_0px_0px_var(--color-myhayat-pink)] backdrop-blur-md focus-visible:outline-4 focus-visible:outline-myhayat-yellow"
          >
            <Image src="/myhayat-logo.png" alt="" width={50} height={50} className="h-11 w-11 object-contain" />
            <span className="absolute -bottom-1 -right-1 rounded-full bg-myhayat-yellow border border-[#292c3a] p-0.5 text-[#292c3a]">
              {isOpen ? <X size={12} strokeWidth={3} /> : <ChevronDown size={12} strokeWidth={3} />}
            </span>
          </button>
        </div>

        {/* Desktop: full neo-brutalist navigation bar. */}
        <div className="hidden lg:flex max-w-[94rem] mx-auto items-center gap-3 rounded-[2rem] bg-myhayat-yellow/90 backdrop-blur-md border-4 border-myhayat-salmon shadow-[var(--shadow-curved)] py-1.5 px-4 dark:bg-[#2d1825]/90 dark:border-myhayat-pink/50 pointer-events-auto">
          <Link href="/" className="shrink-0 flex items-center pl-2" aria-label={t("nav.home")}>
            <Image src="/myhayat-logo.png" alt="My Hayat" width={150} height={50} className="w-auto h-11 xl:h-12 object-contain" />
          </Link>
          <div className="flex flex-1 min-w-0 items-center justify-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link href={link.href} key={link.href} title={link.name} aria-current={pathname === link.href ? "page" : undefined}>
                <PixelHoverPill active={pathname === link.href} className="font-titan text-[0.75rem] xl:text-[0.9rem]">{link.name}</PixelHoverPill>
              </Link>
            ))}
            <button type="button" onClick={openContact}>
              <PixelHoverPill className="font-titan text-[0.75rem] xl:text-[0.9rem]">{t("nav.contact")}</PixelHoverPill>
            </button>
          </div>
          <div className="flex shrink-0 gap-2 items-center">
            <button type="button" onClick={toggleLocale} aria-label="Switch language" className="flex rounded-full overflow-hidden border-2 border-myhayat-salmon/40 bg-white/60 dark:bg-black/20 text-xs font-bold">
              <span className={locale === "en" ? "px-2.5 py-1.5 bg-myhayat-pink text-white" : "px-2.5 py-1.5 text-gray-600 dark:text-gray-300"}>EN</span>
              <span className={locale === "ar" ? "px-2.5 py-1.5 bg-myhayat-pink text-white" : "px-2.5 py-1.5 text-gray-600 dark:text-gray-300"}>ع</span>
            </button>
            <Link href="/#waitlist"><MyHayatButton size="sm" className="text-sm border-2 border-black">{t("nav.joinNow")}</MyHayatButton></Link>
          </div>
        </div>

        {isOpen && (
          <div id="myhayat-mobile-navigation" className="pointer-events-auto absolute right-3 top-[4.25rem] w-[min(20rem,calc(100vw-1.5rem))] max-h-[calc(100dvh-5.2rem)] overflow-y-auto rounded-[2rem] border-[3px] border-myhayat-salmon bg-[#292c3a]/97 dark:bg-[#211723]/97 shadow-[6px_7px_0px_0px_var(--color-myhayat-pink)] p-4 backdrop-blur-xl lg:hidden">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} aria-current={pathname === link.href ? "page" : undefined}
                  className={pathname === link.href
                    ? "rounded-full bg-myhayat-pink text-white text-center font-bold text-sm px-2 py-3 border-2 border-myhayat-yellow"
                    : "rounded-full bg-white/10 border-2 border-white/15 text-white text-center font-bold text-sm px-2 py-3 hover:border-myhayat-yellow focus-visible:border-myhayat-yellow"}>
                  {link.name}
                </Link>
              ))}
              <button type="button" onClick={openContact} className="rounded-full bg-white/10 border-2 border-white/15 text-white font-bold text-sm px-2 py-3">{t("nav.contact")}</button>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/20 gap-4">
              <button type="button" onClick={toggleLocale} className="rounded-full px-4 py-2 bg-white/10 border border-myhayat-yellow text-white font-semibold text-sm">
                {locale === "en" ? "English / عربي" : "عربي / English"}
              </button>
              <Link href="/#waitlist" onClick={() => setIsOpen(false)} className="rounded-full bg-myhayat-salmon text-[#292c3a] border-2 border-myhayat-yellow px-4 py-2 font-bold text-sm text-center">
                {t("nav.joinNow")}
              </Link>
            </div>
          </div>
        )}
      </nav>
      <CloudSky />
    </>
  );
};
