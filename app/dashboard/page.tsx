"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  Eye,
  Heart,
  Globe,
  ShieldCheck,
  LogOut,
  TrendingUp,
  Menu,
  X,
  User,
  Link2,
  Megaphone
} from "lucide-react";

import { supabase } from "../../lib/supabase-browser";

const GOLD = "#d9b568";

const navigation = [
  { label: "Panoramica", icon: LayoutDashboard },
  { label: "Analytics", icon: BarChart3 },
  { label: "Guadagni", icon: Wallet },
  { label: "Community", icon: Users },
  { label: "Campagne", icon: Megaphone },
  { label: "Impostazioni", icon: Settings }
];

const platforms = [
  { name: "TikTok", icon: Play },
  { name: "Instagram", icon: Instagram },
  { name: "Facebook", icon: Facebook },
  { name: "YouTube", icon: Youtube }
];

export default function Dashboard() {
  const router = useRouter();

  const [active, setActive] = useState("Panoramica");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let mounted = true;

    async function checkUser() {
      const { data, error } = await supabase.auth.getUser();

      if (!mounted) return;

      if (error || !data.user) {
        router.replace("/login");
        return;
      }

      setEmail(data.user.email || "");
      setLoading(false);
    }

    checkUser();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT" || !session) {
          router.replace("/login");
        } else if (mounted) {
          setEmail(session.user.email || "");
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setNotice("Errore durante la disconnessione.");
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  function connectSocial(name: string) {
    setNotice(
      `Collegamento ${name}: servono OAuth e API ufficiali.`
    );
  }

  if (loading) {
    return (
      <main className="loading">
        <h1>VIRAL CASH GLOBAL</h1>
        <p>Caricamento piattaforma...</p>

        <style jsx>{`
          .loading {
            min-height: 100vh;
            display: grid;
            place-content: center;
            text-align: center;
            background: #08090d;
            color: #d9b568;
            font-family: Arial;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="dashboard">

      <div
        className={`overlay ${menuOpen ? "visible" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>

        <div className="brand">
          <Globe size={27} />
          <span>VIRAL CASH</span>

          <button
            className="close-menu"
            onClick={() => setMenuOpen(false)}
          >
            <X />
          </button>
        </div>

        <p className="menu-label">
          CREATOR WORKSPACE
        </p>

        <nav>
          {navigation.map(item => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={
                  active === item.label
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() => {
                  setActive(item.label);
                  setMenuOpen(false);
                  setNotice("");
                }}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <ShieldCheck color={GOLD} size={22} />

          <div>
            <strong>GLOBAL SECURITY</strong>
            <small>Protected workspace</small>
          </div>

          <button className="logout" onClick={handleLogout}>
            <LogOut size={18} />
            ESCI
          </button>
        </div>

      </aside>

      <section className="content">

        <header className="topbar">

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>

          <div>
            <small>GLOBAL CREATOR NETWORK</small>
            <h1>{active}</h1>
          </div>

          <div className="profile">
            <Bell color={GOLD} />

            <div className="avatar">
              <User />
            </div>
          </div>

        </header>

        {notice && (
          <div className="notice">
            {notice}
            <button onClick={() => setNotice("")}>
              <X size={17} />
            </button>
          </div>
        )}

        {active === "Panoramica" && (
          <>

            <section className="welcome">
              <div>
                <span>WELCOME BACK</span>

                <h2>
                  VIRAL CASH
                  <br />
                  <strong>GLOBAL</strong>
                </h2>

                <p>
                  La tua presenza social.
                  Le tue opportunità globali.
                </p>

                <small className="email">
                  <User size={15} />
                  {email}
                </small>
              </div>

              <Globe className="globe" size={115} />
            </section>

            <h2 className="section-title">
              PERFORMANCE OVERVIEW
            </h2>

            <div className="stats">

              {[
                ["Visualizzazioni", "—", Eye],
                ["Follower", "—", Users],
                ["Interazioni", "—", Heart],
                ["Guadagni", "€ 0,00", Wallet]
              ].map(([name, value, Icon]: any) => (

                <div className="stat-card" key={name}>
                  <Icon size={26} color={GOLD} />

                  <p>{name}</p>

                  <h2>{value}</h2>

                  <small>Dati non ancora disponibili</small>
                </div>

              ))}

            </div>

            <h2 className="section-title">
              I TUOI SOCIAL NETWORK
            </h2>

            <div className="social-grid">

              {platforms.map(social => (
                <div className="social-card" key={social.name}>

                  <social.icon size={35} color={GOLD} />

                  <h3>{social.name}</h3>

                  <p>Account non collegato</p>

                  <button
                    onClick={() => connectSocial(social.name)}
                  >
                    <Plus size={17} />
                    COLLEGA ACCOUNT
                  </button>

                </div>
              ))}

            </div>

            <section className="opportunities">
              <Globe
