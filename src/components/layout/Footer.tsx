"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Instagram, Twitter, MessageCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { SITE_NAV_ITEMS } from "@/lib/site-navigation";
import { JapaneseCubesPattern } from "@/components/ui/JapaneseCubesPattern";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { PrototypeNotice } from "@/components/ui/PrototypeNotice";

export const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const navItems = SITE_NAV_ITEMS.map((item) => ({ name: t(item.key), href: item.href }));

  const subscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Subscription failed");
      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="relative mt-8 md:mt-16 pb-6 px-3 md:px-8">
      <div className="relative max-w-7xl mx-auto bg-gradient-to-tr from-myhayat-pink via-myhayat-salmon to-myhayat-yellow border-4 border-white rounded-[2.5rem] md:rounded-[3rem] shadow-[var(--shadow-curved)] p-5 sm:p-7 md:p-12 overflow-hidden text-white">
        <JapaneseCubesPattern size={28} opacity={0.2} className="absolute inset-0 pointer-events-none -z-10" />
        <img src="/decor_sun2.svg" alt="" className="absolute -top-8 -right-8 w-32 opacity-10 pointer-events-none animate-spin-slow hidden md:block" />
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-12 gap-x-5 gap-y-7 md:gap-10">
          <div className="col-span-2 lg:col-span-5 flex flex-col gap-3 md:gap-6">
            <Link href="/" className="w-fit font-titan text-3xl md:text-5xl text-white drop-shadow-md">{t("footer.brand")}</Link>
            <p className="text-sm md:text-lg text-white/95 font-medium max-w-sm">{t("footer.tagline")}</p>
            <div className="flex items-center gap-3" aria-label="Social profiles coming soon">
              {[Instagram, Twitter, MessageCircle].map((Icon, index) => (
                <span key={index} aria-hidden="true" className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full border-2 border-white/70 text-white/85">
                  <Icon size={19} />
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <h3 className="font-titan text-xl md:text-2xl mb-3 md:mb-5 text-white">{t("footer.nav")}</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-3 gap-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm md:text-base text-white/95 hover:text-[#292c3a] underline-offset-4 hover:underline font-semibold">{item.name}</Link>
                </li>
              ))}
              <li><Link href="/#contact-modal" className="text-sm md:text-base text-white/95 hover:text-[#292c3a] underline-offset-4 hover:underline font-semibold">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-4">
            <h3 className="font-titan text-xl md:text-2xl mb-3 md:mb-5 text-white">{t("footer.stay")}</h3>
            <p className="text-sm md:text-base text-white/95 mb-4">{t("footer.stayDesc")}</p>
            <form onSubmit={subscribe} className="flex flex-col gap-3">
              <label className="sr-only" htmlFor="footer-email">{t("footer.emailPlaceholder")}</label>
              <input id="footer-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required
                placeholder={t("footer.emailPlaceholder")}
                className="w-full min-w-0 h-12 md:h-14 px-5 rounded-full border-[3px] border-myhayat-salmon bg-[#292c3a] text-white placeholder:text-white/65 focus:outline-none focus:border-myhayat-yellow focus:ring-2 focus:ring-myhayat-yellow/50"
              />
              <MyHayatButton type="submit" disabled={status === "sending"} className="w-full bg-myhayat-salmon text-[#292c3a] border-[3px] border-myhayat-yellow hover:bg-myhayat-pink">
                {status === "sending" ? "Sending…" : t("footer.subscribe")}
              </MyHayatButton>
              <p role="status" className="text-xs text-white/95 min-h-4">
                {status === "success" ? "Thanks — you're subscribed!" : status === "error" ? "Couldn't subscribe. Please try again." : ""}
              </p>
            </form>
          </div>
        </div>
        <div className="relative z-10 mt-7 md:mt-9"><PrototypeNotice variant="footer" /></div>
        <div className="relative z-10 mt-5 md:mt-8 pt-4 md:pt-8 border-t border-white/35 flex flex-wrap justify-between items-center gap-3 text-xs md:text-sm text-white/90 font-medium">
          <p>© {new Date().getFullYear()} {t("footer.copyright")}</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">{t("footer.privacy")}</Link>
            <Link href="/terms" className="hover:underline">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
