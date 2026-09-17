const BASE_URL = 'http://127.0.0.1:8000'

export function getToken(): string | null {
    return localStorage.getItem("token")
}

export async function authFetch(path:string, options: RequestInit = {}) {
    const token = getToken()

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            ...options.headers,
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    })

    if (response.status == 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
        throw new Error("Sesja wygasła, zaloguj się ponownie");
    }

    return response
}