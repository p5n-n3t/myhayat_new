"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Instagram, Twitter, MessageCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { SITE_NAV_ITEMS } from "@/lib/site-navigation";
import { JapaneseCubesPattern } from "@/components/ui/JapaneseCubesPattern";
import { MyHayatButton } from "@/components/ui/MyHayatButton";

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
        <Jap¶»§q«^