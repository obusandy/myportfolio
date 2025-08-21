import Link from "next/link";
import { Briefcase, Award, Layers } from "lucide-react";

export default function SkillsTeaser() {
  const cards = [
    {
      title: "Projects",
      icon: Briefcase,
      tab: "projects" as const,
      blurb: "Builds I’ve shipped",
    },
    {
      title: "Certificates",
      icon: Award,
      tab: "certificates" as const,
      blurb: "What I’ve studied",
    },
    {
      title: "Stacks",
      icon: Layers,
      tab: "stacks" as const,
      blurb: "What I use daily",
    },
  ];
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-14 md:py-16">
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ title, icon: Icon, tab, blurb }) => (
          <Link
            key={tab}
            href={`/skills?tab=${tab}`}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:bg-white/10"
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
          </Link>
        ))}
      </div>
    </section>
  );
}
