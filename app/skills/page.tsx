"use client";

import React, { useEffect, useState } from "react";
import { Briefcase, Award, Layers } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ProjectsSection from "@/components/skills/ProjectsSection";
import StacksSection from "@/components/skills/StacksSection";
import SkillsTabs from "@/components/skills/SkillsTabs";
import CertsSection from "@/components/skills/Certssection";

type SkillTabId = "projects" | "certificates" | "stacks";

const TABS = [
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "stacks", label: "Stacks", icon: Layers },
];

export default function SkillsPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<SkillTabId>("projects");

  // Sync state with ?tab= in the URL (works with back/forward too)
  useEffect(() => {
    const t = searchParams.get("tab");
    if (t === "projects" || t === "certificates" || t === "stacks") {
      setActiveTab(t);
    }
  }, [searchParams]);

  // Adapter so SkillsTabs (expects string) can update our typed state safely
  const handleTabChange = (id: string) => {
    if (id === "projects" || id === "certificates" || id === "stacks") {
      setActiveTab(id);
    }
  };

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
    <section className="relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl py-4">
        <div className="mt-8">
          <SkillsTabs
            tabs={TABS}
            activeTab={activeTab}
            setActiveTab={handleTabChange}
          />
        </div>
        <div className="mt-12">{renderContent()}</div>
      </div>
    </section>
  );
}
