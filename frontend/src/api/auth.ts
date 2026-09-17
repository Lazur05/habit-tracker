const BASE_URL = 'http://127.0.0.1:8000'

export interface RegisterData {
    email: string
    password: string
}

export async function register(data:RegisterData): Promise<void> {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Rejestracja nie powiodła się")
    }
}

export async function login(email:string, password: string): Promise<string> {
    const formData = new URLSearchParams()
    formData.append("username", email)
    formData.append("password", password)

    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
    })

    if (!response.ok) {
        throw new Error("Nieprawidłowy email lub hasło");
        
    }

    const data = await response.json()
    return data.access_token
}