"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase-browser";
import {
  LayoutDashboard,
  BarChart3,
  Wallet,
  Users,
  Settings,
  Bell,
  Instagram,
  Facebook,
  Youtube,
  Play,
  Plus,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Globe,
  ShieldCheck
} from "lucide-react";

const platforms = [
  { name: "TikTok", icon: Play },
  { name: "Instagram", icon: Instagram },
  { name: "Facebook", icon: Facebook },
  { name: "YouTube", icon: Youtube }
];

export default function Dashboard() {
  const [active, u] = useState("Panoramica");
const router = useRouter();
const [checkingAuth, setCheckingAuth] = useState(true);

useEffect(() => {
  let mounted = true;

  const {
    data: { subscription }
  } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      if (!session) {
        router.replace("/login");
      } else if (mounted) {
        setCheckingAuth(false);
      }
    }
  );

  supabase.auth.getSession().then(({ data, error }) => {
    if (!mounted) return;

    if (error || !data.session) {
      router.replace("/login");
    } else {
      setCheckingAuth(false);
    }
  });

  return () => {
    mounted = false;
    subscription.unsubscribe();
  };
}, [router]);

if (checkingAuth) {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#08090d",
      color: "#d9b568",
      display: "grid",
      placeItems: "center"
    }}>
      VERIFICA ACCOUNT...
    </main>
  );
}
  return (
    <main style={{
      minHeight: "100vh",
      background: "#08090d",
      color: "white",
      display: "flex",
      fontFamily: "Inter, sans-serif"
    }}>

      <aside style={{
        width: "230px",
        padding: "25px 15px",
        background: "#11141b",
        borderRight: "1px solid #292929"
      }}>

        <h2 style={{
          color: "#d9b568",
          fontSize: "19px",
          marginBottom: "45px"
        }}>
          VIRAL CASH
        </h2>

        {[
          ["Panoramica", LayoutDashboard],
          ["Analytics", BarChart3],
          ["Guadagni", Wallet],
          ["Community", Users],
          ["Impostazioni", Settings]
        ].map(([label, Icon]: any) => (

          <button
            key={label}
            onClick={() => setActive(label)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              width: "100%",
              padding: "15px",
              marginBottom: "8px",
              border: "none",
              borderRadius: "8px",
              background:
                active === label ? "#39301e" : "transparent",
              color:
                active === label ? "#f0d18d" : "#999",
              textAlign: "left",
              cursor: "pointer"
            }}
          >
            <Icon size={19} />
            {label}
          </button>

        ))}

      </aside>

      <section style={{
        flex: 1,
        padding: "30px",
        minWidth: 0
      }}>

        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}>

          <div>
            <small style={{ color: "#d9b568" }}>
              CREATOR WORKSPACE
            </small>

            <h1 style={{ marginTop: "8px" }}>
              {active}
            </h1>
          </div>

          <Bell color="#d9b568" />

        </header>

        <div style={{
          padding: "30px",
          borderRadius: "15px",
          border: "1px solid #8d7545",
          background:
            "linear-gradient(120deg,#252016,#11141b)",
          marginBottom: "25px"
        }}>

          <small style={{ color: "#d9b568" }}>
            GLOBAL CREATOR NETWORK
          </small>

          <h2 style={{
            fontSize: "30px",
            margin: "15px 0"
          }}>
            BENVENUTO IN
            <br />
            <span style={{ color: "#d9b568" }}>
              VIRAL CASH GLOBAL
            </span>
          </h2>

          <p style={{ color: "#aaa" }}>
            Collega i tuoi social e scopri
            nuove opportunità di guadagno.
          </p>

        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(170px,1fr))",
          gap: "15px",
          marginBottom: "35px"
        }}>

          {[
            ["Visualizzazioni", "—", Eye],
            ["Follower", "—", Users],
            ["Like", "—", Heart],
            ["Guadagni", "€ 0,00", Wallet]
          ].map(([name, value, Icon]: any) => (

            <div key={name} style={{
              background: "#151820",
              padding: "22px",
              borderRadius: "12px",
              border: "1px solid #333"
            }}>

              <Icon color="#d9b568" size={23} />

              <p style={{
                color: "#999",
                marginTop: "15px",
                fontSize: "12px"
              }}>
                {name}
              </p>

              <h2 style={{
                marginTop: "10px",
                fontSize: "27px"
              }}>
                {value}
              </h2>

            </div>

          ))}

        </div>

        <h2 style={{ marginBottom: "20px" }}>
          I TUOI SOCIAL NETWORK
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(210px,1fr))",
          gap: "15px"
        }}>

          {platforms.map((social) => (

            <div key={social.name} style={{
              background: "#151820",
              border: "1px solid #51452e",
              borderRadius: "12px",
              padding: "22px"
            }}>

              <social.icon
                size={32}
                color="#d9b568"
              />

              <h3 style={{ margin: "15px 0 8px" }}>
                {social.name}
              </h3>

              <p style={{
                fontSize: "11px",
                color: "#999",
                marginBottom: "18px"
              }}>
                Account non collegato
              </p>

              <button
                onClick={() =>
                  alert(
                    "Collegamento " +
                    social.name +
                    " da configurare con API ufficiali."
                  )
                }
                style={{
                  background: "#d9b568",
                  color: "#08090d",
                  border: "none",
                  padding: "11px 15px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <Plus size={16} />
                COLLEGA ACCOUNT
              </button>

            </div>

          ))}

        </div>

        <div style={{
          marginTop: "30px",
          padding: "25px",
          background: "#151820",
          borderRadius: "12px",
          border: "1px solid #333"
        }}>

          <h3>
            <Globe size={20}
              color="#d9b568"
              style={{ verticalAlign: "middle" }}
            />
            {" "} OPPORTUNITÀ GLOBALI
          </h3>

          <p style={{
            color: "#999",
            marginTop: "15px",
            lineHeight: "1.8"
          }}>
            Scopri campagne pubblicitarie,
            affiliazioni e collaborazioni
            con aziende internazionali.
          </p>

          <ShieldCheck
            color="#d9b568"
            size={20}
            style={{ marginTop: "15px" }}
          />

        </div>

      </section>

    </main>
  );
}
