// components/skills/ProjectsSection.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

// --- DUMMY DATA ---
// Replace this with your actual project data.
// For images, place them in your `public` folder and use the path like `/project-image.png`
const projects = [
  {
    title: "Project Alpha",
    description:
      "A full-stack web application for real-time collaboration, built with the latest technologies.",
    imageUrl: "/images/businessbg.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Project Beta",
    description:
      "A mobile-first social media platform designed for creators, with a focus on performance.",
    imageUrl: "/images/projectthree.PNG",
    tags: ["React Native", "Firebase", "Node.js", "Express"],
    liveUrl: "https://amboseli-lewis-sms-btap.vercel.app/home",
  },
  {
    title: "Project Beta",
    description:
      "A mobile-first social media platform designed for creators, with a focus on performance.",
    imageUrl: "/images/projectone.PNG",
    tags: ["React Native", "Firebase", "Node.js", "Express"],
    liveUrl: "https://houseofcocoa.onrender.com/",
  },
  {
    title: "Project Beta",
    description:
      "A mobile-first social media platform designed for creators, with a focus on performance.",
    imageUrl: "/images/projecttwo.PNG",
    tags: ["React Native", "Firebase", "Node.js", "Express"],
    liveUrl: "https://sandra-obunga.onrender.com/",
  },
  // Add more projects here...
];

// Animation variants for the container and items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

export default function ProjectsSection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-8 md:grid-cols-2"
    >
      {projects.map((project) => (
        <motion.div
          key={project.title}
          variants={itemVariants}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-cyan-500/10"
        >
          {/* The Image */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-xl font-semibold text-white">
              {project.title}
            </h3>
            <p className="mt-2 flex-1 text-sm text-white/70">
              {project.description}
            </p>

            {/* Tags */}
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

            {/* Links */}
            <div className="mt-6 flex items-center gap-4">
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white transition-colors hover:text-cyan-400"
              >
                View Live <ArrowUpRight size={16} />
              </Link>
              {project.repoUrl && (
                <Link
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                >
                  <Github size={16} /> Source Code
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
