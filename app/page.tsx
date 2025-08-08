import HackerNavbar from "@/components/HackerNavbar";
import HeroSection from "@/components/HeroSection";
import TechBackgroundScene from "@/components/TechBackgroundScene";
import React from "react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Scene is fixed and does not affect the layout of the content */}
      <TechBackgroundScene />
      <HackerNavbar />

      {/* Your page content goes here, with a higher z-index to appear on top */}
      <div className="relative z-10">
        {/* <section className="flex h-screen w-full flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold tracking-wider md:text-7xl">
            SANDRA OBUNGA
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            A Journey Through Code & Creativity
          </p>
        </section> */}

        <HeroSection />

        <section className="flex h-screen items-center justify-center">
          <h2 className="text-4xl font-bold">My Skills</h2>
        </section>
        <section className="flex h-screen items-center justify-center">
          <h2 className="text-4xl font-bold">Contact me</h2>
        </section>
      </div>
    </main>
  );
}
