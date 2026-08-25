const BASE_URL = 'http://127.0.0.1:8000'

export interface HeatmapEntry {
    date: string;
    count: number
}

export async function getHeatmap(): Promise<HeatmapEntry[]> {
    const response = await fetch(`${BASE_URL}/stats/heatmap`)
    if(!response.ok) throw new Error("Nie udało się pobrać danych heatmapy");
    return response.json()
}