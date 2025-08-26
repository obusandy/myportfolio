"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SkillsContent from "./SkillsContent";

type SkillTabId = "projects" | "certificates" | "stacks";

export default function SkillsPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<SkillTabId>("projects");

  // Sync state with ?tab= in the URL (works with back/forward too)
  useEffect(() => {
    const t = searchParams.get("tab");
    if (t === "projects" || t === "certificates" || t === "stacks") {
      setActiveTab(t);
    }
  }, [searchParams]);

  // Handle tab change
  const handleTabChange = (tab: SkillTabId) => {
    setActiveTab(tab);
  };

  return <SkillsContent activeTab={activeTab} onTabChange={handleTabChange} />;
}
