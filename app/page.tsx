import Link from "next/link";
import {
  Globe2,
  Instagram,
  Facebook,
  Youtube,
  Play,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Zap
} from "lucide-react";

const socials = [
  { name: "TikTok", icon: Play },
  { name: "Instagram", icon: Instagram },
  { name: "Facebook", icon: Facebook },
  { name: "YouTube", icon: Youtube }
];

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#08090d",
      color: "white",
      padding: "30px 6%",
      overflow: "hidden"
    }}>

      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #292929",
        paddingBottom: "25px"
      }}>
        <h2 style={{
          color: "#d9b568",
          fontFamily: "Orbitron",
          letterSpacing: "2px"
        }}>
          VIRAL CASH GLOBAL
        </h2>

        <Link href="/dashboard" style={{
          color: "#ffe3a1",
          border: "1px solid #d9b568",
          padding: "12px 18px",
          borderRadius: "8px"
        }}>
          LOGIN ↗
        </Link>
      </nav>

      <section style={{
        padding: "100px 0 80px",
        textAlign: "center"
      }}>

        <div style={{
          color: "#d9b568",
          letterSpacing: "4px",
          fontSize: "12px"
        }}>
          GLOBAL CREATOR ECONOMY
        </div>

        <h1 style={{
          fontSize: "clamp(38px, 7vw, 75px)",
          lineHeight: "1.15",
          marginTop: "30px",
          fontWeight: 800
        }}>
          YOUR SOCIAL POWER.
          <br />
          <span style={{ color: "#d9b568" }}>
            YOUR GLOBAL EARNINGS.
          </span>
        </h1>

        <p style={{
          color: "#a4a4a4",
          maxWidth: "650px",
          margin: "25px auto",
          lineHeight: 1.8,
          fontSize: "16px"
        }}>
          Collega i tuoi social network, analizza
          le tue performance e scopri nuove
          opportunità di monetizzazione.
        </p>

        <Link href="/dashboard" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          background: "linear-gradient(120deg,#a77c35,#ffe3a1)",
          color: "#08090d",
          padding: "17px 28px",
          borderRadius: "8px",
          fontWeight: 800,
          marginTop: "20px"
        }}>
          ENTRA NELLA PIATTAFORMA
          <ArrowUpRight size={20} />
        </Link>

      </section>

      <section style={{ padding: "35px 0" }}>

        <h2 style={{
          textAlign: "center",
          fontSize: "30px",
          marginBottom: "35px"
        }}>
          IL TUO ECOSISTEMA SOCIAL
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "18px"
        }}>

          {socials.map((social) => (
            <div key={social.name} style={{
              background: "linear-gradient(145deg,#191d27,#101219)",
              border: "1px solid #8d7545",
              borderRadius: "15px",
              padding: "30px 20px",
              textAlign: "center",
              boxShadow: "0 0 25px rgba(217,181,104,.08)"
            }}>

              <social.icon
                size={38}
                color="#d9b568"
              />

              <h3 style={{
                marginTop: "18px",
                fontSize: "21px"
              }}>
                {social.name}
              </h3>

              <p style={{
                color: "#999",
                fontSize: "12px",
                marginTop: "10px"
              }}>
                SOCIAL CONNECTION
              </p>

            </div>
          ))}

        </div>
      </section>

      <section style={{
        padding: "80px 0",
        textAlign: "center"
      }}>

        <Globe2 size={55} color="#d9b568" />

        <h2 style={{ margin: "20px 0" }}>
          UN SOLO ACCOUNT.
          <br />
          <span style={{ color: "#d9b568" }}>
            OPPORTUNITÀ GLOBALI.
          </span>
        </h2>

        <p style={{
          color: "#999",
          lineHeight: 2
        }}>
          <TrendingUp size={17} /> Analytics avanzate
          <br />
          <Zap size={17} /> Campagne e collaborazioni
          <br />
          <ShieldCheck size={17} /> Connessioni social protette
        </p>

      </section>

      <footer style={{
        borderTop: "1px solid #333",
        padding: "30px 0",
        textAlign: "center",
        color: "#888",
        fontSize: "12px"
      }}>
        © 2026 VIRAL CASH GLOBAL
        <br />
        YOUR SOCIAL POWER. YOUR GLOBAL EARNINGS.
      </footer>

    </main>
  );
}
