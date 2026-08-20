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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nazwa nawyku"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Kategoria (opcjonalnie)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Dodawanie..." : "Dodaj"}
      </button>
    </form>
  );
}

export default HabitForm;
