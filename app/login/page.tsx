"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Email o password non corretti.");
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <main className="login-page">
      <form onSubmit={handleLogin} className="login-box">
        <h1>VIRAL CASH</h1>
        <h2>GLOBAL</h2>

        <p>Accedi alla tua piattaforma creator</p>

        <input
          type="email"
          placeholder="Indirizzo email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "ACCESSO IN CORSO..." : "ACCEDI"}
        </button>

        <p>
          Non hai un account?
          <a href="/register"> Registrati</a>
        </p>
      </form>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 20px;
          background: #08090d;
          color: white;
          font-family: Arial, sans-serif;
        }

        .login-box {
          width: 100%;
          max-width: 420px;
          padding: 35px;
          background: #14151b;
          border: 1px solid #d9b568;
          border-radius: 18px;
          text-align: center;
        }

        h1 {
          color: #d9b568;
          font-size: 29px;
          margin-bottom: 0;
        }

        h2 {
          color: white;
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
          margin: 10px 0;
          background: #08090d;
          border: 1px solid #444;
          border-radius: 8px;
          color: white;
          font-size: 15px;
        }

        button {
          width: 100%;
          padding: 15px;
          margin-top: 15px;
          background: #d9b568;
          color: #08090d;
          border: 0;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }

        button:disabled {
          opacity: .6;
        }

        a {
          color: #d9b568;
        }

        .error {
          color: #ff7777;
          margin-top: 12px;
        }
      `}</style>
    </main>
  );
}
