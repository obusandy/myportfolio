"use client";
import InteractiveSplitScreen from "@/components/Aboutme";
import HackerNavbar from "@/components/HackerNavbar";
import HeroSection from "@/components/HeroSection";
import SkillsTeaser from "@/components/Teaser";
import TechBackgroundScene from "@/components/TechBackgroundScene";
import React, { useState } from "react";
import SkillsPage from "./skills/page";
import ContactPage from "./contact/page";
import Footer from "@/components/Footer";

type SkillTabId = "projects" | "certificates" | "stacks";

export default function Home() {
  const [selectedSkillTab, setSelectedSkillTab] =
    useState<SkillTabId>("projects");

  const handleTeaserTabSelect = (tab: SkillTabId) => {
    setSelectedSkillTab(tab);
  };

  const handleSkillsTabChange = (tab: SkillTabId) => {
    setSelectedSkillTab(tab);
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <TechBackgroundScene />
      <HackerNavbar />

      <div className="relative z-10">
        <HeroSection />
        <InteractiveSplitScreen />
        <SkillsTeaser onTabSelect={handleTeaserTabSelect} />
        <SkillsPage
          activeTab={selectedSkillTab}
          onTabChange={handleSkillsTabChange}
        />
        <ContactPage />
      </div>
      <Footer />
    </main>
  );
}
