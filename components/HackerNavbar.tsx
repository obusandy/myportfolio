"use client";

import { useState } from "react";
import Link from "next/link";
import HackerNavItem from "./HackerNavItem";

const navItems = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Services", href: "/services" },
  { text: "Contact", href: "/contact" },
];

export default function HackerNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* 🖥️ Desktop Navbar */}
      <nav className="fixed top-8 w-full z-50 hidden md:flex justify-center py-6 px-8 font-mono tracking-wide text-lg text-cyan-300">
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
          className="text-cyan-300 text-3xl font-bold"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* 📱 SLIDE-IN PANEL + CENTERED NAV (Mobile only) */}
      <div
        className={`md:hidden fixed top-0 right-0 w-full sm:w-1/2 z-40 bg-black/90 backdrop-blur-sm transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="py-16 flex flex-col items-center space-y-6 text-cyan-300 text-2xl font-mono">
          {navItems.map((item, index) => (
            <Link
              key={item.text}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block"
            >
              <HackerNavItem text={item.text} delay={index * 300} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
