"use client";

import React from "react";
import { Briefcase, Award, Layers } from "lucide-react";
import ProjectsSection from "@/components/skills/ProjectsSection";
import CertsSection from "@/components/skills/Certssection";
import StacksSection from "@/components/skills/StacksSection";
import SkillsTabs from "@/components/skills/SkillsTabs";

type SkillTabId = "projects" | "certificates" | "stacks";

// Define the shape of our tabs
const TABS = [
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "stacks", label: "Stacks", icon: Layers },
];

interface SkillsPageProps {
  activeTab?: SkillTabId;
  setActiveTab?: (tab: string) => void;
}

export default function SkillsPage({
  activeTab = "projects",
  setActiveTab = () => {},
}: SkillsPageProps) {
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
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="mt-12">{renderContent()}</div>
      </div>
    </section>
  );
}
