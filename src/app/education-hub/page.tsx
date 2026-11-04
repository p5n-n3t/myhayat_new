"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MyHayatCard } from "@/components/ui/MyHayatCard";
import { BrandLinkButton } from "@/components/ui/BrandLinkButton";
import { BrandSparkleTitle } from "@/components/ui/BrandSparkleTitle";
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
  // ── Clinical Research (Inspired by real mental health AI research, rewritten for MyHayat) ──
  {
    id: "purpose-built-ai",
    title: "Why Purpose-Built AI Outperforms Generic Chatbots in Mental Health",
    excerpt: "Our research shows that AI trained on anonymized clinical therapy data produces substantially safer and more therapeutically effective responses than general-purpose models like ChatGPT or Claude.",
    category: "clinical-research",
    categoryLabel: "Clinical Research",
    readTime: "8 min",
    icon: <Brain className="w-6 h-6" />,
    accent: "from-myhayat-pink to-purple-500",
    borderColor: "border-myhayat-pink",
    shadowColor: "shadow-[6px_6px_0px_0px_var(--color-myhayat-pink)]",
    featured: true,
    author: "Dr. Wajdi Waswas, Clinical Lead",
    date: "June 2026",
  },
  {
    id: "real-world-outcomes",
    title: "Real-World Outcomes: Symptom Reduction in Lebanese Users",
    excerpt: "A proof-of-concept study using latent growth mixture modeling shows sustained improvements in depression and anxiety scores among My Hayat users over an 8-week period.",
    category: "clinical-research",
    categoryLabel: "Clinical Research",
    readTime: "12 min",
    icon: <Brain className="w-6 h-6" />,
    accent: "from-purple-500 to-myhayat-salmon",
    borderColor: "border-purple-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#a78bfa]",
    author: "Dr. Hala Hala3, Research Director",
    date: "May 2026",
  },
  {
    id: "dose-response",
    title: "More Engagement, More Improvement: A Dose-Response Analysis",
    excerpt: "Data from our first 10,000 users demonstrates a clear dose-response relationship — those who engage more frequently with My Hayat see proportionally greater symptom improvement.",
    category: "clinical-research",
    categoryLabel: "Clinical Research",
    readTime: "10 min",
    icon: <Brain className="w-6 h-6" />,
    accent: "from-myhayat-salmon to-myhayat-yellow",
    borderColor: "border-myhayat-salmon",
    shadowColor: "shadow-[var(--shadow-curved)]",
    author: "Dr. Nader Nafsani, Data Science Lead",
    date: "April 2026",
  },
  {
    id: "safety-benchmarks",
    title: "Safety First: How We Benchmark Our AI Against Harmful Responses",
    excerpt: "We audit 20,000 real conversations for harmful content. Our purpose-built model shows a 94% reduction in unsafe responses compared to general-purpose AI on suicide and self-harm test sets.",
    category: "clinical-research",
    categoryLabel: "Clinical Research",
    readTime: "7 min",
    icon: <Shield className="w-6 h-6" />,
    accent: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#34d399]",
    author: "Dr. Fadi Fobia, Safety Lead",
    date: "March 2026",
  },
  {
    id: "behavioral-activation",
    title: "Language Signals of Behavioral Activation Predict Real-World Outcomes",
    excerpt: "Natural language processing analysis reveals that specific conversational patterns — shifts in verb tense, increased agency language — predict positive behavioral changes outside the app.",
    category: "clinical-research",
    categoryLabel: "Clinical Research",
    readTime: "11 min",
    icon: <Brain className="w-6 h-6" />,
    accent: "from-blue-500 to-indigo-500",
    borderColor: "border-blue-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#60a5fa]",
    author: "Dr. Samar Awad, NLP Researcher",
    date: "June 2026",
  },
  // ── Wellness & Self-Care ──
  {
    id: "grounding-techniques",
    title: "5 Grounding Techniques That Work in Under 2 Minutes",
    excerpt: "When anxiety spikes, your body needs an anchor. These five evidence-based techniques — from the 5-4-3-2-1 method to cold water immersion — can calm your nervous system fast.",
    category: "wellness",
    categoryLabel: "Wellness",
    readTime: "4 min",
    icon: <Heart className="w-6 h-6" />,
    accent: "from-myhayat-pink to-myhayat-salmon",
    borderColor: "border-myhayat-pink",
    shadowColor: "shadow-[var(--shadow-curved-pink)]",
    author: "My Hayat Wellness Team",
    date: "June 2026",
  },
  {
    id: "sleep-anxiety-connection",
    title: "The Sleep-Anxiety Connection: Breaking the Cycle",
    excerpt: "Poor sleep fuels anxiety, and anxiety ruins sleep. Understanding this bidirectional relationship is the first step toward reclaiming your nights — and your peace of mind.",
    category: "wellness",
    categoryLabel: "Wellness",
    readTime: "6 min",
    icon: <Heart className="w-6 h-6" />,
    accent: "from-indigo-500 to-purple-400",
    borderColor: "border-indigo-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#818cf8]",
    author: "Dr. Fatima Khoury, Sleep Specialist",
    date: "May 2026",
  },
  {
    id: "journaling-mental-health",
    title: "Journaling for Mental Health: A Beginner's Guide",
    excerpt: "Writing down your thoughts isn't just therapeutic — it's clinically proven to reduce symptoms of depression and anxiety. Here's how to start a journaling practice that sticks.",
    category: "wellness",
    categoryLabel: "Wellness",
    readTime: "5 min",
    icon: <BookOpen className="w-6 h-6" />,
    accent: "from-myhayat-yellow to-amber-400",
    borderColor: "border-myhayat-yellow",
    shadowColor: "shadow-[6px_6px_0px_0px_var(--color-myhayat-yellow)]",
    author: "My Hayat Wellness Team",
    date: "May 2026",
  },
  {
    id: "breathwork",
    title: "Breathwork for Beginners: 4-7-8 and Box Breathing Explained",
    excerpt: "Your breath is the fastest lever you have for calming the nervous system. Learn two evidence-based techniques that therapists recommend for panic attacks and everyday stress.",
    category: "wellness",
    categoryLabel: "Wellness",
    readTime: "4 min",
    icon: <Heart className="w-6 h-6" />,
    accent: "from-teal-400 to-cyan-400",
    borderColor: "border-teal-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#2dd4bf]",
    author: "Dr. Maya Mania, Clinical Psychologist",
    date: "April 2026",
  },
  {
    id: "digital-detox",
    title: "Digital Detox: When Your Phone Becomes a Source of Anxiety",
    excerpt: "Doom-scrolling isn't just a habit — it's a clinically recognized anxiety amplifier. Here's how to build a healthier relationship with your devices without going completely offline.",
    category: "wellness",
    categoryLabel: "Wellness",
    readTime: "5 min",
    icon: <Heart className="w-6 h-6" />,
    accent: "from-rose-400 to-pink-500",
    borderColor: "border-rose-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#fb7185]",
    author: "My Hayat Wellness Team",
    date: "March 2026",
  },
  // ── Lebanese Context ──
  {
    id: "mental-health-lebanon-crisis",
    title: "Mental Health in Lebanon: A Crisis Within a Crisis",
    excerpt: "With less than 1 psychiatrist per 100,000 people outside Beirut, Lebanon's mental health infrastructure was already strained before 2020. The economic collapse and Beirut explosion compounded a generational trauma.",
    category: "lebanese-context",
    categoryLabel: "Lebanese Context",
    readTime: "9 min",
    icon: <Users className="w-6 h-6" />,
    accent: "from-red-500 to-myhayat-pink",
    borderColor: "border-red-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#f87171]",
    featured: true,
    author: "Dr. Tawfiq Tawattor, Public Health Researcher",
    date: "June 2026",
  },
  {
    id: "stigma-lebanese-culture",
    title: "\"Majnoun\": Breaking the Stigma of Mental Health in Lebanese Culture",
    excerpt: "In a culture where seeking help is often seen as weakness — \"shu bado el 3alam yi2ul\" — technology offers a private, judgment-free bridge to support that respects tradition while embracing progress.",
    category: "lebanese-context",
    categoryLabel: "Lebanese Context",
    readTime: "7 min",
    icon: <Users className="w-6 h-6" />,
    accent: "from-myhayat-salmon to-orange-400",
    borderColor: "border-myhayat-salmon",
    shadowColor: "shadow-[var(--shadow-curved)]",
    author: "Lama Fayad, Cultural Researcher",
    date: "May 2026",
  },
  {
    id: "diaspora-mental-health",
    title: "The Invisible Weight: Mental Health in the Lebanese Diaspora",
    excerpt: "Survivor's guilt, cultural identity crises, and the constant worry about family back home — Lebanese diaspora communities face unique mental health challenges that mainstream therapy often overlooks.",
    category: "lebanese-context",
    categoryLabel: "Lebanese Context",
    readTime: "8 min",
    icon: <Users className="w-6 h-6" />,
    accent: "from-sky-500 to-blue-500",
    borderColor: "border-sky-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#38bdf8]",
    author: "Dr. Samar Awad, Clinical Psychologist",
    date: "April 2026",
  },
  {
    id: "therapy-lebanese-arabic",
    title: "Why Therapy in Lebanese Arabic Hits Different",
    excerpt: "When you say \"2albe mwa33ani\" it carries emotional weight that \"my heart hurts\" simply doesn't translate. Dialect-native AI understands not just the words, but the cultural subtext behind them.",
    category: "lebanese-context",
    categoryLabel: "Lebanese Context",
    readTime: "6 min",
    icon: <Mic className="w-6 h-6" />,
    accent: "from-emerald-400 to-green-500",
    borderColor: "border-emerald-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#34d399]",
    author: "Dr. Fadi Fobia, Linguistics Advisor",
    date: "March 2026",
  },
  {
    id: "economic-collapse-mental-toll",
    title: "The Mental Toll of Economic Collapse: Lebanon's Silent Epidemic",
    excerpt: "A 2024 WHO survey found that 1 in 4 Lebanese adults show signs of clinical depression. The economic crisis didn't just empty bank accounts — it shattered trust, routines, and hope.",
    category: "lebanese-context",
    categoryLabel: "Lebanese Context",
    readTime: "10 min",
    icon: <Users className="w-6 h-6" />,
    accent: "from-amber-500 to-orange-500",
    borderColor: "border-amber-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#fbbf24]",
    author: "Dr. Nour Yammine, Socioeconomic Analyst",
    date: "February 2026",
  },
  // ── Practical Guides ──
  {
    id: "first-therapy-session",
    title: "What to Expect in Your First AI Therapy Session",
    excerpt: "Nervous about opening up to an AI? Here's a complete walkthrough of what your first conversation with My Hayat looks like — from the opening question to your personalized insights report.",
    category: "guides",
    categoryLabel: "Practical Guide",
    readTime: "5 min",
    icon: <BookOpen className="w-6 h-6" />,
    accent: "from-myhayat-pink to-myhayat-yellow",
    borderColor: "border-myhayat-pink",
    shadowColor: "shadow-[var(--shadow-curved-pink)]",
    author: "My Hayat Team",
    date: "June 2026",
  },
  {
    id: "panic-attack-guide",
    title: "Emergency Guide: What to Do During a Panic Attack",
    excerpt: "Your heart is racing, you can't breathe, and you feel like you're dying. You're not. Here's a step-by-step guide to riding out a panic attack — techniques that work in real time.",
    category: "guides",
    categoryLabel: "Practical Guide",
    readTime: "4 min",
    icon: <Shield className="w-6 h-6" />,
    accent: "from-red-500 to-rose-500",
    borderColor: "border-red-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#f87171]",
    author: "Dr. Maya Mania, Clinical Psychologist",
    date: "May 2026",
  },
  {
    id: "setting-boundaries",
    title: "Setting Boundaries: A Step-by-Step Guide for People Pleasers",
    excerpt: "In Lebanese culture, saying \"no\" can feel like betrayal. But boundaries aren't walls — they're bridges to healthier relationships. Here's how to set them without burning bridges.",
    category: "guides",
    categoryLabel: "Practical Guide",
    readTime: "7 min",
    icon: <BookOpen className="w-6 h-6" />,
    accent: "from-violet-500 to-purple-500",
    borderColor: "border-violet-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#8b5cf6]",
    author: "Dr. Hala Hala3, Psychotherapist",
    date: "April 2026",
  },
  {
    id: "grief-processing",
    title: "Processing Grief: When Loss Doesn't Follow a Timeline",
    excerpt: "The \"stages of grief\" model is outdated. Modern grief science shows that healing is nonlinear — and that's okay. Here's how My Hayat's Echoes feature helps you process loss at your own pace.",
    category: "guides",
    categoryLabel: "Practical Guide",
    readTime: "8 min",
    icon: <Heart className="w-6 h-6" />,
    accent: "from-slate-400 to-gray-500",
    borderColor: "border-slate-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#94a3b8]",
    author: "Dr. Wajdi Waswas, Grief Counselor",
    date: "March 2026",
  },
  {
    id: "supporting-loved-one",
    title: "How to Support a Loved One With Depression (Without Burning Out)",
    excerpt: "\"Just be there for them\" is well-meaning but vague. Here are concrete, actionable ways to support someone with depression while protecting your own mental health.",
    category: "guides",
    categoryLabel: "Practical Guide",
    readTime: "6 min",
    icon: <Users className="w-6 h-6" />,
    accent: "from-pink-400 to-rose-400",
    borderColor: "border-pink-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#f472b6]",
    author: "My Hayat Wellness Team",
    date: "February 2026",
  },
  // ── Community Stories ──
  {
    id: "aya-story",
    title: "Aya's Story: Finding My Voice After the Explosion",
    excerpt: "At 22, Aya survived the Beirut explosion and lost her hearing in one ear. Two years later, she found a way to talk about it for the first time — through an AI that spoke her language.",
    category: "community",
    categoryLabel: "Community Story",
    readTime: "6 min",
    icon: <Heart className="w-6 h-6" />,
    accent: "from-myhayat-pink to-rose-400",
    borderColor: "border-myhayat-pink",
    shadowColor: "shadow-[var(--shadow-curved-pink)]",
    author: "Aya M., South Lebanon",
    date: "June 2026",
  },
  {
    id: "rami-story",
    title: "Rami's Story: When Your Career Ends and Your Mind Breaks",
    excerpt: "A former software engineer in Beirut, Rami lost his job, his savings, and his sense of purpose in 6 months. Here's how he started rebuilding — one conversation at a time.",
    category: "community",
    categoryLabel: "Community Story",
    readTime: "7 min",
    icon: <Heart className="w-6 h-6" />,
    accent: "from-blue-400 to-cyan-400",
    borderColor: "border-blue-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#60a5fa]",
    author: "Rami K., Beirut",
    date: "May 2026",
  },
  {
    id: "um-ali-story",
    title: "Um Ali's Story: An Older Woman Learns to Ask for Help",
    excerpt: "At 58, Um Ali never imagined she'd talk to a phone about her feelings. But when her children emigrated and loneliness set in, she found something unexpected: a listener who never judged.",
    category: "community",
    categoryLabel: "Community Story",
    readTime: "5 min",
    icon: <Heart className="w-6 h-6" />,
    accent: "from-amber-400 to-yellow-400",
    borderColor: "border-amber-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#fbbf24]",
    author: "Um Ali, Tripoli",
    date: "April 2026",
  },
  {
    id: "samar-story",
    title: "Samar's Story: Diaspora Guilt and the Weight of Two Worlds",
    excerpt: "Living in Montreal, Samar felt guilty for leaving Lebanon and guilty for not being happy abroad. She needed someone who understood both worlds — and didn't ask her to choose.",
    category: "community",
    categoryLabel: "Community Story",
    readTime: "6 min",
    icon: <Heart className="w-6 h-6" />,
    accent: "from-teal-400 to-emerald-400",
    borderColor: "border-teal-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#2dd4bf]",
    author: "Samar T., Montreal (originally Saida)",
    date: "March 2026",
  },
  {
    id: "michel-story",
    title: "Michel's Story: A Father Who Finally Learned to Feel",
    excerpt: "Growing up in Jounieh, Michel was taught that men don't cry. At 42, after his divorce, he realized that bottling everything up wasn't strength — it was slow self-destruction.",
    category: "community",
    categoryLabel: "Community Story",
    readTime: "7 min",
    icon: <Heart className="w-6 h-6" />,
    accent: "from-indigo-400 to-violet-400",
    borderColor: "border-indigo-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#818cf8]",
    author: "Michel B., Jounieh",
    date: "February 2026",
  },
  // ── Science & Technology ──
  {
    id: "how-we-train",
    title: "How We Train Our AI: From Clinical Sessions to Compassionate Responses",
    excerpt: "Our model is trained on a large-scale dataset of anonymized therapy sessions from Lebanese clinics — not internet scraped data. Here's a look inside our clinical data pipeline and why it matters.",
    category: "science",
    categoryLabel: "Science & Tech",
    readTime: "10 min",
    icon: <Sparkles className="w-6 h-6" />,
    accent: "from-myhayat-yellow to-amber-400",
    borderColor: "border-myhayat-yellow",
    shadowColor: "shadow-[6px_6px_0px_0px_var(--color-myhayat-yellow)]",
    featured: true,
    author: "Dr. Nader Nafsani, AI Research Lead",
    date: "June 2026",
  },
  {
    id: "minimized-exposure",
    title: "Minimized Exposure: Why Our AI Doesn't Just Tell You What You Want to Hear",
    excerpt: "Unlike generic chatbots that optimize for engagement, My Hayat uses a minimized exposure approach — gathering information rather than giving advice, and redirecting to professionals when needed.",
    category: "science",
    categoryLabel: "Science & Tech",
    readTime: "8 min",
    icon: <Shield className="w-6 h-6" />,
    accent: "from-emerald-500 to-teal-400",
    borderColor: "border-emerald-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#34d399]",
    author: "Dr. Fadi Fobia, Safety Architect",
    date: "May 2026",
  },
  {
    id: "pattern-recognition",
    title: "How My Hayat Discovers Your Emotional Patterns",
    excerpt: "Each conversation teaches the AI more about you. Using longitudinal NLP analysis, My Hayat connects today's stress to a recurring pattern from weeks ago — offering insights you can't see yourself.",
    category: "science",
    categoryLabel: "Science & Tech",
    readTime: "7 min",
    icon: <Brain className="w-6 h-6" />,
    accent: "from-violet-500 to-purple-400",
    borderColor: "border-violet-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#8b5cf6]",
    author: "Dr. Samar Awad, NLP Researcher",
    date: "April 2026",
  },
  {
    id: "trust-factor",
    title: "The Trust Factor: Why Scientific Validation Matters for AI Mental Health",
    excerpt: "Anyone can build a chatbot. Proving it actually helps — without causing harm — requires clinical rigor, safety audits, and transparent outcome data. Here's our validation framework.",
    category: "science",
    categoryLabel: "Science & Tech",
    readTime: "9 min",
    icon: <Shield className="w-6 h-6" />,
    accent: "from-myhayat-salmon to-red-400",
    borderColor: "border-myhayat-salmon",
    shadowColor: "shadow-[var(--shadow-curved)]",
    author: "Dr. Hala Hala3, Research Director",
    date: "March 2026",
  },
  {
    id: "perinatal-depression",
    title: "AI Support for Perinatal Depression: Early Results from Lebanese Mothers",
    excerpt: "Postpartum depression affects 1 in 5 Lebanese mothers, yet most never seek help. Our pilot study shows that AI-based support during and after pregnancy can significantly reduce PHQ-9 scores.",
    category: "science",
    categoryLabel: "Science & Tech",
    readTime: "11 min",
    icon: <Heart className="w-6 h-6" />,
    accent: "from-pink-400 to-rose-300",
    borderColor: "border-pink-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#f472b6]",
    author: "Dr. Fatima Khoury, Perinatal Specialist",
    date: "February 2026",
  },
  // ── CBT Worksheets & Resources ──
  {
    id: "what-is-rebt",
    title: "What Is Rational Emotive Behavior Therapy (REBT)?",
    excerpt: "Understand the core principles of REBT, a form of cognitive behavioral therapy that helps identify and change irrational beliefs.",
    category: "cbt-worksheets",
    categoryLabel: "CBT Resource",
    readTime: "5 min",
    icon: <BookOpen className="w-6 h-6" />,
    accent: "from-blue-500 to-indigo-500",
    borderColor: "border-blue-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#60a5fa]",
    author: "Clinical Team (via Psychology Tools)",
    date: "June 2026",
  },
  {
    id: "tact-using-pauses-assertively",
    title: "TACT – Using Pauses Assertively",
    excerpt: "Learn how intentional pausing can de-escalate tension and help you respond assertively rather than reactively.",
    category: "cbt-worksheets",
    categoryLabel: "CBT Resource",
    readTime: "4 min",
    icon: <BookOpen className="w-6 h-6" />,
    accent: "from-teal-400 to-cyan-400",
    borderColor: "border-teal-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#2dd4bf]",
    author: "Clinical Team (via Psychology Tools)",
    date: "June 2026",
  },
  {
    id: "what-is-dbt",
    title: "What Is Dialectical Behavior Therapy (DBT)?",
    excerpt: "An introduction to DBT, focusing on emotional regulation, mindfulness, distress tolerance, and interpersonal effectiveness.",
    category: "cbt-worksheets",
    categoryLabel: "CBT Resource",
    readTime: "7 min",
    icon: <BookOpen className="w-6 h-6" />,
    accent: "from-myhayat-pink to-myhayat-lavender",
    borderColor: "border-myhayat-pink",
    shadowColor: "shadow-[var(--shadow-curved-pink)]",
    author: "Clinical Team (via Psychology Tools)",
    date: "June 2026",
  },
  {
    id: "stop-ending-conversations-assertively",
    title: "STOP – Ending Conversations Assertively",
    excerpt: "A practical worksheet guiding you on how to set boundaries and end difficult conversations with respect and clarity.",
    category: "cbt-worksheets",
    categoryLabel: "CBT Resource",
    readTime: "3 min",
    icon: <BookOpen className="w-6 h-6" />,
    accent: "from-amber-400 to-orange-400",
    borderColor: "border-amber-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#fbbf24]",
    author: "Clinical Team (via Psychology Tools)",
    date: "June 2026",
  },
  {
    id: "lace-using-empathy-assertively",
    title: "LACE – Using Empathy Assertively",
    excerpt: "Balance assertiveness with empathy using the LACE technique, improving interpersonal communication.",
    category: "cbt-worksheets",
    categoryLabel: "CBT Resource",
    readTime: "5 min",
    icon: <BookOpen className="w-6 h-6" />,
    accent: "from-emerald-400 to-green-500",
    borderColor: "border-emerald-400",
    shadowColor: "shadow-[6px_6px_0px_0px_#34d399]",
    author: "Clinical Team (via Psychology Tools)",
    date: "June 2026",
  },
];

