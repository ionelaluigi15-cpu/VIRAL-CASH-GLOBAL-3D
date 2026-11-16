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
                size={30}
                color={GOLD}
              />

              <div>
                <h2>OPPORTUNITÀ GLOBALI</h2>
                <p>
                  Preparati a scoprire campagne e collaborazioni
                  con aziende internazionali.
                </p>
              </div>

              <button onClick={() => setActive("Campagne")}>
                SCOPRI LE CAMPAGNE
                <TrendingUp size={18} />
              </button>
            </section>

          </>
        )}

        {active === "Analytics" && (
          <section className="panel">
            <BarChart3 size={40} color={GOLD} />
            <h2>ANALYTICS</h2>
            <p>
              Qui potrai monitorare visualizzazioni,
              follower, interazioni e performance.
            </p>
            <div className="info-box">
              Collega i tuoi account social per visualizzare
              i dati disponibili tramite le API ufficiali.
            </div>
          </section>
        )}

        {active === "Guadagni" && (
          <section className="panel">
            <Wallet size={40} color={GOLD} />
            <h2>I TUOI GUADAGNI</h2>
            <div className="earning">
              € 0,00
            </div>
            <p>Saldo attuale della piattaforma.</p>
            <div className="info-box">
              I guadagni saranno visualizzati quando
              saranno attivati i sistemi di campagne,
              contabilizzazione e pagamento.
            </div>
          </section>
        )}

        {active === "Community" && (
          <section className="panel">
            <Users size={40} color={GOLD} />
            <h2>GLOBAL COMMUNITY</h2>
            <p>
              Uno spazio dedicato ai creator e alle
              collaborazioni internazionali.
            </p>
            <div className="info-box">
              La sezione Community è in fase di sviluppo.
            </div>
          </section>
        )}

        {active === "Campagne" && (
          <section className="panel">
            <Megaphone size={40} color={GOLD} />
            <h2>GLOBAL CAMPAIGNS</h2>
            <p>
              Scopri le opportunità di collaborazione
              con aziende e brand internazionali.
            </p>
            <div className="info-box">
              Le campagne saranno disponibili quando
              verrà attivato il sistema di gestione
              delle aziende e delle collaborazioni.
            </div>
          </section>
        )}

        {active === "Impostazioni" && (
          <section className="panel">
            <Settings size={40} color={GOLD} />
            <h2>IMPOSTAZIONI ACCOUNT</h2>

            <div className="info-box">
              <strong>Account registrato</strong>
              <p>{email}</p>
            </div>

            <button className="settings-logout" onClick={handleLogout}>
              <LogOut size={18} />
              DISCONNETTI ACCOUNT
            </button>
          </section>
        )}

        <footer className="footer">
          VIRAL CASH GLOBAL © 2026
          <span>GLOBAL CREATOR NETWORK</span>
        </footer>

      </section>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #08090d;
          color: #f5f5f5;
          font-family: Arial, sans-serif;
        }

        button {
          font-family: inherit;
          cursor: pointer;
        }

        .dashboard {
          min-height: 100vh;
          display: flex;
          background: #08090d;
        }

        .sidebar {
          width: 255px;
          min-height: 100vh;
          padding: 28px 18px;
          background: #101116;
          border-right: 1px solid #292a30;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: ${GOLD};
          font-size: 19px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .close-menu,
        .menu-toggle {
          display: none;
        }

        .menu-label {
          color: #777;
          font-size: 10px;
          letter-spacing: 2px;
          margin: 48px 0 18px;
        }

        .sidebar nav {
          display: grid;
          gap: 9px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 14px;
          border: 0;
          border-radius: 10px;
          background: transparent;
          color: #aaa;
          text-align: left;
          font-size: 14px;
          transition: .2s;
        }

        .nav-item:hover,
        .nav-item.active {
          background: #28231a;
          color: ${GOLD};
        }

        .sidebar-bottom {
          margin-top: auto;
          padding-top: 25px;
          border-top: 1px solid #303037;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .sidebar-bottom strong {
          display: block;
          font-size: 10px;
          color: ${GOLD};
        }

        .sidebar-bottom small {
          color: #888;
          font-size: 10px;
        }

        .logout {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          margin-top: 15px;
          background: #251719;
          border: 1px solid #573035;
          color: #ff9b9b;
          border-radius: 9px;
        }

        .content {
          flex: 1;
          min-width: 0;
          padding: 28px 35px;
        }

        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 25px;
          border-bottom: 1px solid #282930
