"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { MyHayatCard } from "@/components/ui/MyHayatCard";

import { useTranslation } from "@/lib/i18n";
import { Marquee } from "@/components/ui/marquee";
import { Iphone } from "@/components/ui/iphone";
import { SparklesText } from "@/components/ui/sparkles-text";
import { HyperText } from "@/components/ui/hyper-text";
import { WordTwinkle } from "@/components/ui/WordTwinkle";
import { JapaneseCubesPattern } from "@/components/ui/JapaneseCubesPattern";

export default function Home() {
  const { t } = useTranslation();
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: waitlistEmail }),
      });
      setWaitlistSubmitted(true);
      setWaitlistEmail("");
    } catch { /* noop for MVP */ }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-myhayat-offwhite dark:bg-[#1a0a14] relative text-gray-900 dark:text-g¶»§q«^