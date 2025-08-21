// app/about/page.tsx
"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from "framer-motion";
import TechBackgroundScene from "@/components/TechBackgroundScene";

// Helpers
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const SNAP_ZONE = 0.04;
const snapToEdges = (p: number) =>
  p <= SNAP_ZONE ? 0 : p >= 1 - SNAP_ZONE ? 1 : p;
const nearestSnap = (p: number) => (p < 0.35 ? 0 : p > 0.65 ? 1 : 0.5);

// Palette/tint
const BASE_TINT = "hsl(220 65% 6% / 0.92)";

type PanelCopy = {
  supertitle: string;
  title: string;
  story: string;
};

const leftPanelContent: PanelCopy = {
  supertitle: "FULL STACK DEVELOPER",
  title: "Software Engineering",
  story:
    "I build web products end‑to‑end. After four years studying how businesses work, I doubled down on code—Meta's Front‑End program and ALX Software Engineering—and started shipping. I care about calm, reliable software: fast interfaces, clean architecture, and the kind of polish people can feel. Most days you'll find me turning fuzzy ideas into working products that earn trust.",
};

const rightPanelContent: PanelCopy = {
  supertitle: "ENTREPRENEUR",
  title: "Business Strategy",
  story:
    "Entrepreneurship is where I learned what momentum really looks like. I studied it for four years, then worked on the ground in Kibra—training founders, running VSLA sessions, and keeping records straight, even across 40,000+ OVC profiles. That's where it clicked: growth is a system. Today I think in markets, moats, and partnerships—and I build with that lens. Tech and business aren't two paths for me; they're one.",
};

export default function AboutMePage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden text-white">
      <TechBackgroundScene />

      {/* Unified cool-blue wash under both panels */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: BASE_TINT }}
      />

      <section className="relative z-10">
        <h1 className="sr-only">About Me</h1>

        {/* Desktop: Interactive Split Screen */}
        <div className="hidden lg:block">
          <InteractiveSplitScreen />
        </div>

        {/* Mobile/Tablet: Stacked Layout */}
        <div className="lg:hidden">
          <StackedLayout />
        </div>
      </section>
    </main>
  );
}

