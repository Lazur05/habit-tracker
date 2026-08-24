import { useState } from "react";
import { createHabit, type Habit } from "../api/habits";

interface HabitFormProps {
  onHabitCreated: (habit: Habit) => void;
}

function HabitForm({ onHabitCreated }: HabitFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    try {
      const newHabit = await createHabit({
        name,
        category: category || undefined,
      });
      onHabitCreated(newHabit);
      setName("");
      setCategory("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Nowy nawyk..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-ink placeholder:text-ink-soft/60 outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
      />
      <input
        type="text"
        placeholder="Kategoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-32 rounded-xl border border-border bg-surface px-4 py-2.5 text-ink placeholder:text-ink-soft/60 outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
      />
      <button
        type="submit"
        disabled={submitting}
        className="shrink-0 rounded-xl bg-ink px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90 hover:cursor-pointer disabled:opacity-50"
      >
        {submitting ? "Dodawanie..." : "Dodaj"}
      </button>
    </form>
  );
}

export default HabitForm;
