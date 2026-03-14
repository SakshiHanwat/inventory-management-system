'use client';
import { useState } from 'react';
import Link from 'next/link';

const SAMPLE = [
  { id: 'ADJ-0015', product: 'Wireless Headphones', type: 'Add',    qty: 20,  reason: 'Stock count correction', date: '2025-01-13', by: 'Arjun J.' },
  { id: 'ADJ-0014', product: 'USB-C Cable 2m',      type: 'Remove', qty: 15,  reason: 'Damaged goods',          date: '2025-01-12', by: 'Priya S.' },
  { id: 'ADJ-0013', product: 'Office Chair Pro',    type: 'Add',    qty: 5,   reason: 'Found in storeroom',     date: '2025-01-11', by: 'Arjun J.' },
  { id: 'ADJ-0012', product: 'Monitor 27 inch',     type: 'Remove', qty: 2,   reason: 'Expired / Defective',    date: '2025-01-10', by: 'Rahul K.' },
  { id: 'ADJ-0011', product: 'Desk Lamp LED',       type: 'Add',    qty: 30,  reason: 'Supplier bonus stock',   date: '2025-01-09', by: 'Priya S.' },
];

const REASONS = ['Stock count correction', 'Damaged goods', 'Found in storeroom', 'Expired / Defective', 'Supplier bonus stock', 'Other'];

export default function StockAdjustmentsPage() {
  const [adjustments, setAdjustments] = useState(SAMPLE);
  const [search, setSearch]           = useState('');
  const [showModal, setShowModal]     = useState(false);
  const [form, setForm] = useState({ product: '', type: 'Add', qty: '', reason: 'Stock count correction', date: '', note: '' });

  const filtered = adjustments.filter(a =>
    a.product.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!form.product || !form.qty || !form.date) return;
    const newId = `ADJ-${String(adjustments.length + 1).padStart(4, '0')}`;
    setAdjustments(prev => [{ id: newId, ...form, qty: parseInt(form.qty), by: 'Arjun J.' }, ...prev]);
    setShowModal(false);
    setForm({ product: '', type: 'Add', qty: '', reason: 'Stock count correction', date: '', note: '' });
  };

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
              <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#3D2B1F' }}>Stock Adjustments</h1>
              <p style={{ fontSize: '12px', color: '#9C8572', marginTop: '2px' }}>Fix inventory discrepancies</p>
            </div>
          </div>
          <button onClick={() => setShowModal(true)} style={{ background: '#C17F3E', color: '#FDF8F2', border: 'none', borderRadius: '9px', padding: '10px 20px', fontSize: '13px', fontWeight: 600 }}>
            + New Adjustment
          </button>
        </div>

        <div style={{ padding: '24px 28px' }}>
          <div style={{ position: 'relative', marginBottom: '16px', maxWidth: '400px' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#C4A882' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search adjustment ID or product..."
              style={{ width: '100%', padding: '10px 14px 10px 36px', background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '13px', color: '#3D2B1F' }} />
          </div>

          <div style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F5EFE6' }}>
                  {['Adj. ID', 'Product', 'Type', 'Qty', 'Reason', 'Date', 'By'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9C8572', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #E8D5BB' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <tr key={a.id} style={{ borderBottom: i < filtered.length - 1 ? '0.5px solid #F0E4D0' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#C17F3E' }}>#{a.id}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#3D2B1F' }}>{a.product}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: a.type === 'Add' ? '#7A9E7E22' : '#B85C4A22', color: a.type === 'Add' ? '#7A9E7E' : '#B85C4A', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>
                        {a.type === 'Add' ? '+ Add' : '− Remove'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: a.type === 'Add' ? '#7A9E7E' : '#B85C4A' }}>
                      {a.type === 'Add' ? '+' : '-'}{a.qty}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#9C8572' }}>{a.reason}</td>
                    <td style={{ padding: '12px 16px', color: '#9C8572' }}>{formatDate(a.date)}</td>
                    <td style={{ padding: '12px 16px', color: '#9C8572' }}>{a.by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(61,43,31,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '460px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#3D2B1F', marginBottom: '24px' }}>New Stock Adjustment</h2>

            <div style={{ marginBottom: '14px' }}>
              <label style={lbl}>Product</label>
              <input value={form.product} onChange={e => setForm(p => ({ ...p, product: e.target.value }))} placeholder="e.g. Wireless Headphones" style={inp} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={lbl}>Type</label>
                <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} style={inp}>
                  <option>Add</option>
                  <option>Remove</option>
                </select>
              </div>
              <div>
                <label style={lbl}>Quantity</label>
                <input type="number" value={form.qty} onChange={e => setForm(p => ({ ...p, qty: e.target.value }))} placeholder="e.g. 20" style={inp} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={lbl}>Reason</label>
                <select value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} style={inp}>
                  {REASONS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Date</label>
                <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} style={inp} />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={lbl}>Note (optional)</label>
              <input value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} placeholder="Additional details..." style={inp} />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '11px', background: 'transparent', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '14px', color: '#9C8572', fontWeight: 500 }}>Cancel</button>
              <button onClick={handleSubmit} style={{ flex: 1, padding: '11px', background: '#C17F3E', color: '#FDF8F2', border: 'none', borderRadius: '9px', fontSize: '14px', fontWeight: 600 }}>Save Adjustment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}