'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Code, Globe, Palette, Zap, MessageCircle, FileText, LucideIcon } from "lucide-react";
import HackerNavbar from "@/components/HackerNavbar";
import Footer from "@/components/Footer";

const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(" ");

type Accent = "cyan" | "purple" | "orange" | "green";

interface Theme {
  ring: string;
  text: string;
  muted: string;
  glow: string;
  badge: string;
  dot: string;
}

interface ProblemCard {
  id: string;
  icon: LucideIcon;
  question: string;
  outcome: string;
  bullets: string[];
  techLine: string;
  cta: string;
  href: string;
  accent: Accent;
  bgImage: string;
}

export default function ServicesPage() {
  const [activeId, setActiveId] = useState<string>("sales");
  const mobileDetailsRef = useRef<HTMLDivElement | null>(null);

  const themes: Record<Accent, Theme> = {
    cyan: {
      ring: "ring-cyan-400/60",
      text: "text-cyan-400",
      muted: "text-cyan-300/80",
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]",
      badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      dot: "bg-cyan-400"
    },
    purple: {
      ring: "ring-purple-400/60",
      text: "text-purple-400",
      muted: "text-purple-300/80",
      glow: "shadow-[0_0_30px_rgba(168,85,247,0.3)]",
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      dot: "bg-purple-400"
    },
    orange: {
      ring: "ring-orange-400/60",
      text: "text-orange-400",
      muted: "text-orange-300/80",
      glow: "shadow-[0_0_30px_rgba(251,146,60,0.3)]",
      badge: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      dot: "bg-orange-400"
    },
    green: {
      ring: "ring-green-400/60",
      text: "text-green-400",
      muted: "text-green-300/80",
      glow: "shadow-[0_0_30px_rgba(34,197,94,0.3)]",
      badge: "bg-green-500/20 text-green-300 border-green-500/30",
      dot: "bg-green-400"
    }
  };

  const problems: ProblemCard[] = useMemo(() => [
    {
      id: "sales",
      icon: Globe,
      question: "Website visits but low sales?",
      outcome: "Turn visitors into leads and customers.",
      bullets: ["High-converting landing pages", "Clear messaging & CTAs", "Analytics & tracking setup"],
      techLine: "Conversion-focused web + tracking",
      cta: "Improve conversions",
      href: "/contact",
      accent: "cyan",
      bgImage: "/images/businessprob6.jpg",
    },
    {
      id: "presence",
      icon: Code,
      question: "Need a modern, trusted site?",
      outcome: "A clean site that explains your service in seconds.",
      bullets: ["Fast, mobile-first build", "Product & service clarity designs", "Social media lead capture"],
      techLine: "Next.js • TypeScript • SEO-ready",
      cta: "Build my website",
      href: "/contact",
      accent: "purple",
      bgImage: "/images/businessprob.jpg",
    },
    {
      id: "brand",
      icon: Palette,
      question: "Brand look outdated or messy?",
      outcome: "A professional brand people remember.",
      bullets: ["Logo & brand kit", "Social media templates", "Marketing collateral"],
      techLine: "Figma • Brand systems",
      cta: "Refresh my brand",
      href: "/contact",
      accent: "orange",
      bgImage: "/images/businessprob5.jpg",
    },
    {
      id: "time",
      icon: Zap,
      question: "Too much repetitive admin work?",
      outcome: "Automate tasks to focus on sales.",
      bullets: ["Automated CRM workflows", "Custom Dashboards", "API Integrations"],
      techLine: "APIs • Automations • Zapier",
      cta: "Automate workflow",
      href: "/contact",
      accent: "green",
      bgImage: "/images/businessprob2.jpg",
    },
  ], []);

  const activeIndex = problems.findIndex((p) => p.id === activeId);
  const active = problems[activeIndex] ?? problems[0];
  const activeTheme = themes[active.accent];

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 1024) return;
    mobileDetailsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeId]);

  const DetailsPanel = () => (
    <motion.div
      key={active.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl p-6 lg:p-8 shadow-2xl"
    >
      <div className="flex flex-col h-full justify-between min-h-[100px]">
        <div>
          <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border",
            activeTheme.badge
          )}>
            <span className={cn("w-1.5 h-1.5 rounded-full", activeTheme.dot)} />
            Solution
          </div>
          
          <h3 className="mt-6 text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight drop-shadow-2xl">
            {active.question}
          </h3>
          
          <p className="mt-3 text-base lg:text-lg text-gray-200 leading-relaxed drop-shadow-xl">
            {active.outcome}
          </p>
          
          <ul className="mt-8 space-y-4">
            {active.bullets.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex items-start gap-3 text-gray-100 drop-shadow-lg"
              >
                <div className={cn(
                  "h-1.5 w-1.5 rounded-full shrink-0 mt-2 flex-shrink-0",
                  activeTheme.dot
                )} />
                <span className="text-sm lg:text-base leading-relaxed">{b}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
            Stack: {active.techLine}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={active.href}
              className={cn(
                "group flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all",
                "bg-white text-black hover:bg-gray-100 active:scale-[0.98]",
                activeTheme.glow
              )}
            >
              <FileText className="w-4 h-4" />
              Get a Quote
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            
            <Link
              href="/contact"
              className={cn(
                "group flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-all",
                "border border-white/20 text-white hover:bg-white/5 hover:border-white/40 active:scale-[0.98]"
              )}
            >
              <MessageCircle className="w-4 h-4" />
              Let&apos;s Chat Business 
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <main className="min-h-screen w-full bg-black text-white relative overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* 🟢 THE NAVBAR IS PLACED HERE */}
      <HackerNavbar />
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.03),transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] animate-[grid-move_20s_linear_infinite]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-gray-400 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Digital Solutions for Growth
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4">
           You know your business.{" "}
  <span className="text-gray-600">I know tech.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl">
              The gap between traffic and sales isn&apos;t luck, it&apos;s fixable. 
          </p>
        </motion.header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left: Problem Cards */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
            {problems.map((p, i) => {
              const Icon = p.icon;
              const isActive = p.id === activeId;
              const theme = themes[p.accent];
              const rowEnd = i % 2 === 1 || i === problems.length - 1;

              return (
                <React.Fragment key={p.id}>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    onClick={() => setActiveId(p.id)}
                    className={cn(
                      "group relative aspect-square rounded-2xl lg:rounded-3xl transition-all duration-500",
                      "focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-black",
                      isActive ? "scale-100 lg:scale-[1.02]" : "scale-100 opacity-70 hover:opacity-90 hover:scale-[1.01]"
                    )}
                  >
                    {/* Image Container */}
                    <div className="absolute inset-0 rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10">
                      <Image
                        src={p.bgImage}
                        alt=""
                        fill
                        className={cn(
                          "object-cover transition-all duration-700",
                          isActive ? "scale-105" : "scale-100 grayscale-[30%]"
                        )}
                      />
                      
                      {/* PERFECTED Gradient Overlay - Subtle + Readable */}
                      <div 
                        className={cn(
                          "absolute inset-0 transition-all duration-700",
                          isActive
                            ? "bg-gradient-to-t from-black/85 via-black/60 to-transparent"  // Top-heavy dark fade
                            : "bg-gradient-to-t from-black/95 via-black/80 to-black/70"    // Uniform dark
                        )}
                      />
                      
                      {/* Active State: Subtle Vignette + Mid-layer boost */}
                      {isActive && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/30 to-transparent opacity-80" />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
                        </>
                      )}
                    </div>

                    {/* Active Ring Glow */}
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className={cn(
                          "absolute -inset-1 sm:-inset-1.5 lg:-inset-2 rounded-2xl lg:rounded-3xl ring-2 ring-offset-2 sm:ring-offset-3 lg:ring-offset-4 ring-offset-black transition-all duration-500",
                          theme.ring,
                          theme.glow
                        )}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {/* PERFECTED Content - Bold, Readable White */}
                    <div className="relative z-20 h-full p-4 sm:p-5 lg:p-6 flex flex-col items-center justify-center text-center">
                      <motion.div
                        animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "p-2.5 sm:p-3 rounded-xl backdrop-blur-md mb-3 border transition-all duration-300 shadow-2xl",
                          isActive 
                            ? cn("bg-white/20 border-white/40 backdrop-blur-xl", theme.glow)
                            : "bg-black/50 border-white/20"
                        )}
                      >
                        <Icon className={cn(
                          "w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 drop-shadow-lg",
                          isActive ? theme.text : "text-white/90"
                        )} />
                      </motion.div>
                      
                      <h4 className="text-xs sm:text-sm lg:text-base font-bold text-white px-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-tight tracking-wide">
                        {p.question}
                      </h4>
                      
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-[10px] sm:text-[11px] mt-2 text-white/95 font-medium max-w-[90%] drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] leading-snug tracking-tight"
                          >
                            {p.outcome}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>

                  {/* Mobile Panel Injection */}
                  {rowEnd && (
                    <div className={cn(
                      "col-span-2 lg:hidden",
                      (activeIndex === i || activeIndex === i - 1) ? "block" : "hidden"
                    )}>
                      <div ref={activeIndex === i || activeIndex === i - 1 ? mobileDetailsRef : null} className="py-3">
                        <DetailsPanel />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Right: Desktop Details Panel */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <DetailsPanel />
            </AnimatePresence>
          </div>
          
        </div>
        
      </div>

      {/* CSS Animation for Grid Movement */}
      <style jsx global>{`
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 64px 64px; }
        }
      `}</style>
      <Footer />
    </main>
    
  );
}
