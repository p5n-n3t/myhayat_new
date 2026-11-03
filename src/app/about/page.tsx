"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatCard } from "@/components/ui/MyHayatCard";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { useTranslation } from "@/lib/i18n";
import { Shield, Heart, BookOpen, Clock, Brain, Users, Sparkles, ArrowRight, Database, Lock, Stethoscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JapaneseCubesPattern } from "@/components/ui/JapaneseCubesPattern";
import { SparklesText } from "@/components/ui/sparkles-text";

export default function AboutPage() {
  const { t } = useTranslation();

  const stats = [
    { value: t("about.crisis.stat1.value"), label: t("about.crisis.stat1.label"), color: "border-myhayat-pink" },
    { value: t("about.crisis.stat2.value"), label: t("about.crisis.stat2.label"), color: "border-myhayat-salmon" },
    { value: t("about.crisis.stat3.value"), label: t("about.crisis.stat3.label"), color: "border-myhayat-yellow" },
    { value: t("about.crisis.stat4.value"), label: t("about.crisis.stat4.label"), color: "border-myhayat-teal" },
  ];

  const advisoryBoard = [
    { name: "Dr. Wajdi Waswas", role: "Clinical Lead & Grief Counselor", affiliation: "CIA Medical Center, 15yr experience", img: "/lebanese_avatar_2_1781367921995.png", color: "border-myhayat-pink", shadow: "shadow-[var(--shadow-curved-pink)]" },
    { name: "Dr. Hala Ha¶»§q«^