function StackedLayout() {
  return (
    <div className="min-h-[100svh] overflow-y-auto">
      {/* Left Panel Content (First on mobile) */}
      <div className="relative min-h-[50vh] flex items-center">
        <SideBackground variant="dev" side="left" blur={useMotionValue(0)} />
        <div className="relative z-10 w-full p-6 md:p-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {leftPanelContent.supertitle}
            </span>
            <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
              {leftPanelContent.title}
            </h2>
            <p className="text-base text-white/85 md:text-lg leading-relaxed">
              {leftPanelContent.story}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Subtle divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-8" />

      {/* Right Panel Content (Second on mobile) */}
      <div className="relative min-h-[50vh] flex items-center">
        <SideBackground variant="biz" side="right" blur={useMotionValue(0)} />
        <div className="relative z-10 w-full p-6 md:p-8">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {rightPanelContent.supertitle}
            </span>
            <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
              {rightPanelContent.title}
            </h2>
            <p className="text-base text-white/85 md:text-lg leading-relaxed">
              {rightPanelContent.story}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InteractiveSplitScreen() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for perf (no per-frame React renders)
  const progress = useMotionValue(0.5); // 0..1 (right dominance)
  const [isHovering, setIsHovering] = useState(false);

  // Mouse handlers (keep default cursor)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const raw = rect.width > 0 ? x / rect.width : 0.5;
    const p = snapToEdges(clamp01(raw));
    progress.set(p);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    const snapped = nearestSnap(progress.get());
    animate(progress, snapped, { type: "spring", stiffness: 380, damping: 32 });
  };

  // Panel widths
  const leftWidth = useTransform(progress, (p) => `${(1 - p) * 100}%`);
  const rightWidth = useTransform(progress, (p) => `${p * 100}%`);

  // Effects near edges/center
  const threshold = 0.2;
  const leftOpacity = useTransform(progress, (p) => {
    const apply = isHovering && (p < 0.5 - threshold || p > 0.5 + threshold);
    return apply ? 1 - 0.55 * p : 1;
  });
  const rightOpacity = useTransform(progress, (p) => {
    const apply = isHovering && (p < 0.5 - threshold || p > 0.5 + threshold);
    return apply ? 0.45 + 0.55 * p : 1;
  });
  const leftBlur = useTransform(progress, (p) => {
    const apply = isHovering && (p < 0.5 - threshold || p > 0.5 + threshold);
    return apply ? 4 * p : 0;
  });
  const rightBlur = useTransform(progress, (p) => {
    const apply = isHovering && (p < 0.5 - threshold || p > 0.5 + threshold);
    return apply ? 4 * (1 - p) : 0;
  });

  // Text motion — toward center + slight scale when expanded
  const parallaxStrength = 15;
  const leftX = useTransform(progress, (p) => {
    const rawOffset = isHovering ? (p - 0.5) * parallaxStrength : 0;
    const leftDom = 1 - p;
    const fillShift = 48;
    return -rawOffset + leftDom * fillShift;
  });
  const rightX = useTransform(progress, (p) => {
    const rawOffset = isHovering ? (p - 0.5) * parallaxStrength : 0;
    const rightDom = p;
    const fillShift = 48;
    return -rawOffset - rightDom * fillShift;
  });
  const leftScale = useTransform(progress, (p) => 1 + 0.04 * (1 - p));
  const rightScale = useTransform(progress, (p) => 1 + 0.04 * p);

  // Center indicator line (intentional movement cue)
  const centerLeft = useTransform(progress, (p) => `${p * 100}%`);
  const centerOpacity = isHovering ? 0.22 : 0.12;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto flex h-[100svh] w-full overflow-hidden bg-transparent"
      aria-label="Interactive split between Full‑Stack Engineering and Business Strategy"
      style={{
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      {/* Left Panel — Full‑Stack (Dev motif) */}
      <motion.div
        className="relative h-full shrink-0 overflow-hidden"
        style={{
          width: leftWidth,
          willChange: "width",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          contain: "layout paint",
        }}
        aria-label="Full‑Stack Engineering"
      >
        <SideBackground variant="dev" side="left" blur={leftBlur} />
        <PanelContent
          content={leftPanelContent}
          opacity={leftOpacity}
          x={leftX}
          scale={leftScale}
          side="left"
        />
      </motion.div>

      {/* Right Panel — Entrepreneurship (Biz motif) */}
      <motion.div
        className="relative h-full shrink-0 overflow-hidden"
        style={{
          width: rightWidth,
          willChange: "width",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          contain: "layout paint",
        }}
        aria-label="Business Strategy"
      >
        <SideBackground variant="biz" side="right" blur={rightBlur} />
        <PanelContent
          content={rightPanelContent}
          opacity={rightOpacity}
          x={rightX}
          scale={rightScale}
          side="right"
        />
      </motion.div>

      {/* Subtle center indicator (movement cue, not a seam) */}
      <motion.div
        className="pointer-events-none absolute inset-y-8 w-px"
        style={{
          left: centerLeft,
          opacity: centerOpacity,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.65) 40%, rgba(255,255,255,0.65) 60%, transparent 100%)",
          boxShadow:
            "0 0 12px rgba(56,189,248,0.18), 0 0 24px rgba(167,139,250,0.12)",
        }}
        aria-hidden
      />
    </div>
  );
}

