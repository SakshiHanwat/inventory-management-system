"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [counted, setCounted] = useState({ products: 0, warehouses: 0, users: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Count-up animation
  useEffect(() => {
    const targets = { products: 50000, warehouses: 200, users: 12000 };
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounted({
        products: Math.floor(targets.products * ease),
        warehouses: Math.floor(targets.warehouses * ease),
        users: Math.floor(targets.users * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C17F3E" strokeWidth="1.8" strokeLinecap="round">
          <path d="M20 7H4C2.9 7 2 7.9 2 9v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"/>
          <path d="M16 7V5c0-1.1-.9-2-2-2h-4C8.9 3 8 3.9 8 5v2"/>
        </svg>
      ),
      title: "Smart Stock Tracking",
      desc: "Monitor every product in real-time across all your warehouses. Never lose track of inventory again.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C17F3E" strokeWidth="1.8" strokeLinecap="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
      ),
      title: "Multi-Warehouse Support",
      desc: "Manage multiple locations from one dashboard. Transfer stock between warehouses effortlessly.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C17F3E" strokeWidth="1.8" strokeLinecap="round">
          <path d="M18 20V10M12 20V4M6 20v-6"/>
        </svg>
      ),
      title: "Real-Time Analytics",
      desc: "Visual dashboards with KPIs, trends, and alerts. Make data-driven decisions instantly.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C17F3E" strokeWidth="1.8" strokeLinecap="round">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.51 0 2.93.37 4.18 1.02"/>
          <path d="M21 3l-9 9-3-3"/>
        </svg>
      ),
      title: "Receipts & Deliveries",
      desc: "Streamline incoming and outgoing stock with automated validation and ledger logging.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C17F3E" strokeWidth="1.8" strokeLinecap="round">
          <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"/>
        </svg>
      ),
      title: "Low Stock Alerts",
      desc: "Automatic notifications when products hit reorder thresholds. Never run out of critical stock.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C17F3E" strokeWidth="1.8" strokeLinecap="round">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
          <line x1="4" y1="22" x2="4" y2="15"/>
        </svg>
      ),
      title: "Stock Adjustments",
      desc: "Fix mismatches instantly. Every adjustment is logged in a complete audit trail.",
    },
  ];

  const steps = [
    { num: "01", title: "Receive Goods", desc: "Log incoming shipments from vendors. Stock auto-updates on validation.", color: "#C17F3E" },
    { num: "02", title: "Transfer Internally", desc: "Move stock between warehouses or racks. Every move is tracked.", color: "#9C6B3C" },
    { num: "03", title: "Deliver to Customers", desc: "Process delivery orders. Stock decreases automatically on dispatch.", color: "#6B4226" },
    { num: "04", title: "Adjust & Audit", desc: "Fix discrepancies and review the full stock ledger anytime.", color: "#A8692E" },
  ];

  return (
    <div style={s.page}>
      {/* BG texture */}
      <div style={s.bgDots} />
      <div style={s.blob1} />
      <div style={s.blob2} />

      {/* ── NAVBAR ── */}
      <nav style={{ ...s.nav, background: scrolled ? "rgba(253,248,242,0.95)" : "transparent", boxShadow: scrolled ? "0 2px 20px rgba(97,60,20,0.08)" : "none" }}>
        <div style={s.navInner}>
          <div style={s.logo}>
            <div style={s.logoIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M20 7H4C2.9 7 2 7.9 2 9v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" fill="#C17F3E"/>
                <path d="M16 7V5c0-1.1-.9-2-2-2h-4C8.9 3 8 3.9 8 5v2" stroke="#6B4226" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 12v4M10 14h4" stroke="#FDF8F2" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={s.logoText}>CoreInventory</span>
          </div>
          <div style={s.navLinks}>
            <a href="#features" style={s.navLink}>Features</a>
            <a href="#how" style={s.navLink}>How It Works</a>
            <button style={s.navOutlineBtn} onClick={() => router.push("/login")}>Sign In</button>
            <button style={s.navPrimaryBtn} onClick={() => router.push("/login")}>Get Started</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroBadge}>
          <span style={s.heroBadgeDot} />
          Inventory Management Reimagined
        </div>
        <h1 style={s.heroTitle}>
          Streamline Your Stock.<br />
          <span style={s.heroTitleAccent}>Simplify Your Business.</span>
        </h1>
        <p style={s.heroSub}>
          Replace manual registers and scattered Excel sheets with a centralized,<br />
          real-time inventory system built for modern businesses.
        </p>
        <div style={s.heroBtns}>
          <button style={s.heroBtn} onClick={() => router.push("/login")}>
            Start Managing Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button style={s.heroOutlineBtn} onClick={() => router.push("/login")}>
            View Dashboard Demo
          </button>
        </div>

        {/* Stats row */}
        <div style={s.statsRow}>
          {[
            { val: `${(counted.products / 1000).toFixed(0)}K+`, label: "Products Tracked" },
            { val: `${counted.warehouses}+`, label: "Warehouses Managed" },
            { val: `${(counted.users / 1000).toFixed(0)}K+`, label: "Active Users" },
          ].map((stat, i) => (
            <div key={i} style={s.statCard}>
              <span style={s.statVal}>{stat.val}</span>
              <span style={s.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={s.section}>
        <div style={s.sectionHead}>
          <span style={s.sectionTag}>Everything You Need</span>
          <h2 style={s.sectionTitle}>Powerful Features for<br />Serious Inventory Management</h2>
          <p style={s.sectionSub}>From receipts to deliveries, every stock movement is tracked, logged, and visible.</p>
        </div>
        <div style={s.featGrid}>
          {features.map((f, i) => (
            <div key={i} style={s.featCard}>
              <div style={s.featIcon}>{f.icon}</div>
              <h3 style={s.featTitle}>{f.title}</h3>
              <p style={s.featDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ ...s.section, background: "#EDE0CE22" }}>
        <div style={s.sectionHead}>
          <span style={s.sectionTag}>Simple Process</span>
          <h2 style={s.sectionTitle}>How CoreInventory Works</h2>
          <p style={s.sectionSub}>Four simple steps to complete inventory control.</p>
        </div>
        <div style={s.stepsRow}>
          {steps.map((step, i) => (
            <div key={i} style={s.stepCard}>
              <div style={{ ...s.stepNum, color: step.color, borderColor: step.color + "33", background: step.color + "11" }}>
                {step.num}
              </div>
              {i < steps.length - 1 && <div style={s.stepLine} />}
              <h3 style={s.stepTitle}>{step.title}</h3>
              <p style={s.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={s.ctaBanner}>
        <div style={s.ctaInner}>
          <h2 style={s.ctaTitle}>Ready to Take Control<br />of Your Inventory?</h2>
          <p style={s.ctaSub}>Join thousands of businesses already using CoreInventory to manage their stock smarter.</p>
          <button style={s.ctaBtn} onClick={() => router.push("/login")}>
            Get Started — It's Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div style={s.logo}>
            <div style={s.logoIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20 7H4C2.9 7 2 7.9 2 9v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" fill="#C17F3E"/>
                <path d="M16 7V5c0-1.1-.9-2-2-2h-4C8.9 3 8 3.9 8 5v2" stroke="#6B4226" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ ...s.logoText, fontSize: "16px" }}>CoreInventory</span>
          </div>
          <p style={{ fontSize: "12px", color: "#C4A882", margin: 0 }}>© 2025 CoreInventory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#F5EFE6",
    fontFamily: "'Georgia', 'Palatino', serif",
    position: "relative",
    overflowX: "hidden",
  },
  bgDots: {
    position: "fixed", inset: 0,
    backgroundImage: "radial-gradient(circle, #C17F3E14 1px, transparent 1px)",
    backgroundSize: "30px 30px",
    pointerEvents: "none", zIndex: 0,
  },
  blob1: {
    position: "fixed", top: "-150px", right: "-150px",
    width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, #C17F3E18, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },
  blob2: {
    position: "fixed", bottom: "-100px", left: "-100px",
    width: "400px", height: "400px", borderRadius: "50%",
    background: "radial-gradient(circle, #6B422618, transparent 70%)",
    pointerEvents: "none", zIndex: 0,
  },

  // NAV
  nav: {
    position: "fixed", top: 0, left: 0, right: 0,
    zIndex: 100, transition: "all 0.3s ease",
    backdropFilter: "blur(8px)",
  },
  navInner: {
    maxWidth: "1100px", margin: "0 auto",
    padding: "16px 32px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  logo: { display: "flex", alignItems: "center", gap: "10px" },
  logoIcon: {
    width: "40px", height: "40px",
    background: "#FDF3E7", border: "1.5px solid #E8D5BB",
    borderRadius: "10px", display: "flex",
    alignItems: "center", justifyContent: "center",
    boxShadow: "0 2px 8px rgba(193,127,62,0.15)",
  },
  logoText: {
    fontSize: "20px", fontWeight: "700",
    color: "#6B4226", letterSpacing: "-0.3px",
  },
  navLinks: { display: "flex", alignItems: "center", gap: "28px" },
  navLink: {
    fontSize: "14px", color: "#9C6B3C",
    textDecoration: "none", fontWeight: "500",
    transition: "color 0.2s",
  },
  navOutlineBtn: {
    padding: "8px 20px",
    background: "transparent",
    border: "1.5px solid #E8D5BB",
    borderRadius: "8px", fontSize: "13px",
    color: "#6B4226", fontWeight: "600",
    fontFamily: "inherit", cursor: "pointer",
    transition: "all 0.2s",
  },
  navPrimaryBtn: {
    padding: "8px 20px",
    background: "linear-gradient(135deg, #C17F3E, #A8692E)",
    border: "none", borderRadius: "8px",
    fontSize: "13px", color: "#FDF8F2",
    fontWeight: "700", fontFamily: "inherit",
    cursor: "pointer",
    boxShadow: "0 3px 12px rgba(193,127,62,0.28)",
  },

  // HERO
  hero: {
    maxWidth: "900px", margin: "0 auto",
    padding: "160px 32px 100px",
    textAlign: "center", position: "relative", zIndex: 1,
  },
  heroBadge: {
    display: "inline-flex", alignItems: "center", gap: "8px",
    background: "#FDF3E7", border: "1px solid #E8D5BB",
    borderRadius: "20px", padding: "6px 16px",
    fontSize: "12px", color: "#9C6B3C",
    fontWeight: "600", marginBottom: "28px",
    letterSpacing: "0.3px",
  },
  heroBadgeDot: {
    width: "7px", height: "7px", borderRadius: "50%",
    background: "#C17F3E", display: "inline-block",
    animation: "pulse 2s infinite",
  },
  heroTitle: {
    fontSize: "clamp(36px, 5vw, 60px)",
    fontWeight: "800", color: "#3D2B1F",
    lineHeight: "1.15", marginBottom: "24px",
    letterSpacing: "-1.5px",
  },
  heroTitleAccent: { color: "#C17F3E" },
  heroSub: {
    fontSize: "17px", color: "#9C8572",
    lineHeight: "1.7", marginBottom: "40px",
  },
  heroBtns: {
    display: "flex", gap: "14px",
    justifyContent: "center", flexWrap: "wrap",
    marginBottom: "64px",
  },
  heroBtn: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "15px 32px",
    background: "linear-gradient(135deg, #C17F3E, #A8692E)",
    border: "none", borderRadius: "12px",
    fontSize: "15px", color: "#FDF8F2",
    fontWeight: "700", fontFamily: "inherit",
    cursor: "pointer",
    boxShadow: "0 6px 24px rgba(193,127,62,0.32)",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  heroOutlineBtn: {
    padding: "15px 32px",
    background: "#FDF8F2",
    border: "1.5px solid #E8D5BB",
    borderRadius: "12px", fontSize: "15px",
    color: "#6B4226", fontWeight: "600",
    fontFamily: "inherit", cursor: "pointer",
    boxShadow: "0 2px 8px rgba(97,60,20,0.08)",
  },

  // STATS
  statsRow: {
    display: "flex", gap: "0",
    justifyContent: "center",
    background: "#FDF8F2",
    border: "1px solid #E8D5BB",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(97,60,20,0.08)",
    overflow: "hidden",
    maxWidth: "580px", margin: "0 auto",
  },
  statCard: {
    flex: 1, padding: "24px 20px",
    display: "flex", flexDirection: "column",
    alignItems: "center", gap: "4px",
    borderRight: "1px solid #F0E4D0",
  },
  statVal: { fontSize: "28px", fontWeight: "800", color: "#C17F3E" },
  statLabel: { fontSize: "11px", color: "#9C8572", fontWeight: "500", letterSpacing: "0.3px" },

  // SECTIONS
  section: {
    maxWidth: "1100px", margin: "0 auto",
    padding: "100px 32px",
    position: "relative", zIndex: 1,
  },
  sectionHead: { textAlign: "center", marginBottom: "60px" },
  sectionTag: {
    display: "inline-block",
    background: "#F5E6D0", color: "#9C6B3C",
    fontSize: "11px", fontWeight: "700",
    padding: "5px 14px", borderRadius: "20px",
    letterSpacing: "0.8px", textTransform: "uppercase",
    marginBottom: "14px",
  },
  sectionTitle: {
    fontSize: "clamp(26px, 3.5vw, 40px)",
    fontWeight: "800", color: "#3D2B1F",
    letterSpacing: "-0.8px", lineHeight: "1.2",
    marginBottom: "14px",
  },
  sectionSub: { fontSize: "15px", color: "#9C8572", lineHeight: "1.6" },

  // FEATURES
  featGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  featCard: {
    background: "#FDF8F2",
    border: "1px solid #E8D5BB",
    borderRadius: "16px",
    padding: "32px 28px",
    boxShadow: "0 2px 12px rgba(97,60,20,0.06)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  featIcon: {
    width: "52px", height: "52px",
    background: "#FDF3E7",
    border: "1px solid #E8D5BB",
    borderRadius: "12px",
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: "18px",
  },
  featTitle: {
    fontSize: "16px", fontWeight: "700",
    color: "#3D2B1F", marginBottom: "10px",
  },
  featDesc: { fontSize: "13px", color: "#9C8572", lineHeight: "1.65" },

  // HOW IT WORKS
  stepsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px", position: "relative",
  },
  stepCard: {
    background: "#FDF8F2",
    border: "1px solid #E8D5BB",
    borderRadius: "16px",
    padding: "28px 24px",
    position: "relative",
    boxShadow: "0 2px 12px rgba(97,60,20,0.06)",
  },
  stepNum: {
    display: "inline-block",
    fontSize: "22px", fontWeight: "800",
    border: "1.5px solid",
    borderRadius: "10px",
    padding: "4px 12px",
    marginBottom: "16px",
    letterSpacing: "-0.5px",
  },
  stepLine: {
    position: "absolute", top: "40px", right: "-12px",
    width: "24px", height: "2px",
    background: "#E8D5BB", zIndex: 2,
  },
  stepTitle: {
    fontSize: "15px", fontWeight: "700",
    color: "#3D2B1F", marginBottom: "8px",
  },
  stepDesc: { fontSize: "13px", color: "#9C8572", lineHeight: "1.6" },

  // CTA BANNER
  ctaBanner: {
    background: "linear-gradient(135deg, #6B4226, #9C6B3C, #C17F3E)",
    padding: "80px 32px",
    position: "relative", zIndex: 1,
    overflow: "hidden",
  },
  ctaInner: { maxWidth: "600px", margin: "0 auto", textAlign: "center" },
  ctaTitle: {
    fontSize: "clamp(28px, 4vw, 44px)",
    fontWeight: "800", color: "#FDF8F2",
    letterSpacing: "-0.8px", lineHeight: "1.2",
    marginBottom: "16px",
  },
  ctaSub: {
    fontSize: "15px", color: "#F5E6D0",
    lineHeight: "1.6", marginBottom: "36px",
  },
  ctaBtn: {
    display: "inline-flex", alignItems: "center", gap: "10px",
    padding: "16px 36px",
    background: "#FDF8F2",
    border: "none", borderRadius: "12px",
    fontSize: "15px", color: "#6B4226",
    fontWeight: "700", fontFamily: "inherit",
    cursor: "pointer",
    boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
  },

  // FOOTER
  footer: {
    background: "#EDE0CE",
    borderTop: "1px solid #E8D5BB",
    padding: "28px 32px",
    position: "relative", zIndex: 1,
  },
  footerInner: {
    maxWidth: "1100px", margin: "0 auto",
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
  },
};