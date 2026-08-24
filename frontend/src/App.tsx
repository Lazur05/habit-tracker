import { useState, useEffect } from "react";
import { getHabits, type Habit } from "./api/habits";
import { completeHabit, uncompleteHabit } from "./api/habits";
import HabitForm from "./components/HabitForm";
import "./App.css";

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

  async function handleToggle(habit:Habit) {
    const updated = habit.completed_today
      ? await uncompleteHabit(habit.id)
      : await completeHabit(habit.id)
    setHabits((prev) =>
      prev.map((h) => (h.id === updated.id ? updated : h))
    )
  }

  return (
    <div>
      <h1>Moje nawyki</h1>
      <HabitForm onHabitCreated={handleHabitCreated} />
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            <input 
              type="checkbox" 
              checked={habit.completed_today}
              onChange={() => handleToggle(habit)} 
            />
            {habit.name} {habit.category && `(${habit.category})`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
