"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Certificate {
  imageUrl: string;
  alt?: string;
}

const certificates: Certificate[] = [
  { imageUrl: "/images/introduction.PNG" },
  { imageUrl: "/images/html and css in depth.PNG" },
  { imageUrl: "/images/javascript.PNG" },
  { imageUrl: "/images/principles of UXUI.PNG" },
  { imageUrl: "/images/React Cert.PNG" },
  { imageUrl: "/images/React Native.PNG" },
  { imageUrl: "/images/advanced react.PNG" },
  { imageUrl: "/images/version control.PNG" },
  { imageUrl: "/images/Coding interview prep.PNG" },
  { imageUrl: "/images/my final certificate.PNG" },
  { imageUrl: "/images/ALX-Cert.png" },
];

// Helpers
const altFromPath = (url: string): string => {
  const file = url.split("/").pop() || "Certificate";
  return file
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]/g, " ")
    .trim();
};

export default function CertsSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isOpen = selectedIndex !== null;

  const openAt = useCallback((i: number) => setSelectedIndex(i), []);
  const close = useCallback(() => setSelectedIndex(null), []);
  const next = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % certificates.length
    );
  }, [selectedIndex]);
  const prev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + certificates.length) % certificates.length
    );
  }, [selectedIndex]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, next, prev]);

  // Active certificate
  const activeCert = useMemo(
    () => (selectedIndex !== null ? certificates[selectedIndex] : null),
    [selectedIndex]
  );

  return (
    <>
      {/* Grid — individual tiles, no “box in a box” */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.06 } },
        }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {certificates.map((cert, i) => (
          <motion.button
            key={cert.imageUrl}
            type="button"
            variants={{
              hidden: { y: 16, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 280, damping: 24 },
              },
            }}
            onClick={() => openAt(i)}
            className={[
              "group relative block w-full overflow-hidden rounded-xl",
              "ring-1 ring-white/10 hover:ring-cyan-300/40 transition",
              "bg-white/5 hover:bg-white/10",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60",
            ].join(" ")}
            aria-label={`Open ${cert.alt || altFromPath(cert.imageUrl)}`}
          >
            {/* Maintain a pleasant certificate aspect ratio */}
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={cert.imageUrl}
                alt={cert.alt || altFromPath(cert.imageUrl)}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]"
              />
              {/* Soft hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -left-6 -top-6 h-20 w-20 rounded-full bg-cyan-400/10 blur-2xl" />
                <div className="absolute -right-6 -bottom-8 h-20 w-20 rounded-full bg-violet-400/10 blur-2xl" />
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {isOpen && activeCert && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-modal="true"
            role="dialog"
            aria-label="Certificate viewer"
          >
            <motion.div
              key="modal"
              className="relative w-full max-w-6xl"
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={close}
                aria-label="Close"
                className="absolute -top-10 right-0 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
              >
                <X size={20} />
              </button>

              {/* Prev / Next */}
              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
                <button
                  onClick={prev}
                  aria-label="Previous certificate"
                  className="pointer-events-auto ml-[-12px] rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next certificate"
                  className="pointer-events-auto mr-[-12px] rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Image area with drag-to-switch */}
              <motion.div
                className="relative mx-auto w-full overflow-hidden rounded-lg ring-1 ring-white/10"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.06}
                onDragEnd={(
                  _: MouseEvent | TouchEvent | PointerEvent,
                  info: PanInfo
                ) => {
                  if (info.offset.x < -60) next();
                  else if (info.offset.x > 60) prev();
                }}
              >
                <div className="relative mx-auto w-full">
                  <Image
                    src={activeCert.imageUrl}
                    alt={activeCert.alt || altFromPath(activeCert.imageUrl)}
                    width={1600}
                    height={1100}
                    className="block h-auto w-full max-h-[85vh] object-contain"
                    sizes="100vw"
                    priority={false}
                  />
                </div>
              </motion.div>

              {/* Caption */}
              <div className="mt-3 text-center text-sm text-white/80">
                {activeCert.alt || altFromPath(activeCert.imageUrl)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