const CATEGORIES: { value: ContentCategory; label: string; icon: React.ReactNode }[] = [
  { value: "all", label: "All Topics", icon: <Filter className="w-4 h-4" /> },
  { value: "clinical-research", label: "Clinical Research", icon: <Brain className="w-4 h-4" /> },
  { value: "wellness", label: "Wellness", icon: <Heart className="w-4 h-4" /> },
  { value: "lebanese-context", label: "Lebanese Context", icon: <Users className="w-4 h-4" /> },
  { value: "guides", label: "Practical Guides", icon: <BookOpen className="w-4 h-4" /> },
  { value: "community", label: "Community Stories", icon: <Mic className="w-4 h-4" /> },
  { value: "science", label: "Science & Tech", icon: <Sparkles className="w-4 h-4" /> },
  { value: "cbt-worksheets", label: "CBT Worksheets", icon: <BookOpen className="w-4 h-4" /> },
];

function ResourceCard({ item, featured = false }: { item: ContentItem; featured?: boolean }) {
  return (
    <MyHayatCard noPattern edgeGlow={false} className={"h-full bg-[#292c3a] dark:bg-[#211723] border-[3px] overflow-hidden flex flex-col " + item.borderColor + " " + item.shadowColor}>
      {/* Static Japanese isometric cube pattern, restricted to the card background. */}
      <JapaneseCubesPattern variant="cubes-3d" colorScheme="warm" size={28} opacity={0.13} className="absolute inset-0 z-0 pointer-events-none" />
      <div className="relative z-10 flex h-full flex-col p-5 md:p-6 gap-3.5">
        <div className="flex items-center gap-2 text-myhayat-yellow text-xs font-bold uppercase tracking-wider">
          {item.icon}
          {item.categoryLabel}
        </div>
        <h3 className={"font-titan leading-tight text-white " + (featured ? "text-xl" : "text-lg")}>{item.title}</h3>
        <p className="text-gray-200 text-sm leading-relaxed line-clamp-3 flex-1">{item.excerpt}</p>
        <div className="mt-auto pt-3 border-t border-white/20 flex flex-wrap justify-between items-center gap-2">
          <div className="text-xs text-white/75">
            {featured ? <span><Clock className="inline w-3 h-3" /> {item.readTime}</span> :
              <span>{item.author} · {item.date}</span>}
          </div>
          {/* The Read pill alone is interactive: no links wrapped around card or article content. */}
          <Link href={"/education-hub/" + item.id}
            aria-label={"Read " + item.title}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border-2 border-myhayat-yellow bg-myhayat-salmon text-[#292c3a] px-4 py-1.5 text-sm font-extrabold shadow-[2px_2px_0px_0px_#FEC810] hover:bg-myhayat-yellow focus-visible:outline-2 focus-visible:outline-white">
            Read <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </MyHayatCard>
  );
}

export default function EducationHub() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ContentCategory>("all");

  const filteredItems = useMemo(() => {
    return CONTENT_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const featuredItems = CONTENT_ITEMS.filter((item) => item.featured);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-myhayat-offwhite dark:bg-[#1a0a14] relative text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />

      <main className="flex-grow w-full">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 gradient-warm opacity-60" />
          
          {/* Decorative SVGs */}
          <img src="/decor_mushroom_1.svg" alt="" className="absolute top-20 right-10 w-32 h-32 opacity-10 animate-float hidden lg:block" />
          <img src="/decor_rainbow.svg" alt="" className="absolute bottom-0 left-0 w-64 h-64 opacity-8 hidden lg:block" />
          <img src="/decor_twinkle_pink.svg" alt="" className="absolute top-40 left-20 w-8 h-8 opacity-30 animate-pulse hidden md:block" />
          <img src="/decor_twinkle_yellow.svg" alt="" className="absolute top-60 right-40 w-6 h-6 opacity-30 animate-pulse hidden md:block" style={{ animationDelay: "1s" }} />
          
          <div className="relative z-10 max-w-7xl mx-auto text-center space-y-8">
            {/* Watermelon decoration */}
            <div className="inline-flex items-center gap-3 mb-4">
              <Image src="/Watermelon.png" alt="Watermelon" width={48} height={48} className="animate-bounce-slow" />
              <span className="px-4 py-1.5 bg-myhayat-yellow text-gray-900 font-bold rounded-full text-sm uppercase tracking-wider border-2 border-white shadow-sm">
                Education Hub
              </span>
              <Image src="/Watermelon.png" alt="Watermelon" width={48} height={48} className="animate-bounce-slow scale-x-[-1]" style={{ animationDelay: "0.5s" }} />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-titan leading-[0.9]">
              <BrandSparkleTitle count={11}>Learn. Heal. Grow.</BrandSparkleTitle>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Clinical research, practical guides, and real stories from the Lebanese community — all in one place.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, guides, research..."
                  className="w-full h-16 pl-14 pr-6 rounded-full border-4 border-myhayat-salmon dark:border-myhayat-pink/50 bg-white dark:bg-[#251320] text-lg focus:outline-none focus:ring-4 focus:ring-myhayat-pink/20 shadow-[var(--shadow-curved)] transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Uniform, responsive category buttons */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto -mt-6 relative z-20 mb-12" aria-label="Filter educational resources">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 justify-items-stretch">
            {CATEGORIES.map((cat) => (
              <button key={cat.value} type="button" onClick={() => setActiveCategory(cat.value)}
                aria-pressed={activeCategory === cat.value}
                className={"w-full min-w-0 h-12 flex items-center justify-center gap-1.5 rounded-full font-bold text-[0.75rem] sm:text-sm border-2 transition-colors " +
                  (activeCategory === cat.value
                    ? "bg-myhayat-pink text-white border-myhayat-salmon shadow-[3px_3px_0px_0px_var(--color-myhayat-salmon)]"
                    : "bg-white dark:bg-[#251320] text-gray-700 dark:text-gray-200 border-myhayat-salmon/50 hover:border-myhayat-pink")}>
                <span className="shrink-0">{cat.icon}</span>
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {activeCategory === "all" && !searchQuery && (
          <section className="px-4 md:px-8 max-w-7xl mx-auto mb-16">
            <h2 className="text-3xl font-titan mb-8 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-myhayat-yellow" />
              Featured Research
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">Illustrative bylines and characters are fictional; they do not represent actual clinicians or research endorsements.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredItems.map((item) => (
                <ResourceCard key={item.id} item={item} featured />
              ))}
            </div>
          </section>
        )}

        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-14 md:mb-20">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-7">
            <h2 className="text-3xl font-titan flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-myhayat-salmon" />
              {activeCategory === "all" ? "All Resources" : CATEGORIES.find((cat) => cat.value === activeCategory)?.label}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-300 font-mono">
              {filteredItems.length} {filteredItems.length === 1 ? "article" : "articles"}
            </span>
          </div>
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <Image src="/Watermelon.png" alt="No results" width={80} height={80} className="mx-auto mb-4 opacity-40" />
              <p className="text-xl text-gray-500 font-titan">No articles found</p>
              <p className="text-gray-500 mt-2">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <ResourceCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>

        {/* CTA BANNER */}
        <section className="mx-4 md:mx-8 mb-24">
          <div className="max-w-7xl mx-auto relative rounded-[3rem] bg-gradient-to-r from-myhayat-pink via-myhayat-salmon to-myhayat-yellow p-12 md:p-16 overflow-hidden border-4 border-white/20">
            <JapaneseCubesPattern size={28} opacity={0.1} className={"absolute inset-0 pointer-events-none -z-10" + " mix-blend-overlay"} />
            <img src="/decor_cloud_1.svg" alt="" className="absolute -bottom-20 -right-20 w-96 opacity-10" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-start space-y-4">
                <h2 className="text-3xl md:text-5xl font-titan text-white leading-tight">
                  <BrandSparkleTitle count={9} color="yellow">Ready to start your journey?</BrandSparkleTitle>
                </h2>
                <p className="text-lg text-white/80 max-w-xl">
                  My Hayat combines clinical expertise with AI to offer support that understands your culture, your language, and your story.
                </p>
              </div>
              <div className="shrink-0 flex flex-col sm:flex-row gap-4 items-center">
                <BrandLinkButton href="/chat" variant="outline" className="w-full sm:w-auto text-lg px-8">
                  Try a Free Demo
                </BrandLinkButton>
                <img src="/Illustrations/mom and her daughter are painting a picture.svg" alt="Mom and daughter painting" className="w-48 h-auto hidden md:block" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
