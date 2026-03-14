'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

const SAMPLE = [
  { id: 'TRF-0021', product: 'Wireless Headphones', from: 'Warehouse A', to: 'Warehouse B', qty: 50,  date: '2025-01-13', status: 'Completed'  },
  { id: 'TRF-0020', product: 'Office Chair Pro',    from: 'Main Store',  to: 'Warehouse A', qty: 10,  date: '2025-01-12', status: 'In Transit' },
  { id: 'TRF-0019', product: 'USB-C Cable 2m',      from: 'Warehouse B', to: 'Main Store',  qty: 200, date: '2025-01-11', status: 'Completed'  },
  { id: 'TRF-0018', product: 'Standing Desk',       from: 'Warehouse A', to: 'Main Store',  qty: 5,   date: '2025-01-10', status: 'Pending'    },
  { id: 'TRF-0017', product: 'Monitor 27 inch',     from: 'Main Store',  to: 'Warehouse B', qty: 8,   date: '2025-01-09', status: 'Completed'  },
  { id: 'TRF-0016', product: 'Desk Lamp LED',       from: 'Warehouse C', to: 'Main Store',  qty: 60,  date: '2025-01-08', status: 'In Transit' },
  { id: 'TRF-0015', product: 'Mechanical Keyboard', from: 'Main Store',  to: 'Warehouse C', qty: 25,  date: '2025-01-07', status: 'Completed'  },
];

const LOCATIONS = ['Main Store', 'Warehouse A', 'Warehouse B', 'Warehouse C'];
const STATUSES  = ['All Status', 'Pending', 'In Transit', 'Completed'];

