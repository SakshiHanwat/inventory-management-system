'use client';
import { useState } from 'react';
import Link from 'next/link';

const SAMPLE = [
  { id: 'TRF-0021', product: 'Wireless Headphones', from: 'Warehouse A', to: 'Warehouse B', qty: 50,  date: '2025-01-13', status: 'Completed' },
  { id: 'TRF-0020', product: 'Office Chair Pro',    from: 'Main Store',  to: 'Warehouse A', qty: 10,  date: '2025-01-12', status: 'In Transit' },
  { id: 'TRF-0019', product: 'USB-C Cable 2m',      from: 'Warehouse B', to: 'Main Store',  qty: 200, date: '2025-01-11', status: 'Completed' },
  { id: 'TRF-0018', product: 'Standing Desk',       from: 'Warehouse A', to: 'Main Store',  qty: 5,   date: '2025-01-10', status: 'Pending'   },
  { id: 'TRF-0017', product: 'Monitor 27 inch',     from: 'Main Store',  to: 'Warehouse B', qty: 8,   date: '2025-01-09', status: 'Completed' },
];

const LOCATIONS = ['Main Store', 'Warehouse A', 'Warehouse B', 'Warehouse C'];

export default function InternalTransferPage() {
  const [transfers, setTransfers] = useState(SAMPLE);
  const [search, setSearch]       = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ product: '', from: 'Main Store', to: 'Warehouse A', qty: '', date: '', note: '' });

  const filtered = transfers.filter(t =>
    t.product.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!form.product || !form.qty || !form.date) return;
    if (form.from === form.to) { alert('From and To locations cannot be the same.'); return; }
    const newId = `TRF-${String(transfers.length + 1).padStart(4, '0')}`;
    setTransfers(prev => [{ id: newId, ...form, qty: parseInt(form.qty), status: 'Pending' }, ...prev]);
    setShowModal(false);
    setForm({ product: '', from: 'Main Store', to: 'Warehouse A', qty: '', date: '', note: '' });
  };

  const badgeStyle = (s) => ({
    Completed:  { background: '#7A9E7E22', color: '#7A9E7E' },
    'In Transit':{ background: '#7A94A822', color: '#7A94A8' },
    Pending:    { background: '#C9973A22', color: '#C9973A' },
  }[s] || {});

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5EFE6' }}>
      <Sidebar active="adjustments" />
      <div style={{ marginLeft: '220px', flex: 1 }}>

        {/* Topbar with back */}
        <div style={{ background: '#FDF8F2', borderBottom: '1px solid #E8D5BB', padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/adjustments" style={{ textDecoration: 'none', fontSize: '13px', color: '#C17F3E', fontWeight: 600 }}>← Back</Link>
            <div style={{ width: 1, height: 20, background: '#E8D5BB' }} />
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#3D2B1F' }}>Internal Transfer</h1>
              <p style={{ fontSize: '12px', color: '#9C8572', marginTop: '2px' }}>Move stock between locations</p>
            </div>
          </div>
          <button onClick={() => setShowModal(true)} style={{ background: '#C17F3E', color: '#FDF8F2', border: 'none', borderRadius: '9px', padding: '10px 20px', fontSize: '13px', fontWeight: 600 }}>
            + New Transfer
          </button>
        </div>

        <div style={{ padding: '24px 28px' }}>
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: '16px', maxWidth: '400px' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#C4A882' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transfer ID or product..."
              style={{ width: '100%', padding: '10px 14px 10px 36px', background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '13px', color: '#3D2B1F' }} />
          </div>

          {/* Table */}
          <div style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F5EFE6' }}>
                  {['Transfer ID', 'Product', 'From', 'To', 'Qty', 'Date', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9C8572', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #E8D5BB' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={t.id} style={{ borderBottom: i < filtered.length - 1 ? '0.5px solid #F0E4D0' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#C17F3E' }}>#{t.id}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#3D2B1F' }}>{t.product}</td>
                    <td style={{ padding: '12px 16px', color: '#9C8572' }}>{t.from}</td>
                    <td style={{ padding: '12px 16px', color: '#9C8572' }}>{t.to}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#3D2B1F' }}>{t.qty}</td>
                    <td style={{ padding: '12px 16px', color: '#9C8572' }}>{formatDate(t.date)}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ ...badgeStyle(t.status), padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(61,43,31,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '460px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#3D2B1F', marginBottom: '24px' }}>New Internal Transfer</h2>

            <div style={{ marginBottom: '14px' }}>
              <label style={lbl}>Product</label>
              <input value={form.product} onChange={e => setForm(p => ({ ...p, product: e.target.value }))} placeholder="e.g. Wireless Headphones" style={inp} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={lbl}>From Location</label>
                <select value={form.from} onChange={e => setForm(p => ({ ...p, from: e.target.value }))} style={inp}>
                  {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>To Location</label>
                <select value={form.to} onChange={e => setForm(p => ({ ...p, to: e.target.value }))} style={inp}>
                  {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={lbl}>Quantity</label>
                <input type="number" value={form.qty} onChange={e => setForm(p => ({ ...p, qty: e.target.value }))} placeholder="e.g. 50" style={inp} />
              </div>
              <div>
                <label style={lbl}>Date</label>
                <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} style={inp} />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={lbl}>Note (optional)</label>
              <input value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} placeholder="Reason for transfer..." style={inp} />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '11px', background: 'transparent', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '14px', color: '#9C8572', fontWeight: 500 }}>Cancel</button>
              <button onClick={handleSubmit} style={{ flex: 1, padding: '11px', background: '#C17F3E', color: '#FDF8F2', border: 'none', borderRadius: '9px', fontSize: '14px', fontWeight: 600 }}>Create Transfer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}