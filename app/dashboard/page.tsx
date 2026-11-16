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
          border-bottom: 1px solid #282930;
        }

        .topbar small {
          color: ${GOLD};
          letter-spacing: 2px;
          font-size: 10px;
        }

        .topbar h1 {
          margin: 7px 0 0;
          font-size: 27px;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: #29251c;
          color: ${GOLD};
          border: 1px solid ${GOLD};
        }

        .welcome {
          margin-top: 28px;
          padding: 35px;
          min-height: 240px;
          border: 1px solid #66502b;
          border-radius: 18px;
          background:
            radial-gradient(circle at 80% 50%, #42351d, transparent 45%),
            linear-gradient(120deg, #191a20, #111216);
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
        }

        .welcome span {
          color: ${GOLD};
          font-size: 11px;
          letter-spacing: 3px;
        }

        .welcome h2 {
          font-size: 38px;
          line-height: 1.15;
          margin: 15px 0;
        }

        .welcome h2 strong {
          color: ${GOLD};
        }

        .welcome p {
          color: #aaa;
          font-size: 14px;
        }

        .email {
          display: flex;
          align-items: center;
          gap: 7px;
          color: ${GOLD};
          margin-top: 20px;
          overflow-wrap: anywhere;
        }

        .globe {
          color: ${GOLD};
          opacity: .8;
          flex-shrink: 0;
        }

        .section-title {
          margin: 35px 0 18px;
          color: ${GOLD};
          font-size: 14px;
          letter-spacing: 2px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        .stat-card {
          padding: 22px;
          border: 1px solid #303037;
          border-radius: 13px;
          background: #131419;
          min-width: 0;
        }

        .stat-card p {
          color: #aaa;
          font-size: 13px;
        }

        .stat-card h2 {
          font-size: 25px;
          margin: 10px 0;
        }

        .stat-card small {
          color: #777;
          font-size: 10px;
        }

        .social-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        .social-card {
          padding: 23px 15px;
          background: #131419;
          border: 1px solid #303037;
          border-radius: 13px;
          text-align: center;
        }

        .social-card h3 {
          margin: 14px 0 8px;
        }

        .social-card p {
          color: #888;
          font-size: 12px;
        }

        .social-card button {
          margin-top: 12px;
          padding: 10px;
          width: 100%;
          border: 1px solid ${GOLD};
          border-radius: 7px;
          background: #28231a;
          color: ${GOLD};
          font-size: 10px;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }

        .opportunities {
          margin-top: 30px;
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
          background: #15161c;
          border: 1px solid #554526;
          border-radius: 13px;
        }

        .opportunities h2 {
          color: ${GOLD};
          font-size: 15px;
        }

        .opportunities p {
          color: #aaa;
          font-size: 12px;
        }

        .opportunities button {
          margin-left: auto;
          padding: 12px 17px;
          background: ${GOLD};
          color: #111;
          border: 0;
          border-radius: 8px;
          display: flex;
          gap: 9px;
          align-items: center;
          font-weight: bold;
        }

        .panel {
          margin-top: 35px;
          padding: 35px;
          background: #131419;
          border: 1px solid #303037;
          border-radius: 15px;
          min-height: 300px;
        }

        .panel h2 {
          color: ${GOLD};
          margin-top: 20px;
        }

        .panel p {
          color: #aaa;
          line-height: 1.7;
        }

        .info-box {
          margin-top: 25px;
          padding: 20px;
          background: #1d1e24;
          border: 1px solid #393a40;
          border-radius: 10px;
          color: #bbb;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .earning {
          color: ${GOLD};
          font-size: 40px;
          font-weight: bold;
          margin: 25px 0;
        }

        .settings-logout {
          margin-top: 20px;
          padding: 13px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
          background: #642c32;
          border: 0;
          border-radius: 8px;
        }

        .notice {
          margin-top: 20px;
          padding: 14px;
          border: 1px solid ${GOLD};
          background: #211e17;
          border-radius: 9px;
          color: ${GOLD};
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .notice button {
          background: transparent;
          border: 0;
          color: ${GOLD};
        }

        .footer {
          margin-top: 45px;
          padding: 20px 0;
          border-top: 1px solid #292a30;
          color: #777;
          font-size: 10px;
          letter-spacing: 1px;
          display: flex;
          justify-content: space-between;
          gap: 15px;
        }

        @media (min-width: 1500px) {
          .content {
            padding: 40px 55px;
          }

          .welcome {
            min-height: 280px;
          }

          .stat-card {
            padding: 30px;
          }
        }

        @media (max-width: 1050px) {
          .stats,
          .social-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .content {
            padding: 25px;
          }
        }

        @media (max-width: 650px) {
          .sidebar {
            position: fixed;
            z-index: 100;
            top: 0;
            bottom: 0;
            left: 0;
            width: 275px;
            min-height: 100dvh;
            transform: translateX(-100%);
            transition: transform .25s ease;
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .close-menu {
            display: block;
            margin-left: auto;
            background: transparent;
            border: 0;
            color: ${GOLD};
          }

          .overlay {
            display: none;
            position: fixed;
            inset: 0;
            z-index: 90;
            background: #000a;
          }

          .overlay.visible {
            display: block;
          }

          .content {
            width: 100%;
            padding: 18px;
          }

          .menu-toggle {
            display: block;
            background: #22232a;
            border: 1px solid #444;
            color: ${GOLD};
            padding: 9px;
            border-radius: 8px;
          }

          .topbar {
            gap: 12px;
          }

          .topbar h1 {
            font-size: 21px;
          }

          .topbar small {
            font-size: 8px;
          }

          .profile {
            gap: 8px;
          }

          .welcome {
            padding: 23px;
            min-height: 210px;
          }

          .welcome h2 {
            font-size: 29px;
          }

          .globe {
            width: 65px;
          }

          .stats,
          .social-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .stat-card {
            padding: 15px;
          }

          .stat-card h2 {
            font-size: 21px;
          }

          .social-card {
            padding: 18px 10px;
          }

          .opportunities {
            padding: 18px;
          }

          .opportunities button {
            margin-left: 0;
            width: 100%;
            justify-content: center;
          }

          .panel {
            padding: 22px;
          }

          .footer {
            flex-direction: column;
          }
        }

        @media (max-width: 360px) {
          .stats,
          .social-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

    </main>
  );
}         
          