/* Background per side — motifs only (underlay tint is unified above) */
function SideBackground({
  blur,
  variant,
  side,
}: {
  blur: MotionValue<number>;
  variant: "dev" | "biz";
  side: "left" | "right";
}) {
  const blurFilter: MotionValue<string> = useTransform(
    blur,
    (b) => `blur(${b}px)`
  );

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none [transform:translateZ(0)]"
      style={{ filter: blurFilter }}
      aria-hidden
    >
      {variant === "dev" ? <DevMotif side={side} /> : <BizMotif side={side} />}

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -300;
          }
        }
        @keyframes scrollX {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 120px 0;
          }
        }
        @keyframes pulseRing {
          0% {
            transform: scale(0.98);
            opacity: 0.25;
          }
          50% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(0.98);
            opacity: 0.25;
          }
        }
        @keyframes floatY {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
          100% {
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

/* Tech motif — anchored opposite the copy area */
function DevMotif({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left"; // text is on the left panel
  const oppositeChipTop = isLeft ? "top-12 right-8" : "top-12 left-8";
  const oppositeChipBottom = isLeft
    ? "bottom-16 right-10"
    : "bottom-16 left-10";

  return (
    <>
      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0 1px, transparent 1px 18px)",
          backgroundSize: "100% 20px",
          animation: "scrollX 12s linear infinite",
        }}
      />

      {/* Circuit paths */}
      <svg
        className="absolute inset-0 opacity-40"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="grad-tech" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.9)" />
            <stop offset="100%" stopColor="rgba(167,139,250,0.9)" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#grad-tech)" strokeLinecap="round">
          <path
            d="M 60 520 L 220 520 L 320 420 L 520 420 L 620 320"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            style={{ animation: "dash 10s linear infinite" }}
          />
          <path
            d="M 140 140 L 300 140 L 420 260 L 680 260 L 820 120"
            strokeWidth="1.5"
            strokeDasharray="8 12"
            style={{ animation: "dash 12s linear infinite" }}
          />
          <path
            d="M 80 300 L 240 300 L 340 200 L 560 200 L 760 400"
            strokeWidth="1.5"
            strokeDasharray="5 9"
            style={{ animation: "dash 11s linear infinite" }}
          />

          {/* Extra subtle layer for "more tech" */}
          <path
            d="M 120 460 L 260 460 L 380 340 L 540 340"
            strokeWidth="1"
            strokeDasharray="3 7"
            opacity="0.5"
            style={{ animation: "dash 14s linear infinite" }}
          />
          <path
            d="M 220 220 L 360 220 L 520 360 L 740 360"
            strokeWidth="1"
            strokeDasharray="4 9"
            opacity="0.45"
            style={{ animation: "dash 16s linear infinite" }}
          />
        </g>

        {/* Nodes */}
        <g>
          <circle cx="320" cy="420" r="2.5" fill="rgba(34,211,238,1)" />
          <circle cx="520" cy="420" r="2.5" fill="rgba(167,139,250,1)" />
          <circle cx="420" cy="260" r="2.5" fill="rgba(34,211,238,1)" />
          <circle cx="680" cy="260" r="2.5" fill="rgba(167,139,250,1)" />
          {/* Subtle extra nodes */}
          <circle cx="380" cy="340" r="2" fill="rgba(34,211,238,0.9)" />
          <circle cx="520" cy="340" r="2" fill="rgba(167,139,250,0.9)" />
        </g>
      </svg>

      {/* Micro code chips — anchored opposite the text side */}
      <div
        className={`absolute ${oppositeChipTop} rounded border border-cyan-400/25 bg-slate-900/40 px-3 py-2 text-[10px] font-mono text-cyan-200/80 backdrop-blur-sm opacity-60`}
      >
        {'const api = () => fetch("/health");'}
      </div>
      <div
        className={`absolute ${oppositeChipBottom} rounded border border-emerald-400/25 bg-slate-900/40 px-3 py-2 text-[10px] font-mono text-emerald-200/80 backdrop-blur-sm opacity-60`}
      >
        {"$ npm run dev"}
        <span className="ml-1 inline-block h-3 w-2 bg-emerald-400/70 align-middle" />
      </div>
    </>
  );
}

