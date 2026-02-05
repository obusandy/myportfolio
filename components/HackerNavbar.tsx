"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HackerNavItem from "./HackerNavItem";

const navItems = [
  { text: "Home", href: "/" },
  { text: "About", href: "/#AboutMe" },
  { text: "Projects", href: "/#skills-section" },
  { text: "Services", href: "/services" },
  { text: "Contact", href: "/contact" },
];

export default function HackerNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for background transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 🖥️ Desktop Navbar */}
      <nav
        className={`fixed hidden md:flex z-50 justify-center py-6 px-8 font-mono tracking-wide text-lg text-cyan-300 transition-all duration-300 ease-out
    ${
      scrolled
        ? "top-0 inset-x-8 backdrop-blur-md rounded-2xl shadow-2xl shadow-cyan-500/5"
        : "top-10 inset-x-8 bg-transparent"
    }`}
      >
        <div className="flex gap-10">
          {navItems.map((item, index) => (
            <Link key={item.text} href={item.href}>
              <HackerNavItem text={item.text} delay={index * 300} />
            </Link>
          ))}
        </div>
      </nav>

      {/* 📱 Mobile Menu Toggle */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`text-cyan-300 text-3xl font-bold transition-all duration-300 ${
            scrolled
              ? "bg-slate-900/75 backdrop-blur-md border border-white/10 rounded-lg p-2"
              : "bg-transparent"
          }`}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* 📱 SLIDE-IN PANEL + CENTERED NAV (Mobile only) */}
      <div
        className={`md:hidden fixed top-0 right-0 w-full sm:w-1/2 z-40 bg-slate-900/95 backdrop-blur-xl border-l border-white/10 transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="py-16 flex flex-col items-center space-y-6 text-cyan-300 text-2xl font-mono">
          {navItems.map((item, index) => (
            <Link
              key={item.text}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-cyan-400 transition-colors duration-300"
            >
              <HackerNavItem text={item.text} delay={index * 300} />
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile overlay when menu is open */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
