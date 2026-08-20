import { useState, useEffect } from 'react';
import { getHabits, type Habit } from "./api/habits";
import './App.css';

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHabits()
    .then(setHabits)
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false))
  }, []);
  
  if (loading) return <p>Ładowanie...</p>
  if (error) return <p>Błąd: {error}</p>

  return (
    <div>
      <h1>Moje nawyki</h1>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id}>
            {habit.name} {habit.category && `(${habit.category})`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
