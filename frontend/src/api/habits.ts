const BASE_URL = "http://127.0.0.1:8000";

export interface Habit {
  id: number;
  name: string;
  category: string | null;
  created_at: string;
  completed_today: boolean;
  streak: number;
}

export async function completeHabit(id:number): Promise<Habit> {
    const response = await fetch(`${BASE_URL}/habits/${id}/complete`, {
        method: 'POST',
    })
    if (!response.ok) throw new Error("Nie udało się odznaczyć nawyku");
    return response.json()
}

export async function uncompleteHabit(id:number): Promise<Habit> {
    const response = await fetch(`${BASE_URL}/habits/${id}/complete`, {
        method: 'DELETE',
    })
    if (!response.ok) throw new Error("Nie udało się cofnąć oznaczenia");
    return response.json()
}


export interface habitCreate {
  name: string;
  category?: string;
}

export async function getHabits(): Promise<Habit[]> {
  const response = await fetch(`${BASE_URL}/habits`);
  if (!response.ok) {
    throw new Error("Nie udało się pobrać nawyków");
  }
  return response.json();
}

export async function createHabit(habit: habitCreate): Promise<Habit> {
  const response = await fetch(`${BASE_URL}/habits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(habit),
  });
  if (!response.ok) {
    throw new Error("Nie udało się dodać nawyku");
  }
  return response.json();
}
