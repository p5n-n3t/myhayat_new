"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { MyHayatCard } from "@/components/ui/MyHayatCard";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { Iphone } from "@/components/ui/iphone";
import { useTranslation } from "@/lib/i18n";
import { Mic, Brain, MessageCircle, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SparklesText } from "@/components/ui/sparkles-text";

export default function EchoesPage() {
  const { t } = useTranslation();

  const phases = [
    {
      num: "01",
      icon: <Mic className="w-7 h-7" />,
      title: "Voice Capture",
      desc: "Share audio clips or voice notes of your loved one. Our system builds a unique acoustic profile from these memories.",
      color: "bg-myhayat-pink",
    },
    {
      num: "02",
      icon: <Brain className="w-7 h-7" />,
      title: "Model Generation",
      desc: "AI creates a faithful voice profile â€” not an impersonation, but a symbolic bridge to cherished memories.",
      color: "bg-myhayat-lavender",
    },
    {
      num: "03",
      icon: <MessageCircle className="w-7 h-7" />,
      title: "Conversation",
      desc: "Have guided conversations that reflect your loved one's warmth. Every session is clinically supervised in design.",
      color: ¶»§q«^