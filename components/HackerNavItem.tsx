"use client";

import React, { useEffect, useState } from "react";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=*/[]{}|<>?";

type Props = {
  text: string;
  delay?: number;
  className?: string;
};

export default function HackerNavItem({
  text,
  delay = 0,
  className = "",
}: Props) {
  const [output, setOutput] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  function startDecoding(duration = 1000) {
    let frame = 0;
    const totalFrames = Math.ceil(duration / 40);

    const interval = setInterval(() => {
      setOutput((prev) =>
        prev
          .split("")
          .map((_, i) => {
            if (i < frame * (text.length / totalFrames)) return text[i];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      frame++;
      if (frame > totalFrames) {
        clearInterval(interval);
        setOutput(text);
      }
    }, 40);
  }

  // Run once on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      startDecoding(1200);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  function handleHover() {
    setIsHovering(true);
    startDecoding(1000);
    setTimeout(() => setIsHovering(false), 1200); // Locking state
  }

  return (
    <span
      onMouseEnter={handleHover}
      className={`inline-block transition-colors duration-300 cursor-pointer hover:text-cyan-400 ${className}`}
    >
      {output}
    </span>
  );
}
