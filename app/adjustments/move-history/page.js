'use client';
import { useState } from 'react';
import Link from 'next/link';

const SAMPLE = [
  { id: 'LOG-0041', type: 'Transfer',   product: 'Wireless Headphones', detail: 'Warehouse A → Warehouse B', qty: 50,  date: '2025-01-13', by: 'Arjun J.' },
  { id: 'LOG-0040', type: 'Adjustment', product: 'USB-C Cable 2m',      detail: 'Stock count correction +20',  qty: 20,  date: '2025-01-12', by: 'Priya S.' },
  { id: 'LOG-0039', type: 'Delivery',   product: 'Office Chair Pro',    detail: 'Dispatched to Ravi Stores',   qty: 5,   date: '2025-01-11', by: 'Arjun J.' },
  { id: 'LOG-0038', type: 'Receipt',    product: 'Standing Desk',       detail: 'Received from DeskWorld',     qty: 30,  date: '2025-01-10', by: 'Rahul K.' },
  { id: 'LOG-0037', type: 'Adjustment', product: 'Monitor 27 inch',     detail: 'Damaged goods removed −2',    qty: 2,   date: '2025-01-09', by: 'Arjun J.' },
  { id: 'LOG-0036', type: 'Transfer',   product: 'Desk Lamp LED',       detail: 'Main Store → Warehouse A',    qty: 100, date: '2025-01-08', by: 'Priya S.' },
  { id: 'LOG-0035', type: 'Receipt',    product: 'Mechanical Keyboard', detail: 'Received from TechSupply',    qty: 100, date: '2025-01-07', by: 'Rahul K.' },
  { id: 'LOG-0034', type: 'Delivery',   product: 'Laptop Stand',        detail: 'Dispatched to Patel Stores',  qty: 10,  date: '2025-01-06', by: 'Arjun J.' },
];

const TYPE_COLORS = {
  Transfer:   { background: '#C17F3E15', color: '#C17F3E' },
  Adjustment: { background: '#7A9E7E22', color: '#7A9E7E' },
  Delivery:   { background: '#7A94A822', color: '#7A94A8' },
  Receipt:    { background: '#C9973A22', color: '#C9973A' },
};

export default function MoveHistoryPage() {
  const [search, setSearch]     = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const filtered = SAMPLE.filter(l => {
    const matchSearch = l.product.toLowerCase().includes(search.toLowerCase()) ||
                        l.id.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'All Types' || l.type === typeFilter;
    return matchSearch && matchType;
  });

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5EFE6' }}>
      <Sidebar active="adjustments" />
      <div style={{ marginLeft: '220px', flex: 1 }}>

        <div style={{ background: '#FDF8F2', borderBottom: '1px solid #E8D5BB', padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/adjustments" style={{ textDecoration: 'none', fontSize: '13px', color: '#C17F3E', fontWeight: 600 }}>← Back</Link>
            <div style={{ width: 1, height: 20, background: '#E8D5BB' }} />
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#3D2B1F' }}>Move History</h1>
              <p style={{ fontSize: '12px', color: '#9C8572', marginTop: '2px' }}>Complete audit log of all stock movements</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '24px 28px' }}>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#C4A882' }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search log ID or product..."
                style={{ width: '100%', padding: '10px 14px 10px 36px', background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '13px', color: '#3D2B1F' }} />
            </div>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
              style={{ padding: '10px 14px', background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '13px', color: '#3D2B1F' }}>
              {['All Types', 'Transfer', 'Adjustment', 'Delivery', 'Receipt'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Table */}
          <div style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F5EFE6' }}>
                  {['Log ID', 'Type', 'Product', 'Detail', 'Qty', 'Date', 'By'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9C8572', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #E8D5BB' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#9C8572' }}>No logs found</td></tr>
                ) : filtered.map((l, i) => (
                  <tr key={l.id} style={{ borderBottom: i < filtered.length - 1 ? '0.5px solid #F0E4D0' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#C17F3E' }}>#{l.id}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ ...TYPE_COLORS[l.type], padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>{l.type}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#3D2B1F' }}>{l.product}</td>
                    <td style={{ padding: '12px 16px', color: '#9C8572', fontSize: '12px' }}>{l.detail}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#3D2B1F' }}>{l.qty}</td>
                    <td style={{ padding: '12px 16px', color: '#9C8572' }}>{formatDate(l.date)}</td>
                    <td style={{ padding: '12px 16px', color: '#9C8572' }}>{l.by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '12px', fontSize: '12px', color: '#9C8572' }}>
            Showing {filtered.length} of {SAMPLE.length} logs
          </div>
        </div>
      </div>
    </div>
  );
}