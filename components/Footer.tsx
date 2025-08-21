import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full bg-black py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-white/60">
          © {currentYear} Sandra Obunga. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
