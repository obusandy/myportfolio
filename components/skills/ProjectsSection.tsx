"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

const projects = [
  {
    title: "Meechum",
    description:
      "mini blogging.",
    imageUrl: "/images/meechum.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Framer-motion"],
    liveUrl: "https://meechum.vercel.app/",
  },
  {
    title: "Amboseli Lewis School Management System",
    description:
      "A comprehensive school management system for efficient school operations.",
    imageUrl: "/images/projectthree.PNG",
    tags: ["React", "MongoDB", "Node.js", "Express"],
    liveUrl: "https://amboseli-lewis-sms-btap.vercel.app/home",
  },
  {
    title: "PFNFarmers",
    description: "Grants, training, and market access to help farmers grow sustainably and build resilience.",
    imageUrl: "/images/pfnfarmers.png",
    tags: ["React", "Resend", "Node.js", "Express"],
    liveUrl: "https://www.pfnfarmers.org/",
  },
  {
  title: "shammah-international-agency",
    description:
      "Your premier partner for navigating immigration, corporate, and travel solutions in Kenya.",
    imageUrl: "/images/Sia.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    liveUrl: "https://shammah-international-agency-ltd.vercel.app/e",
  },
   {
  title: "HaloWash Laundry App",
    description:
      "A modern laundry service app with real-time tracking and seamless payments.",
    imageUrl: "/images/projectfour.PNG",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    liveUrl: "https://halowash.vercel.app/Home",
  },

 {
    title: "Cocoa House",
    description: "An interactive website featuring cacao sourcing and supply.",
    imageUrl: "/images/projectone.PNG",
    tags: ["React Native", "Firebase", "Node.js", "Express"],
    liveUrl: "https://houseofcocoa.onrender.com/",
  },
  {
    title: "Portfolio",
    description:
      "A fun, interactive website powered by React, showcasing my work and skills.",
    imageUrl: "/images/projecttwo.PNG",
    tags: ["React Native", "Firebase", "Node.js", "Express"],
    liveUrl: "https://sandra-obunga.onrender.com/",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100 },
  },
};

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const initialCount = 4;
  const visibleProjects = showAll ? projects : projects.slice(0, initialCount);

  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-8 md:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              layout
              exit={{ opacity: 0, y: 20 }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-cyan-500/10"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-white/70">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cyan-900/50 px-3 py-1 text-xs font-medium text-cyan-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white transition-colors hover:text-cyan-400"
                  >
                    View Live <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* See More / See Less button */}
      {projects.length > initialCount && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 rounded-full border border-cyan-400/40 px-5 py-2 text-cyan-300 transition-colors hover:border-cyan-300 hover:text-cyan-100"
          >
            {showAll ? (
              <>
                See Less <ChevronUp size={16} />
              </>
            ) : (
              <>
                See More <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}