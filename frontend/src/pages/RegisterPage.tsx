import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import type { ReactFormState } from "react-dom/client";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register({ email, password });
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Coś poszło nie tak");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Stwórz konto
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-ink outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-ink outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-ink px-5 py-2.5 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Tworzenie konta..." : "Zarejestruj się"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-ink-soft">
          Masz już konto?{" "}
          <Link to="/login" className="font-medium text-sage">
            Zaloguj się
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
