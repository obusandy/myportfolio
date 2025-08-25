"use client";
import InteractiveSplitScreen from "@/components/Aboutme";
import HackerNavbar from "@/components/HackerNavbar";
import HeroSection from "@/components/HeroSection";
import SkillsTeaser from "@/components/Teaser";
import TechBackgroundScene from "@/components/TechBackgroundScene";
import React from "react";
import SkillsPage from "./skills/page";
import ContactPage from "./contact/page";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <TechBackgroundScene />
      <HackerNavbar />

      <div className="relative z-10">
        <HeroSection />
        <InteractiveSplitScreen />
        <SkillsTeaser />
        <SkillsPage />
        <ContactPage />
      </div>
      <Footer />
    </main>
  );
}