export default function InternalTransferPage() {
  const [transfers, setTransfers]       = useState(SAMPLE);
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showModal, setShowModal]       = useState(false);
  const [form, setForm] = useState({
    product: '', from: 'Main Store', to: 'Warehouse A', qty: '', date: '', note: '',
  });

  // ── Stats ──
  const total      = transfers.length;
  const completed  = transfers.filter(t => t.status === 'Completed').length;
  const inTransit  = transfers.filter(t => t.status === 'In Transit').length;
  const pending    = transfers.filter(t => t.status === 'Pending').length;

  // ── Filter ──
  const filtered = transfers.filter(t => {
    const matchSearch = t.product.toLowerCase().includes(search.toLowerCase()) ||
                        t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All Status' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // ── Submit ──
  const handleSubmit = () => {
    if (!form.product || !form.qty || !form.date) return;
    if (form.from === form.to) {
      alert('From and To locations cannot be the same.');
      return;
    }
    const newId = `TRF-${String(transfers.length + 1).padStart(4, '0')}`;
    setTransfers(prev => [{
      id: newId,
      ...form,
      qty: parseInt(form.qty),
      status: 'Pending',
    }, ...prev]);
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ product: '', from: 'Main Store', to: 'Warehouse A', qty: '', date: '', note: '' });
  };

  // ── Delete ──
  const handleDelete = (id) => {
    if (confirm('Delete this transfer?')) setTransfers(prev => prev.filter(t => t.id !== id));
  };

  // ── Badge style ──
  const badgeStyle = (s) => ({
    Completed:    { background: '#7A9E7E22', color: '#7A9E7E' },
    'In Transit': { background: '#7A94A822', color: '#7A94A8' },
    Pending:      { background: '#C9973A22', color: '#C9973A' },
  }[s] || {});

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5EFE6' }}>
      <Navbar />
      <div style={{ marginLeft: '220px', flex: 1 }}>

        {/* Topbar */}
        <div style={{ background: '#FDF8F2', borderBottom: '1px solid #E8D5BB', padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#3D2B1F' }}>Internal Transfer</h1>
            <p style={{ fontSize: '12px', color: '#9C8572', marginTop: '2px' }}>Move stock between warehouse locations</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{ background: '#C17F3E', color: '#FDF8F2', border: 'none', borderRadius: '9px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            + New Transfer
          </button>
        </div>

        <div style={{ padding: '24px 28px' }}>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '24px' }}>
            {[
              { label: 'Total Transfers', val: total,     tag: 'All time',          tagColor: '#9C8572' },
              { label: 'Completed',       val: completed, tag: `${((completed/total)*100).toFixed(1)}% success`, tagColor: '#7A9E7E' },
              { label: 'In Transit',      val: inTransit, tag: 'Currently moving',  tagColor: '#7A94A8' },
              { label: 'Pending',         val: pending,   tag: 'Awaiting dispatch', tagColor: '#C9973A' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '12px', padding: '18px 20px' }}>
                <div style={{ fontSize: '11px', color: '#9C8572', fontWeight: 500, marginBottom: '6px' }}>{s.label}</div>
                <div style={{ fontSize: '26px', fontWeight: 700, color: '#3D2B1F' }}>{s.val}</div>
                <div style={{ fontSize: '11px', color: s.tagColor, marginTop: '4px' }}>{s.tag}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#C4A882' }}>🔍</span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search transfer ID or product..."
                style={{ width: '100%', padding: '10px 14px 10px 36px', background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '13px', color: '#3D2B1F' }}
              />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              style={{ padding: '10px 14px', background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '13px', color: '#3D2B1F' }}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Table */}
          <div style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F5EFE6' }}>
                  {['Transfer ID', 'Product', 'From', 'To', 'Qty', 'Date', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9C8572', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #E8D5BB' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: '#9C8572' }}>No transfers found</td></tr>
                ) : filtered.map((t, i) => (
                  <tr key={t.id} style={{ borderBottom: i < filtered.length - 1 ? '0.5px solid #F0E4D0' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#C17F3E' }}>#{t.id}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#3D2B1F' }}>{t.product}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: '#C17F3E11', color: '#9C6B3C', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>{t.from}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: '#7A94A811', color: '#7A94A8', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>{t.to}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#3D2B1F' }}>{t.qty}</td>
                    <td style={{ padding: '12px 16px', color: '#9C8572' }}>{formatDate(t.date)}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ ...badgeStyle(t.status), padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>{t.status}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button
                        onClick={() => handleDelete(t.id)}
                        style={{ padding: '5px 12px', background: 'transparent', border: '1px solid #B85C4A33', borderRadius: '6px', fontSize: '12px', color: '#B85C4A', fontWeight: 500, cursor: 'pointer' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Count */}
          <div style={{ marginTop: '12px', fontSize: '12px', color: '#9C8572' }}>
            Showing {filtered.length} of {total} transfers
          </div>
        </div>
      </div>

      {/* ── ADD MODAL ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(61,43,31,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '460px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#3D2B1F', marginBottom: '24px' }}>New Internal Transfer</h2>

            {/* Product */}
            <div style={{ marginBottom: '14px' }}>
              <label style={lbl}>Product</label>
              <input
                value={form.product}
                onChange={e => setForm(p => ({ ...p, product: e.target.value }))}
                placeholder="e.g. Wireless Headphones"
                style={inp}
              />
            </div>

            {/* From + To */}
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

            {/* Qty + Date */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={lbl}>Quantity</label>
                <input
                  type="number"
                  value={form.qty}
                  onChange={e => setForm(p => ({ ...p, qty: e.target.value }))}
                  placeholder="e.g. 50"
                  style={inp}
                />
              </div>
              <div>
                <label style={lbl}>Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                  style={inp}
                />
              </div>
            </div>

            {/* Note */}
            <div style={{ marginBottom: '26px' }}>
              <label style={lbl}>Note (optional)</label>
              <input
                value={form.note}
                onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
                placeholder="Reason for transfer..."
                style={inp}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={closeModal}
                style={{ flex: 1, padding: '11px', background: 'transparent', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '14px', color: '#9C8572', fontWeight: 500, cursor: 'pointer' }}>
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                style={{ flex: 1, padding: '11px', background: '#C17F3E', color: '#FDF8F2', border: 'none', borderRadius: '9px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                Create Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const lbl = { fontSize: '12px', fontWeight: 500, color: '#7a5535', display: 'block', marginBottom: '6px' };
const inp = { width: '100%', padding: '10px 14px', background: '#fdf4e8', border: '0.5px solid #d4a96a', borderRadius: '8px', fontSize: '13px', color: '#2c1200', fontFamily: 'inherit', boxSizing: 'border-box' };