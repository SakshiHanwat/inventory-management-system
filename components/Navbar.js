"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [adjustmentsOpen, setAdjustmentsOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const navItem = (icon, label, path, badge) => (
    <div
      onClick={() => router.push(path)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "9px 12px",
        borderRadius: "10px",
        marginBottom: "2px",
        cursor: "pointer",
        background: isActive(path) ? "#C17F3E" : "transparent",
        transition: "background 0.15s",
      }}
      onMouseEnter={e => { if (!isActive(path)) e.currentTarget.style.background = "#E8D5BB"; }}
      onMouseLeave={e => { if (!isActive(path)) e.currentTarget.style.background = "transparent"; }}
    >
      <span style={{ color: isActive(path) ? "#FDF8F2" : "#9C8572" }}>{icon}</span>
      <span style={{ fontSize: "13px", fontWeight: isActive(path) ? "700" : "500", color: isActive(path) ? "#FDF8F2" : "#6B4226", flex: 1 }}>{label}</span>
      {badge && (
        <span style={{ background: isActive(path) ? "rgba(253,248,242,0.3)" : "#F5E6D0", color: isActive(path) ? "#FDF8F2" : "#9C6B3C", fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "10px" }}>
          {badge}
        </span>
      )}
    </div>
  );

  return (
    <div style={{
      width: "220px",
      minWidth: "220px",
      height: "100vh",
      background: "#EDE0CE",
      borderRight: "1px solid #E8D5BB",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      left: 0,
      top: 0,
      fontFamily: "'Georgia', 'Palatino', serif",
      zIndex: 50,
    }}>

      {/* Logo */}
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid #E8D5BB" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", background: "#FDF3E7", border: "1.5px solid #E8D5BB", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(193,127,62,0.15)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M20 7H4C2.9 7 2 7.9 2 9v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" fill="#C17F3E"/>
              <path d="M16 7V5c0-1.1-.9-2-2-2h-4C8.9 3 8 3.9 8 5v2" stroke="#6B4226" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 12v4M10 14h4" stroke="#FDF8F2" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#6B4226" }}>CoreInventory</div>
            <div style={{ fontSize: "10px", color: "#C4A882" }}>Stock Manager</div>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <div style={{ padding: "12px 10px", flex: 1, overflowY: "auto" }}>

        {/* Dashboard */}
        {navItem(
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
          "Dashboard", "/dashboard"
        )}

        <div style={{ fontSize: "10px", fontWeight: "700", color: "#C4A882", letterSpacing: "0.8px", textTransform: "uppercase", padding: "12px 12px 6px" }}>Operations</div>

        {navItem(
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 7H4C2.9 7 2 7.9 2 9v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"/><path d="M16 7V5c0-1.1-.9-2-2-2h-4C8.9 3 8 3.9 8 5v2"/></svg>,
          "Products", "/products"
        )}

        {navItem(
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
          "Receipts", "/receipts", "4"
        )}

        {navItem(
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>,
          "Deliveries", "/deliveries", "7"
        )}

        {/* Adjustments Dropdown */}
        <div
          onClick={() => setAdjustmentsOpen(!adjustmentsOpen)}
          style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderRadius: "10px", marginBottom: "2px", cursor: "pointer", background: adjustmentsOpen ? "#E8D5BB" : "transparent", transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#E8D5BB"}
          onMouseLeave={e => { if (!adjustmentsOpen) e.currentTarget.style.background = "transparent"; }}
        >
          <span style={{ color: "#9C8572" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </span>
          <span style={{ fontSize: "13px", fontWeight: "500", color: "#6B4226", flex: 1 }}>Adjustments</span>
          <svg style={{ transition: "transform 0.2s", transform: adjustmentsOpen ? "rotate(180deg)" : "rotate(0deg)" }} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </div>

        {/* Dropdown Sub Items */}
        {adjustmentsOpen && (
          <div style={{ marginLeft: "14px", marginBottom: "4px" }}>
            {[
              { label: "Internal Transfer", path: "/transfers" },
              { label: "Stock Adjustments", path: "/adjustments" },
              { label: "Move History", path: "/history" },
            ].map((item) => (
              <div
                key={item.path}
                onClick={() => router.push(item.path)}
                style={{ fontSize: "12px", color: isActive(item.path) ? "#C17F3E" : "#9C8572", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: isActive(item.path) ? "700" : "400", transition: "all 0.15s", borderLeft: `2px solid ${isActive(item.path) ? "#C17F3E" : "#E8D5BB"}`, marginBottom: "2px" }}
                onMouseEnter={e => e.currentTarget.style.color = "#C17F3E"}
                onMouseLeave={e => { if (!isActive(item.path)) e.currentTarget.style.color = "#9C8572"; }}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}

        <div style={{ fontSize: "10px", fontWeight: "700", color: "#C4A882", letterSpacing: "0.8px", textTransform: "uppercase", padding: "10px 12px 6px" }}>System</div>

        {navItem(
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
          "Settings", "/settings"
        )}
      </div>

      {/* Profile */}
      <div style={{ padding: "14px 16px", borderTop: "1px solid #E8D5BB" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #C17F3E, #6B4226)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", color: "#FDF8F2" }}>S</div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#3D2B1F" }}>Sakshi H.</div>
            <div style={{ fontSize: "10px", color: "#9C8572" }}>Inventory Manager</div>
          </div>
          <div
            onClick={() => router.push("/login")}
            style={{ marginLeft: "auto", cursor: "pointer", padding: "4px" }}
            title="Logout"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4A882" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}