"use client";
import Navbar from "@/components/Navbar";

const kpiCards = [
  { label: "Total Products", value: "1,248", sub: "+12 this week", subColor: "#7A9E7E", iconBg: "#F5E6D0", iconColor: "#C17F3E", valColor: "#3D2B1F",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 7H4C2.9 7 2 7.9 2 9v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"/><path d="M16 7V5c0-1.1-.9-2-2-2h-4C8.9 3 8 3.9 8 5v2"/></svg> },
  { label: "Low / Out of Stock", value: "23", sub: "5 out of stock", subColor: "#B85C4A", iconBg: "rgba(184,92,74,0.1)", iconColor: "#B85C4A", valColor: "#B85C4A",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  { label: "Pending Receipts", value: "8", sub: "3 awaiting approval", subColor: "#C9973A", iconBg: "rgba(193,127,62,0.1)", iconColor: "#C17F3E", valColor: "#3D2B1F",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
  { label: "Pending Deliveries", value: "14", sub: "6 ready to ship", subColor: "#7A9E7E", iconBg: "rgba(122,148,168,0.12)", iconColor: "#7A94A8", valColor: "#3D2B1F",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg> },
];

const operations = [
  { doc: "REC-2024-089", type: "Receipt",    date: "Mar 14", status: "Done",    sc: "#7A9E7E", bg: "rgba(122,158,126,0.1)" },
  { doc: "DEL-2024-201", type: "Delivery",   date: "Mar 14", status: "Ready",   sc: "#C17F3E", bg: "#F5E6D0" },
  { doc: "TRF-2024-045", type: "Transfer",   date: "Mar 13", status: "Draft",   sc: "#9C8572", bg: "#F0E4D0" },
  { doc: "DEL-2024-200", type: "Delivery",   date: "Mar 13", status: "Waiting", sc: "#C9973A", bg: "rgba(201,151,58,0.1)" },
  { doc: "ADJ-2024-012", type: "Adjustment", date: "Mar 12", status: "Done",    sc: "#7A9E7E", bg: "rgba(122,158,126,0.1)" },
];

const lowStockItems = [
  { name: "Steel Rods 12mm", sku: "STL-012",  qty: 5,  min: 50 },
  { name: "Bolt Pack M8",    sku: "BLT-M08",  qty: 12, min: 100 },
  { name: "Safety Gloves L", sku: "SAF-GL-L", qty: 0,  min: 30 },
];

const transfers = [
  { from: "Main Store", to: "Production", items: "3 items" },
  { from: "Rack A",     to: "Rack B",     items: "1 item" },
];

const months   = ["Oct","Nov","Dec","Jan","Feb","Mar"];
const receipts = [72,85,60,95,80,88];
const deliveries = [58,70,90,75,65,72];

export default function Dashboard() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F5EFE6", fontFamily: "'Georgia','Palatino',serif" }}>
      <Navbar />

      {/* Main content — offset by sidebar width */}
      <div style={{ marginLeft: "220px", flex: 1, padding: "28px 32px", overflowY: "auto" }}>

        {/* ── TOP BAR ── */}
        <div style={s.topBar}>
          <div>
            <h1 style={s.greeting}>Good Morning, Sakshi 👋</h1>
            <p style={s.date}>Saturday, 14 March 2026 — Here's your inventory snapshot</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={s.searchBox}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9C8572" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input placeholder="Search SKU, product..." style={s.searchInput} />
            </div>
            <div style={s.bellWrap}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9C6B3C" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <div style={s.bellDot} />
            </div>
          </div>
        </div>

        {/* ── KPI CARDS ── */}
        <div style={s.kpiGrid}>
          {kpiCards.map((k, i) => (
            <div key={i} style={s.kpiCard}>
              <div style={s.kpiTop}>
                <span style={s.kpiLabel}>{k.label}</span>
                <div style={{ ...s.kpiIconBox, background: k.iconBg }}>
                  <span style={{ color: k.iconColor }}>{k.icon}</span>
                </div>
              </div>
              <div style={{ ...s.kpiVal, color: k.valColor }}>{k.value}</div>
              <div style={{ fontSize: "11px", color: k.subColor, marginTop: "4px" }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* ── MIDDLE SECTION — table + right panels ── */}
        <div style={s.midGrid}>

          {/* Recent Operations */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <span style={s.cardTitle}>Recent Operations</span>
              <span style={s.viewAll}>View All</span>
            </div>
            <div style={{ display: "flex", gap: "6px", marginBottom: "14px", flexWrap: "wrap" }}>
              {["All","Receipts","Deliveries","Transfers"].map((f, i) => (
                <span key={f} style={{ background: i === 0 ? "#C17F3E" : "#F5E6D0", color: i === 0 ? "#FDF8F2" : "#9C6B3C", fontSize: "10px", fontWeight: "700", padding: "4px 10px", borderRadius: "20px", cursor: "pointer" }}>{f}</span>
              ))}
            </div>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 70px 70px", padding: "6px 0", borderBottom: "1px solid #F0E4D0" }}>
              {["Document","Type","Date","Status"].map(h => (
                <span key={h} style={{ fontSize: "10px", fontWeight: "700", color: "#C4A882", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</span>
              ))}
            </div>
            {operations.map((op, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 70px 70px", padding: "9px 0", borderBottom: i < operations.length - 1 ? "1px solid #F0E4D0" : "none", alignItems: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: "600", color: "#3D2B1F" }}>{op.doc}</span>
                <span style={{ fontSize: "11px", color: "#9C8572" }}>{op.type}</span>
                <span style={{ fontSize: "11px", color: "#9C8572" }}>{op.date}</span>
                <span style={{ display: "inline-block", background: op.bg, color: op.sc, fontSize: "10px", fontWeight: "700", padding: "3px 8px", borderRadius: "6px", textAlign: "center" }}>{op.status}</span>
              </div>
            ))}
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {/* Low Stock Alerts */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <span style={s.cardTitle}>Low Stock Alerts</span>
                <span style={{ background: "rgba(184,92,74,0.1)", color: "#B85C4A", fontSize: "10px", fontWeight: "700", padding: "3px 9px", borderRadius: "10px" }}>23 items</span>
              </div>
              {lowStockItems.map((item, i) => (
                <div key={i} style={{ marginBottom: i < lowStockItems.length - 1 ? "12px" : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#3D2B1F" }}>{item.name}</span>
                    <span style={{ fontSize: "11px", fontWeight: "700", color: item.qty === 0 ? "#B85C4A" : "#C9973A" }}>{item.qty === 0 ? "Out of Stock" : `${item.qty} left`}</span>
                  </div>
                  <div style={{ fontSize: "10px", color: "#C4A882", marginBottom: "5px" }}>{item.sku}</div>
                  <div style={{ height: "5px", background: "#F0E4D0", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min((item.qty / item.min) * 100, 100)}%`, background: item.qty === 0 ? "#B85C4A" : "#C9973A", borderRadius: "4px" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Transfers Today */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <span style={s.cardTitle}>Transfers Today</span>
                <span style={s.viewAll}>View All</span>
              </div>
              {transfers.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: i < transfers.length - 1 ? "1px solid #F0E4D0" : "none" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: "600", color: "#3D2B1F" }}>
                      {t.from}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C17F3E" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      {t.to}
                    </div>
                    <div style={{ fontSize: "10px", color: "#9C8572", marginTop: "2px" }}>{t.items}</div>
                  </div>
                  <span style={{ background: "#F5E6D0", color: "#9C6B3C", fontSize: "10px", fontWeight: "700", padding: "3px 8px", borderRadius: "6px" }}>Ready</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── STOCK ANALYSIS CHARTS ── */}
        <div style={{ marginTop: "24px" }}>
          <div style={{ marginBottom: "16px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "800", color: "#3D2B1F", margin: "0 0 3px", letterSpacing: "-0.3px" }}>Stock Analysis</h2>
            <p style={{ fontSize: "11px", color: "#9C8572", margin: 0 }}>Visual breakdown of your inventory performance</p>
          </div>

          <div style={s.chartsGrid}>

            {/* PIE — Stock by Category */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <div>
                  <div style={s.cardTitle}>Stock by Category</div>
                  <div style={{ fontSize: "10px", color: "#9C8572", marginTop: "2px" }}>Distribution across all warehouses</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", margin: "12px 0 16px" }}>
                <svg width="150" height="150" viewBox="0 0 150 150">
                  <circle cx="75" cy="75" r="60" fill="#F5EFE6"/>
                  <circle cx="75" cy="75" r="46" fill="none" stroke="#C17F3E" strokeWidth="26" strokeDasharray="101.1 187.8" strokeDashoffset="0" transform="rotate(-90 75 75)"/>
                  <circle cx="75" cy="75" r="46" fill="none" stroke="#9C6B3C" strokeWidth="26" strokeDasharray="80.8 208.1" strokeDashoffset="-101.1" transform="rotate(-90 75 75)"/>
                  <circle cx="75" cy="75" r="46" fill="none" stroke="#E8D5BB" strokeWidth="26" strokeDasharray="57.7 231.2" strokeDashoffset="-181.9" transform="rotate(-90 75 75)"/>
                  <circle cx="75" cy="75" r="46" fill="none" stroke="#6B4226" strokeWidth="26" strokeDasharray="49.1 239.8" strokeDashoffset="-239.6" transform="rotate(-90 75 75)"/>
                  <circle cx="75" cy="75" r="30" fill="#FDF8F2"/>
                  <text x="75" y="71" textAnchor="middle" fontSize="16" fontWeight="800" fill="#3D2B1F" fontFamily="Georgia">1,248</text>
                  <text x="75" y="84" textAnchor="middle" fontSize="9" fill="#9C8572" fontFamily="Georgia">products</text>
                </svg>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { c: "#C17F3E", l: "Raw Materials",  p: "35%" },
                  { c: "#9C6B3C", l: "Finished Goods", p: "28%" },
                  { c: "#E8D5BB", l: "Packaging",      p: "20%", t: "#9C8572" },
                  { c: "#6B4226", l: "Equipment",      p: "17%" },
                ].map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: d.c, flexShrink: 0, border: d.c === "#E8D5BB" ? "1px solid #C4A882" : "none" }} />
                    <span style={{ fontSize: "12px", color: "#3D2B1F", flex: 1 }}>{d.l}</span>
                    <span style={{ fontSize: "12px", fontWeight: "700", color: d.t || d.c }}>{d.p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BAR — Monthly Movement */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <div>
                  <div style={s.cardTitle}>Monthly Movement</div>
                  <div style={{ fontSize: "10px", color: "#9C8572", marginTop: "2px" }}>Receipts vs Deliveries — last 6 months</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "130px", padding: "12px 4px 0", marginBottom: "12px" }}>
                {months.map((m, i) => (
                  <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", height: "100%" }}>
                    <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "3px", width: "100%" }}>
                      <div style={{ flex: 1, background: "#C17F3E", borderRadius: "4px 4px 0 0", height: `${receipts[i]}%`, transition: "height 0.3s" }} />
                      <div style={{ flex: 1, background: "#EDE0CE", border: "1px solid #E8D5BB", borderRadius: "4px 4px 0 0", height: `${deliveries[i]}%`, transition: "height 0.3s" }} />
                    </div>
                    <span style={{ fontSize: "9px", color: "#9C8572" }}>{m}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "10px", height: "10px", background: "#C17F3E", borderRadius: "2px" }} />
                  <span style={{ fontSize: "11px", color: "#6B4226", fontWeight: "600" }}>Receipts</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "10px", height: "10px", background: "#EDE0CE", border: "1px solid #E8D5BB", borderRadius: "2px" }} />
                  <span style={{ fontSize: "11px", color: "#6B4226", fontWeight: "600" }}>Deliveries</span>
                </div>
              </div>
            </div>

            {/* DONUT — Stock Health */}
            <div style={s.card}>
              <div style={s.cardHeader}>
                <div>
                  <div style={s.cardTitle}>Stock Health</div>
                  <div style={{ fontSize: "10px", color: "#9C8572", marginTop: "2px" }}>Overall inventory status overview</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", margin: "12px 0 16px" }}>
                <svg width="150" height="150" viewBox="0 0 150 150">
                  <circle cx="75" cy="75" r="60" fill="#F5EFE6"/>
                  <circle cx="75" cy="75" r="46" fill="none" stroke="#7A9E7E" strokeWidth="26" strokeDasharray="207.8 81" strokeDashoffset="0" transform="rotate(-90 75 75)"/>
                  <circle cx="75" cy="75" r="46" fill="none" stroke="#C9973A" strokeWidth="26" strokeDasharray="51.9 236.9" strokeDashoffset="-207.8" transform="rotate(-90 75 75)"/>
                  <circle cx="75" cy="75" r="46" fill="none" stroke="#B85C4A" strokeWidth="26" strokeDasharray="28.9 259.9" strokeDashoffset="-259.7" transform="rotate(-90 75 75)"/>
                  <circle cx="75" cy="75" r="30" fill="#FDF8F2"/>
                  <text x="75" y="71" textAnchor="middle" fontSize="18" fontWeight="800" fill="#3D2B1F" fontFamily="Georgia">72%</text>
                  <text x="75" y="84" textAnchor="middle" fontSize="9" fill="#7A9E7E" fontFamily="Georgia">Healthy</text>
                </svg>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { c: "#7A9E7E", l: "In Stock",     n: "899 items",  p: "72%" },
                  { c: "#C9973A", l: "Low Stock",    n: "225 items",  p: "18%" },
                  { c: "#B85C4A", l: "Out of Stock", n: "124 items",  p: "10%" },
                ].map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: d.c, flexShrink: 0 }} />
                    <span style={{ fontSize: "12px", color: "#3D2B1F", flex: 1 }}>{d.l}</span>
                    <span style={{ fontSize: "10px", color: "#9C8572" }}>{d.n}</span>
                    <span style={{ fontSize: "12px", fontWeight: "700", color: d.c, marginLeft: "6px" }}>{d.p}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

const s = {
  topBar: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" },
  greeting: { fontSize: "22px", fontWeight: "800", color: "#3D2B1F", margin: "0 0 3px", letterSpacing: "-0.5px" },
  date: { fontSize: "12px", color: "#9C8572", margin: 0 },
  searchBox: { display: "flex", alignItems: "center", gap: "8px", background: "#FDF8F2", border: "1px solid #E8D5BB", borderRadius: "10px", padding: "8px 14px" },
  searchInput: { background: "transparent", border: "none", outline: "none", fontSize: "12px", color: "#3D2B1F", fontFamily: "inherit", width: "160px" },
  bellWrap: { width: "36px", height: "36px", background: "#FDF8F2", border: "1px solid #E8D5BB", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" },
  bellDot: { position: "absolute", top: "6px", right: "6px", width: "7px", height: "7px", background: "#B85C4A", borderRadius: "50%", border: "1.5px solid #FDF8F2" },
  kpiGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "20px" },
  kpiCard: { background: "#FDF8F2", border: "1px solid #E8D5BB", borderRadius: "14px", padding: "18px 16px" },
  kpiTop: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" },
  kpiLabel: { fontSize: "11px", fontWeight: "700", color: "#9C8572", textTransform: "uppercase", letterSpacing: "0.5px" },
  kpiIconBox: { width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" },
  kpiVal: { fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px" },
  midGrid: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "16px" },
  card: { background: "#FDF8F2", border: "1px solid #E8D5BB", borderRadius: "14px", padding: "18px 20px" },
  cardHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" },
  cardTitle: { fontSize: "14px", fontWeight: "700", color: "#3D2B1F" },
  viewAll: { fontSize: "11px", color: "#C17F3E", fontWeight: "600", cursor: "pointer" },
  chartsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" },
};