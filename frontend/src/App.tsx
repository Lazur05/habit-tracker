import { useState, useEffect } from "react";
import { getHabits, type Habit } from "./api/habits";
import { completeHabit, uncompleteHabit } from "./api/habits";
import HabitForm from "./components/HabitForm";
import HeatmapCalendar from "./components/HeatmapCalendar";
import "./index.css";

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHabits()
      .then(setHabits)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function handleHabitCreated(newHabit: Habit) {
    setHabits((prev) => [...prev, newHabit]);
  }

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd: {error}</p>;

  async function handleToggle(habit: Habit) {
    const updated = habit.completed_today
      ? await uncompleteHabit(habit.id)
      : await completeHabit(habit.id);
    setHabits((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-xl px-4 py-16">
        <p className="text-sm font-medium uppercase tracking-widest text-ink-soft">
          Twój dzień
        </p>
        <h1 className="mt-1 font-display text-4xl font-semibold text-ink">
          Nawyki
        </h1>
        <div className="mt-8">
          <HabitForm onHabitCreated={handleHabitCreated} />
        </div>

        <div className="mt-8 space-y-3">
          {loading && <p className="text-ink-soft">Ładowanie...</p>}
          {error && <p className="text-red-600">Błąd: {error}</p>}

          {!loading && !error && habits.length === 0 && (
            <p className="text-ink-soft">
              Nie masz jeszcze żadnych nawyków. Dodaj pierwszy powyżej.
            </p>
          )}

          {habits.map((habit) => (
            <div
              key={habit.id}
              className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-shadow hover:shadow-sm"
            >
              <button
                onClick={() => handleToggle(habit)}
                aria-label={
                  habit.completed_today
                    ? "Cofnij odznaczenie"
                    : "Oznacz jako zrobione"
                }
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  habit.completed_today
                    ? "border-sage bg-sage"
                    : "border-border bg-transparent"
                }`}
              >
                {habit.completed_today && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 text-white"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <div className="flex-1">
                <p
                  className={`font-medium text-ink ${habit.completed_today ? "line-through decoration-ink-soft" : ""}`}
                >
                  {habit.name}
                </p>
              </div>

              {habit.streak > 0 && (
                <span className="flex items-center gap-1 rounded-full bg-amber/10 px-2.5 py-1 text-xs font-medium text-amber">
                  🔥 {habit.streak}
                </span>
              )}

              {habit.category && (
                <span className="rounded-full bg-sage-light px-2.5 py-1 text-xs font-medium text-sage">
                  {habit.category}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-5">
        <HeatmapCalendar />
      </div>
    </div>
  );
}

export default App;
