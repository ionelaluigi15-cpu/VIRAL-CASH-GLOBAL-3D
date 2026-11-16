"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#08090d",
      color: "white",
      display: "grid",
      placeItems: "center",
      padding: 25
    }}>
      <form onSubmit={handleLogin} style={{
        width: "100%",
        maxWidth: 420,
        background: "#151820",
        padding: 30,
        borderRadius: 16,
        border: "1px solid #d9b568"
      }}>
        <h1 style={{ color: "#d9b568" }}>
          VIRAL CASH GLOBAL
        </h1>

        <h2>LOGIN</h2>

        <p>Accedi alla tua piattaforma globale.</p>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={inputStyle}
        />

        {message && <p style={{ color: "#ff7777" }}>{message}</p>}

        <button disabled={loading} style={buttonStyle}>
          {loading ? "ACCESSO..." : "ACCEDI"}
        </button>

        <p>
          Non hai un account?
          <Link href="/register" style={{ color: "#e4c477" }}>
            {" "}REGISTRATI
          </Link>
        </p>
      </form>
    </main>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: 15,
  marginTop: 18,
  background: "#08090d",
  color: "white",
  border: "1px solid #555",
  borderRadius: 8
};

const buttonStyle = {
  width: "100%",
  padding: 16,
  marginTop: 25,
  background: "#d9b568",
  color: "#08090d",
  border: "none",
  borderRadius: 8,
  fontWeight: "bold" as const
};