/* Business motif — dotted rings positioned opposite the copy (toward the center-left) */
function BizMotif({ side }: { side: "left" | "right" }) {
  const ringsClass =
    side === "right" ? "left-[12%] top-[28%]" : "right-[12%] top-[28%]";
  const kpiClass = side === "right" ? "left-8 top-12" : "right-8 top-12";
  const tickerClass =
    side === "right" ? "left-[10%] bottom-[14%]" : "right-[10%] bottom-[14%]";
  const floatNodesClass =
    side === "right" ? "left-10 bottom-16" : "right-10 bottom-16";

  return (
    <>
      {/* Radar rings (dotted circles) */}
      <div
        className={`absolute ${ringsClass} h-[240px] w-[240px] rounded-full opacity-30`}
      >
        <div className="absolute inset-0 rounded-full border border-cyan-400/25 animate-[pulseRing_6s_ease-in-out_infinite]" />
        <div className="absolute inset-6 rounded-full border border-emerald-400/20 animate-[pulseRing_8s_ease-in-out_infinite]" />
        <div className="absolute inset-12 rounded-full border border-violet-400/20 animate-[pulseRing_10s_ease-in-out_infinite]" />
      </div>

      {/* Blueprint arcs */}
      <svg
        className="absolute inset-0 opacity-35"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="grad-biz" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.9)" />
            <stop offset="100%" stopColor="rgba(167,139,250,0.9)" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#grad-biz)" strokeLinecap="round">
          <path
            d="M 200 380 A 220 180 0 0 0 640 380"
            strokeWidth="1.2"
            strokeDasharray="4 8"
          />
          <path
            d="M 240 420 A 260 220 0 0 0 700 420"
            strokeWidth="1.2"
            strokeDasharray="2 6"
          />
          <path
            d="M 320 300 L 480 240 L 660 300"
            strokeWidth="1"
            strokeDasharray="5 10"
          />
          {/* Extra subtle arcs */}
          <path
            d="M 280 340 A 220 160 0 0 0 720 340"
            strokeWidth="1"
            strokeDasharray="3 7"
            opacity="0.45"
          />
          <path
            d="M 360 280 L 520 220 L 700 280"
            strokeWidth="0.9"
            strokeDasharray="4 9"
            opacity="0.5"
          />
        </g>
      </svg>

      {/* Micro KPI chip — opposite side */}
      <div
        className={`absolute ${kpiClass} w-72 rounded border border-cyan-400/25 bg-slate-900/40 p-3 text-[10px] text-white/80 backdrop-blur-sm opacity-70`}
      >
        <div className="mb-2 text-cyan-200/80">KPIs</div>
        <div className="flex h-10 items-end gap-1">
          <div className="w-4 bg-emerald-400/45" style={{ height: 16 }} />
          <div className="w-4 bg-cyan-400/40" style={{ height: 24 }} />
          <div className="w-4 bg-violet-400/45" style={{ height: 32 }} />
          <div className="w-4 bg-emerald-400/40" style={{ height: 20 }} />
          <div className="w-4 bg-cyan-400/35" style={{ height: 28 }} />
        </div>
      </div>

      {/* Floating node trio — opposite side */}
      <div
        className={`absolute ${floatNodesClass} opacity-70 animate-[floatY_6s_ease-in-out_infinite]`}
      >
        <div className="relative h-10 w-24">
          <div className="absolute left-0 top-3 h-2 w-2 rounded-full bg-cyan-400/70" />
          <div className="absolute left-10 top-0 h-2 w-2 rounded-full bg-emerald-400/70" />
          <div className="absolute left-20 top-6 h-2 w-2 rounded-full bg-violet-400/70" />
          <div className="absolute left-1 top-3 h-px w-10 bg-cyan-400/40" />
          <div className="absolute left-11 top-2 h-px w-10 origin-left rotate-6 bg-emerald-400/40" />
        </div>
      </div>

      {/* Subtle ticker — opposite side */}
      <div
        className={`absolute ${tickerClass} h-[18px] w-[220px] overflow-hidden rounded-sm border border-cyan-400/10 bg-slate-900/30 text-[10px] text-cyan-200/70 backdrop-blur-sm opacity-60`}
      >
        <div
          className="whitespace-nowrap"
          style={{
            animation: "scrollX 18s linear infinite",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.06) 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            maskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          }}
        >
          &nbsp;MRR +4.8%&nbsp;&nbsp;|&nbsp;&nbsp;CAC
          ↓7%&nbsp;&nbsp;|&nbsp;&nbsp;LTV +12%&nbsp;&nbsp;|&nbsp;&nbsp;ARPU
          +3.4%
        </div>
      </div>
    </>
  );
}

/* Panel content — clean scale, human story (no bullets) */
function PanelContent({
  content,
  opacity,
  x,
  scale,
  side,
}: {
  content: PanelCopy;
  opacity: MotionValue<number>;
  x: MotionValue<number>;
  scale: MotionValue<number>;
  side: "left" | "right";
}) {
  const isRight = side === "right";
  const align = isRight ? "ml-auto text-right" : "";

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center p-8 md:p-16"
      style={{ opacity }}
      transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className={`${align} max-w-2xl`}
        style={{ x, scale }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
      >
        <motion.span
          className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {content.supertitle}
        </motion.span>

        <motion.h2
          className="mb-4 text-4xl font-bold leading-tight md:text-5xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {content.title}
        </motion.h2>

        <motion.p
          className="text-base text-white/85 md:text-lg leading-relaxed"
          initial={{ y: 36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.38 }}
        >
          {content.story}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
