"use client";

import React, { useEffect, useState } from "react";
import { Briefcase, Award, Layers } from "lucide-react";
import ProjectsSection from "@/components/skills/ProjectsSection";
import CertsSection from "@/components/skills/Certssection";
import StacksSection from "@/components/skills/StacksSection";
import SkillsTabs from "@/components/skills/SkillsTabs";

type SkillTabId = "projects" | "certificates" | "stacks";

const TABS = [
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "stacks", label: "Stacks", icon: Layers },
];

interface SkillsPageProps {
  activeTab?: SkillTabId;
  onTabChange?: (tab: SkillTabId) => void;
}

export default function SkillsPage({
  activeTab: externalActiveTab,
  onTabChange,
}: SkillsPageProps) {
  const [internalActiveTab, setInternalActiveTab] =
    useState<SkillTabId>("projects");

  // Use external tab if provided, otherwise use internal state
  const activeTab = externalActiveTab || internalActiveTab;

  // Update internal state when external tab changes
  useEffect(() => {
    if (externalActiveTab) {
      setInternalActiveTab(externalActiveTab);
    }
  }, [externalActiveTab]);

  // Handle tab change from SkillsTabs component
  const handleTabChange = (id: string) => {
    if (id === "projects" || id === "certificates" || id === "stacks") {
      setInternalActiveTab(id);
      onTabChange?.(id);
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
    <section id="skills-section" className="relative z-10 px-4 sm:px-6 lg:px-8">
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
