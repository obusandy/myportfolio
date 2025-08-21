// components/skills/SkillsTabs.tsx
import { motion } from "framer-motion";
import { LucideProps } from "lucide-react";
import Link from "next/link";

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<LucideProps>;
}

interface SkillsTabsProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export default function SkillsTabs({
  tabs,
  activeTab,
  setActiveTab,
}: SkillsTabsProps) {
  return (
    <div className="flex justify-center border-b border-white/10 pb-2">
      <div className="relative flex space-x-2 sm:space-x-4 rounded-full bg-white/5 p-1.5">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={`/skills?tab=${tab.id}`}
            onClick={(e) => {
              e.preventDefault(); // Prevent full page reload
              setActiveTab(tab.id);
              // Update URL without reloading
              window.history.pushState(null, "", `/skills?tab=${tab.id}`);
            }}
            className={`${
              activeTab === tab.id
                ? "text-white"
                : "text-gray-400 hover:text-white"
            } relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-sm sm:text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400`}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </Link>
        ))}

        {/* The sliding background element */}
        {tabs.map((tab, index) =>
          activeTab === tab.id ? (
            <motion.div
              key={tab.id}
              layoutId="active-tab-background"
              className="absolute inset-0 z-0 h-full rounded-full bg-cyan-500/10"
              style={{
                // We calculate the position based on the index
                // This is a simple but effective way without needing refs
                transform: `translateX(calc(${index * 100}% + ${
                  index * 0.5
                }rem))`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          ) : null
        )}
      </div>
    </div>
  );
}
