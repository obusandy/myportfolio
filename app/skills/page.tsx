import React, { Suspense } from "react";
import SkillsPageContent from "./SkillsPageContent";

export default function SkillsPage() {
  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      <div className="relative z-10">
        <div className="pt-20">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-white/70">Loading...</div>
              </div>
            }
          >
            <SkillsPageContent />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
