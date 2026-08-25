import { useEffect, useState } from "react";
import { getHeatmap, type HeatmapEntry } from "../api/stats";

function buildWeeks(entries: HeatmapEntry[]): (HeatmapEntry | null)[][] {
  if (entries.length === 0) return [];

  const weeks: (HeatmapEntry | null)[][] = [];
  let currentWeek: (HeatmapEntry | null)[] = [];

  const firstDay = new Date(entries[0].date).getDay();
  for (let i = 0; i < firstDay; i++) {
    currentWeek.push(null);
  }

  entries.forEach((entry) => {
    currentWeek.push(entry);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

function getColorClass(count: number, max: number): string {
  if (count === 0) return "bg-border/50";
  const ratio = count / max;
  if (ratio <= 0.25) return "bg-sage/30";
  if (ratio <= 0.5) return "bg-sage/55";
  if (ratio <= 0.75) return "bg-sage/80";
  return "bg-sage";
}

function HeatmapCalendar() {
  const [entries, setEntries] = useState<HeatmapEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHeatmap()
      .then(setEntries)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-ink-soft text-sm">Ładowanie heatmapy...</p>;
  if (entries.length === 0) return null;

  const weeks = buildWeeks(entries);
  const max = Math.max(...entries.map((e) => e.count), 1);

   return (
    <div>
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-ink-soft">
        Ostatnie 3 miesiące
      </p>
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-1">
            {week.map((entry, dayIdx) =>
              entry ? (
                <div
                  key={dayIdx}
                  title={`${entry.date}: ${entry.count} ${entry.count === 1 ? "nawyk" : "nawyki"}`}
                  className={`h-3 w-3 rounded-sm ${getColorClass(entry.count, max)}`}
                />
              ) : (
                <div key={dayIdx} className="h-3 w-3" />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeatmapCalendar