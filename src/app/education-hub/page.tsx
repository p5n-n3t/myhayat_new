"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatCard } from "@/components/ui/MyHayatCard";
import { MyHayatButton } from "@/components/ui/MyHayatButton";
import { useTranslation } from "@/lib/i18n";
import { Search, BookOpen, Brain, Heart, Shield, Users, Mic, Sparkles, ArrowRight, Filter, Clock, Tag } from "lucide-react";
import { JapaneseCubesPattern } from "@/components/ui/JapaneseCubesPattern";

type ContentCategory = "all" | "clinical-research" | "wellness" | "lebanese-context" | "guides" | "community" | "science" | "cbt-worksheets";

interface ContentItem {
  id: string;
  title: string;
  excerpt: string;
  category: ContentCategory;
  categoryLabel: string;
  readTime: string;
  icon: React.ReactNode;
  accent: string;
  borderColor: string;
  shadowColor: string;
  featured?: boolean;
  author: string;
  date: string;
}

const CONTENT_ITEMS: ContentItem[] = [
  // â”€â”€ Clinical Research (Inspired by real mental health AI research, rewritten for MyHayat) â”€â”€
  {
    id: "purpose-built-ai",
    title: "Why Purpose-Built AI Outperforms Generic Chatbots in Mental Health",
    excerpt: "Our research shows that AI trained on anonymized clinical therapy data produces substantially safer and more therapeutically effective responses than general-purpose models like ChatGPT o¶»§q«^