import { motion, Variants } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiTailwindcss,
  SiFramer,
  SiTypescript,
  SiJavascript,
  SiGit,
  SiFigma,
  SiVercel,
  SiFlutter,
  SiPhp,
  SiMysql,
} from "react-icons/si";

const skills = [
  {
    name: "TypeScript",
    icon: <SiTypescript className="h-8 w-8 text-blue-500" />,
  },
  {
    name: "JavaScript",
    icon: <SiJavascript className="h-8 w-8 text-yellow-400" />,
  },
  { name: "React", icon: <SiReact className="h-8 w-8 text-cyan-400" /> },
  { name: "Next.js", icon: <SiNextdotjs className="h-8 w-8 text-white" /> },
  { name: "Node.js", icon: <SiNodedotjs className="h-8 w-8 text-green-500" /> },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="h-8 w-8 text-teal-400" />,
  },
  {
    name: "Framer Motion",
    icon: <SiFramer className="h-8 w-8 text-purple-400" />,
  },
  { name: "Prisma", icon: <SiPrisma className="h-8 w-8 text-teal-200" /> },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="h-8 w-8 text-blue-400" />,
  },
  { name: "MongoDB", icon: <SiMongodb className="h-8 w-8 text-green-600" /> },
  { name: "Git", icon: <SiGit className="h-8 w-8 text-orange-600" /> },
  { name: "Figma", icon: <SiFigma className="h-8 w-8" /> }, // Figma icon has its own colors
  { name: "Flutter", icon: <SiFlutter className="h-8 w-8 text-sky-500" /> },
  { name: "Laravel", icon: <SiVercel className="h-8 w-8 text-red-500" /> },
  { name: "PHP", icon: <SiPhp className="h-8 w-8 text-indigo-400" /> },
  { name: "MySQL", icon: <SiMysql className="h-8 w-8 text-blue-600" /> },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function StacksSection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      {skills.map((skill) => (
        <motion.div
          key={skill.name}
          variants={itemVariants}
          className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/10"
        >
          {skill.icon}
          <span className="text-sm font-medium text-gray-300 transition-colors group-hover:text-white">
            {skill.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
