"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase-browser";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (password.length < 6) {
      setMessage("La password deve contenere almeno 6 caratteri.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Le password non coincidono.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (data.session) {
        router.replace("/dashboard");
        router.refresh();
      } else {
        setMessage(
          "Registrazione completata! Controlla la tua email per confermare l'account."
        );
      }
    } catch {
      setMessage("Errore durante la registrazione. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="register-page">
      <form className="register-card" onSubmit={handleRegister}>
        <h1>VIRAL CASH</h1>
        <h2>GLOBAL</h2>

        <p>Crea il tuo account creator</p>

        <input
          type="email"
          placeholder="Indirizzo email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Crea password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Conferma password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {message && <div className="message">{message}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "REGISTRAZIONE..." : "CREA ACCOUNT"}
        </button>

        <div className="login-link">
          Hai già un account?
          <Link href="/login"> Accedi</Link>
        </div>
      </form>

      <style jsx>{`
        .register-page {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 20px;
          background: #08090d;
          color: white;
          font-family: Arial, sans-serif;
        }

        .register-card {
          width: 100%;
          max-width: 430px;
          padding: 35px;
          background: #14151b;
          border: 1px solid #d9b568;
          border-radius: 18px;
          text-align: center;
          box-shadow: 0 0 35px #d9b56815;
        }

        h1 {
          color: #d9b568;
          font-size: 30px;
          margin-bottom: 0;
        }

        h2 {
          letter-spacing: 5px;
          margin-top: 5px;
        }

        p {
          color: #aaa;
          margin: 25px 0;
        }

        input {
          width: 100%;
          padding: 15px;
          margin: 9px 0;
          background: #08090d;
          color: white;
          border: 1px solid #444;
          border-radius: 8px;
          font-size: 15px;
        }

        button {
          width: 100%;
          padding: 16px;
          margin-top: 20px;
          background: linear-gradient(120deg, #a77c35, #ffe3a1);
          color: #08090d;
          border: 0;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.6;
        }

        .message {
          color: #d9b568;
          font-size: 13px;
          margin-top: 15px;
          line-height: 1.6;
        }

        .login-link {
          color: #aaa;
          margin-top: 25px;
          font-size: 13px;
        }

        .login-link a {
          color: #d9b568;
          text-decoration: none;
        }

        @media (max-width: 400px) {
          .register-card {
            padding: 25px 18px;
          }
        }
      `}</style>
    </main>
  );
}
