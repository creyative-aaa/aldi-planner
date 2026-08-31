import { CalendarDays } from "lucide-react";
import type { AcademicEvent } from "@/lib/mockData";
import { formatDateRange } from "@/lib/format";

interface AcademicTimelineProps {
  events: AcademicEvent[];
}

export default function AcademicTimeline({ events }: AcademicTimelineProps) {
  return (
    <section className="rounded-sm border border-line bg-surface p-6 shadow-[0_1px_0_rgba(31,34,48,0.04),0_8px_24px_-12px_rgba(31,34,48,0.18)] lg:p-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-line bg-surface2">
          <CalendarDays className="h-4 w-4 text-forest" />
        </div>
        <div>
          <h2 className="font-serif text-lg font-medium tracking-tight text-ink">
            Academic Timeline
          </h2>
          <p className="text-xs text-inkmute">
            Agenda akademik hasil ekstraksi kalender
          </p>
        </div>
      </div>

      <ol className="relative space-y-8">
        {events.map((event, index) => (
          <li key={event.id} className="relative flex gap-6">
            {/* Date column */}
            <div className="w-28 shrink-0 pt-0.5 text-right">
              <p className="font-mono text-xs font-medium leading-5 text-forest">
                {formatDateRange(event.startDate, event.endDate)}
              </p>
            </div>

            {/* Vertical line + dot */}
            <div className="relative flex flex-col items-center">
              <span className="mt-1.5 block h-2 w-2 rounded-full bg-forest" />
              {index < events.length - 1 && (
                <span className="absolute top-4 bottom-[-2rem] w-px bg-line" />
              )}
            </div>

            {/* Event column */}
            <div className="min-w-0 pb-1">
              <h3 className="text-sm font-medium text-ink">
                {event.name}
              </h3>
              <p className="mt-1 text-xs leading-5 text-inksoft">
                {event.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
