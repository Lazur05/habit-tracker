import { createContext, useContext, useState, type ReactNode } from "react";
import { login as loginApi } from "../api/auth";
import { getToken } from "../api/client";

interface AuthContextType {
    isAuthenticated: boolean
    login: (email:string, password:string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken())

    async function login(email:string, password:string) {
        const token = await loginApi(email, password)
        localStorage.setItem("token", token)
        setIsAuthenticated(true)
    }

    function logout() {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth musi być używane wewnątrz AuthProvider");
    return context
}