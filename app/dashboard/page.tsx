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
  Link2
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { supabase } from "../../lib/supabase-browser";

const GOLD = "#d9b568";

const platforms = [
  { name: "TikTok", icon: Play },
  { name: "Instagram", icon: Instagram },
  { name: "Facebook", icon: Facebook },
  { name: "YouTube", icon: Youtube }
];

const navigation: {
  label: string;
  icon: LucideIcon;
}[] = [
  { label: "Panoramica", icon: LayoutDashboard },
  { label: "Analytics", icon: BarChart3 },
  { label: "Guadagni", icon: Wallet },
  { label: "Community", icon: Users },
  { label: "Impostazioni", icon: Settings }
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
      (_event, session) => {
        if (!session) {
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
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  function handleConnect(name: string) {
    setNotice(
      `Collegamento ${name}: configurazione OAuth e API ufficiali necessaria.`
    );
  }

  if (loading) {
    return (
      <main className="loading">
        <h2>VIRAL CASH GLOBAL</h2>
        <p>Caricamento della piattaforma...</p>
      </main>
    );
  }

  return (
    <main className="dashboard">

      {/* SIDEBAR */}

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
          {navigation.map((item) => {
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

          <ShieldCheck size={20} color={GOLD} />

          <p>
            GLOBAL SECURITY
            <br />
            <span>Protected workspace</span>
          </p>

          <button
            className="logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            ESCI
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <section className="content">

        <header className="topbar">

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </button>

          <div>
            <small>GLOBAL CREATOR NETWORK</small>
            <h1>{active}</h1>
          </div>

          <div className="profile">
            <Bell color={GOLD} size={21} />

            <div className="avatar">
              <User size={21
