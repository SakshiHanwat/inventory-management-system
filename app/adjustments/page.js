'use client';
import Link from 'next/link';

const CARDS = [
  {
    href:  '/adjustments/internal-transfer',
    title: 'Internal Transfer',
    desc:  'Move stock between warehouses or storage locations. Every transfer is tracked and logged.',
    meta:  '48 transfers this month',
    iconColor: '#C17F3E',
    iconBg:    '#C17F3E15',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C17F3E" strokeWidth="1.8" strokeLinecap="round">
        <path d="M8 7l4-4 4 4M16 17l-4 4-4-4M12 3v18"/>
      </svg>
    ),
  },
  {
    href:  '/adjustments/stock-adjustments',
    title: 'Stock Adjustments',
    desc:  'Fix inventory discrepancies manually. Add or remove units with reason and full audit trail.',
    meta:  '23 adjustments this month',
    iconColor: '#7A9E7E',
    iconBg:    '#7A9E7E15',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A9E7E" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    href:  '/adjustments/move-history',
    title: 'Move History',
    desc:  'View complete audit log of all stock movements, transfers and adjustments over time.',
    meta:  '1,284 total entries',
    iconColor: '#7A94A8',
    iconBg:    '#7A94A815',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A94A8" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
];

export default function AdjustmentsPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5EFE6' }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ width: '220px', background: '#EDE0CE', borderRight: '1px solid #E8D5BB', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 50 }}>
        <div style={{ padding: '18px 16px', borderBottom: '1px solid #E8D5BB', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 34, height: 34, background: '#C17F3E', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="7" height="7" rx="2" fill="white"/>
              <rect x="11" y="2" width="7" height="7" rx="2" fill="white" opacity=".6"/>
              <rect x="2" y="11" width="7" height="7" rx="2" fill="white" opacity=".6"/>
              <rect x="11" y="11" width="7" height="7" rx="2" fill="white"/>
            </svg>
          </div>
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#3D2B1F' }}>CoreInventory</span>
        </div>
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          <NavLabel text="Main" />
          <NavItem label="Dashboard"   href="/dashboard"   active={false} />
          <NavItem label="Products"    href="/products"    active={false} />
          <NavItem label="Receipts"    href="/receipts"    active={false} />
          <NavItem label="Deliveries"  href="/deliveries"  active={false} />
          <NavLabel text="Adjustments" />
          <NavItem label="Adjustments" href="/adjustments" active={true}  />
          <NavLabel text="Account" />
          <NavItem label="Settings"    href="/settings"    active={false} />
        </nav>
        <div style={{ padding: '14px 16px', borderTop: '1px solid #E8D5BB', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#C17F3E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#FDF8F2' }}>AJ</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#3D2B1F' }}>Arjun J.</div>
            <div style={{ fontSize: '11px', color: '#9C8572' }}>Admin</div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ marginLeft: '220px', flex: 1 }}>

        {/* Topbar */}
        <div style={{ background: '#FDF8F2', borderBottom: '1px solid #E8D5BB', padding: '16px 28px', position: 'sticky', top: 0, zIndex: 40 }}>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#3D2B1F' }}>Adjustments</h1>
          <p style={{ fontSize: '12px', color: '#9C8572', marginTop: '2px' }}>Manage stock movements and corrections</p>
        </div>

        <div style={{ padding: '24px 28px' }}>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '28px' }}>
            {[
              { label: 'Transfers This Month', val: '48',   tag: '↑ 6 this week', tagColor: '#C17F3E' },
              { label: 'Stock Adjustments',    val: '23',   tag: '↑ 3 today',     tagColor: '#7A9E7E' },
              { label: 'Total Move Logs',      val: '1,284',tag: 'All time',       tagColor: '#7A94A8' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '12px', padding: '18px 20px' }}>
                <div style={{ fontSize: '11px', color: '#9C8572', fontWeight: 500, marginBottom: '6px' }}>{s.label}</div>
                <div style={{ fontSize: '26px', fontWeight: 700, color: '#3D2B1F' }}>{s.val}</div>
                <div style={{ fontSize: '11px', color: s.tagColor, marginTop: '4px' }}>{s.tag}</div>
              </div>
            ))}
          </div>

          {/* Section label */}
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#9C8572', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
            Select an action
          </div>

          {/* 3 Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {CARDS.map((card) => (
              <Link key={card.href} href={card.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#FDF8F2', border: '1px solid #E8D5BB',
                  borderRadius: '14px', padding: '22px 24px',
                  display: 'flex', alignItems: 'center', gap: '20px',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C17F3E'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(193,127,62,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8D5BB'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {/* Icon */}
                  <div style={{ width: 52, height: 52, borderRadius: '13px', background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {card.icon}
                  </div>

                  {/* Body */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#3D2B1F', marginBottom: '5px' }}>{card.title}</div>
                    <div style={{ fontSize: '13px', color: '#9C8572', lineHeight: '1.5' }}>{card.desc}</div>
                    <div style={{ fontSize: '11px', color: '#C4A882', marginTop: '7px' }}>{card.meta}</div>
                  </div>

                  {/* Arrow */}
                  <div style={{ fontSize: '20px', color: '#C17F3E', fontWeight: 700, flexShrink: 0 }}>→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLabel({ text }) {
  return <div style={{ fontSize: '10px', fontWeight: 600, color: '#C4A882', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '10px 8px 4px' }}>{text}</div>;
}
function NavItem({ label, href, active }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '8px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: active ? 600 : 400, color: active ? '#FDF8F2' : '#9C8572', background: active ? '#C17F3E' : 'transparent', marginBottom: '2px' }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: active ? '#FDF8F2' : '#C4A882', flexShrink: 0 }} />
        {label}
      </div>
    </Link>
  );
}