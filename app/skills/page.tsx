// app/skills/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import HackerNavbar from "@/components/HackerNavbar";
import { Briefcase, Award, Layers } from "lucide-react";
import ProjectsSection from "@/components/skills/ProjectsSection";
import CertsSection from "@/components/skills/Certssection";
import StacksSection from "@/components/skills/StacksSection";
import SkillsTabs from "@/components/skills/SkillsTabs";

// Define the shape of our tabs
const TABS = [
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "stacks", label: "Stacks", icon: Layers },
];

export default function SkillsPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "projects";

  // Ensure the initialTab from URL is a valid tab id, otherwise default to 'projects'
  const [activeTab, setActiveTab] = useState(
    TABS.some((t) => t.id === initialTab) ? initialTab : "projects"
  );

  // This effect ensures the state updates if the user navigates back/forward
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab") || "projects";
    if (TABS.some((t) => t.id === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        return <ProjectsSection />;
      case "certificates":
        return <CertsSection />;
      case "stacks":
        return <StacksSection />;
      default:
        return <ProjectsSection />;
    }
  };

  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      {/* <TechBackgroundScene />  // You can add your background back later */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: `
        radial-gradient(70% 60% at 50% 45%, rgba(56,189,248,0.12) 0%, rgba(78, 67, 116, 0.1) 40%, transparent 70%),

        linear-gradient(to right, rgba(28, 9, 46, 0.18), rgba(56, 15, 36, 0.12), transparent 60%),

        linear-gradient(to left, rgba(24, 45, 48, 0.18), rgba(39, 78, 65, 0.12), transparent 60%),

        linear-gradient(180deg, rgba(0,0,0,0.24) 0%, rgba(0,0,0,0.12) 20%, rgba(0,0,0,0.12) 80%, rgba(0,0,0,0.24) 100%)
      `,
          backgroundBlendMode: "normal",
        }}
      />
      <HackerNavbar />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-5xl py-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              My Skills & Expertise
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              The tools and technologies I use to bring ideas to life.
            </p>
          </div>

          <div className="mt-16 sm:mt-20">
            <SkillsTabs
              tabs={TABS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <div className="mt-12">{renderContent()}</div>
        </section>
      </div>
    </main>
  );
}
