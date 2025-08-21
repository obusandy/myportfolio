"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function UXOptimizedHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      return () =>
        heroElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative flex justify-center md:justify-between items-center">
          <div
            className={`
              max-w-lg space-y-6 text-center md:text-left
              transition-all duration-1000 delay-200 ease-out
              ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }
            `}
          >
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-light tracking-wider text-white leading-tight">
                SANDRA
                <br />
                <span className="text-cyan-400 font-extralight">OBUNGA</span>
              </h1>
              <div className="flex items-center space-x-4 justify-center md:justify-start">
                <div className="w-12 h-px bg-cyan-400" />
                <div className="w-2 h-2 border border-cyan-400/50 rounded-full animate-pulse" />
                <div className="w-8 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-lg text-cyan-200 font-light tracking-wide">
                Full-Stack Developer & Tech Entrepreneur
              </p>
              <p className="text-base text-gray-400 leading-relaxed max-w-md mx-auto md:mx-0">
                Crafting digital experiences that bridge innovative ideas with
                scalable solutions.
              </p>
            </div>
            <div className="pt-4">
              <button className="group relative inline-flex items-center space-x-3 px-6 py-3 border border-cyan-400/40 text-cyan-400 font-light tracking-wider uppercase text-sm overflow-hidden transition-all duration-300 hover:text-black hover:border-cyan-400">
                <span className="relative z-10">Explore Journey</span>
                <div className="relative z-10">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0L6.59 1.41L12.17 7H0v2h12.17L6.59 14.59L8 16l8-8z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-cyan-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
            </div>
          </div>

          <div
            className={`
              relative transition-all duration-1000 ease-out
              ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }
              hidden md:block
            `}
            style={{
              transform: `translateX(${mousePosition.x * 0.5}px) translateY(${
                mousePosition.y * 0.5
              }px) translateZ(0)`,
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent blur-3xl scale-125 group-hover:scale-150 transition-transform duration-700"
              style={{
                transform: `translateX(${
                  mousePosition.x * -0.3
                }px) translateY(${mousePosition.y * -0.3}px) scale(1.5)`,
              }}
            />

            <div className="relative w-80 h-96 lg:w-96 lg:h-[420px] group">
              <Image
                src="/images/heroimageone.jpg"
                alt="Sandra Obunga"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 60% 80% at 50% 50%, black 40%, transparent 100%)",
                }}
                priority
              />
            </div>
          </div>
        </div>

        <div
          className={`
            md:hidden mt-16 flex justify-center
            transition-all duration-1000 delay-400
            ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
        >
          <div className="relative group w-64 h-72">
            <Image
              src="/images/heroimageone.jpg"
              alt="Sandra Obunga"
              fill
              className="object-cover"
              style={{
                maskImage:
                  "radial-gradient(ellipse 60% 80% at 50% 50%, black 50%, transparent 100%)",
              }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
