const BASE_URL = 'http://127.0.0.1:8000'

export interface Habit {
    id: number;
    name: string;
    category: string | null;
    created_at: string;
}

export interface habitCreate {
    name: string;
    category?: string
}

export async function getHabits(): Promise<Habit[]> {
    const response = await fetch(`${BASE_URL}/habits`)
    if (!response.ok) {
        throw new Error("Nie udało się pobrać nawyków");
    }
    return response.json()
}

export async function createHabit(habit:habitCreate): Promise<Habit> {
    const response = await fetch(`${BASE_URL}/habits`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(habit)
    })
    if (!response.ok) {
        throw new Error("Nie udało się dodać nawyku");
    }
    return response.json()
}