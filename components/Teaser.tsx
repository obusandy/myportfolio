"use client";

import { Briefcase, Award, Layers } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { useRouter } from "next/navigation";

type SkillTabId = "projects" | "certificates" | "stacks";

type TeaserCard = {
  title: string;
  icon: React.ComponentType<LucideProps>;
  tab: SkillTabId;
  blurb: string;
};

export default function SkillsTeaser() {
  const router = useRouter();

  const cards: TeaserCard[] = [
    {
      title: "Projects",
      icon: Briefcase,
      tab: "projects",
      blurb: "Builds I've shipped",
    },
    {
      title: "Certificates",
      icon: Award,
      tab: "certificates",
      blurb: "What I've studied",
    },
    { title: "Stacks", icon: Layers, tab: "stacks", blurb: "What I use daily" },
  ];

  const handleCardClick = (tab: SkillTabId) => {
    router.push(`/skills?tab=${tab}`);
  };

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-14 md:py-16">
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ title, icon: Icon, tab, blurb }) => (
          <button
            key={tab}
            onClick={() => handleCardClick(tab)}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 w-full text-left"
          >
            <div
              className="absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(120% 120% at 0% 0%, rgba(56,189,248,0.10) 0%, rgba(167,139,250,0.08) 45%, transparent 100%)",
              }}
            />
            <div className="flex items-center gap-3">
              <Icon size={22} className="text-cyan-300" />
              <div>
                <div className="text-base font-semibold">{title}</div>
                <div className="text-sm text-white/70">{blurb}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
