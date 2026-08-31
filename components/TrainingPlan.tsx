import { GraduationCap } from "lucide-react";
import type { ModuleCategory, TrainingModule } from "@/lib/mockData";
import { formatDate } from "@/lib/format";

interface TrainingPlanProps {
  modules: TrainingModule[];
}

function CategoryBadge({ category }: { category: ModuleCategory }) {
  const isCore = category === "core";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
        isCore
          ? "bg-forest/10 text-forest"
          : "bg-ochre/20 text-bronze"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isCore ? "bg-forest" : "bg-copper"
        }`}
      />
      {isCore ? "Core" : "Support"}
    </span>
  );
}

export default function TrainingPlan({ modules }: TrainingPlanProps) {
  const sorted = [...modules].sort((a, b) =>
    a.scheduledDate.localeCompare(b.scheduledDate)
  );

  return (
    <section className="rounded-sm border border-line bg-surface p-6 shadow-[0_1px_0_rgba(31,34,48,0.04),0_8px_24px_-12px_rgba(31,34,48,0.18)] lg:p-8">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-line bg-surface2">
            <GraduationCap className="h-4 w-4 text-forest" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-medium tracking-tight text-ink">
              Training &amp; Action Plan
            </h2>
            <p className="text-xs text-inkmute">
              Jadwal pelatihan modul yang disusun otomatis
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-4 sm:flex">
          <span className="flex items-center gap-1.5 text-[11px] text-inksoft">
            <span className="h-1.5 w-1.5 rounded-full bg-forest" />
            Core
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-inksoft">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" />
            Support
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {sorted.map((module) => (
          <article
            key={module.id}
            className="rounded-sm border border-line bg-[#FFFCF5] p-5 transition-colors hover:bg-surface2"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs font-medium text-copper">
                  {formatDate(module.scheduledDate)}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-ink">
                  {module.moduleName}
                </h3>
              </div>
              <CategoryBadge category={module.category} />
            </div>
            <p className="mt-3 text-xs leading-5 text-inksoft">
              {module.rationale}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
