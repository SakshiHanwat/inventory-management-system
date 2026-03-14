'use client';
import { useState } from 'react';
import Link from 'next/link';

const SAMPLE_RECEIPTS = [
  { id: 'REC-0091', vendor: 'TechSupply Co.', city: 'Delhi',     product: 'Wireless Headphones', qty: 200, date: '2025-01-13', status: 'Received' },
  { id: 'REC-0090', vendor: 'FurniMart Ltd.', city: 'Mumbai',    product: 'Office Chair Pro',    qty: 50,  date: '2025-01-12', status: 'Pending'  },
  { id: 'REC-0089', vendor: 'AccessHub',      city: 'Pune',      product: 'USB-C Cable 2m',      qty: 500, date: '2025-01-11', status: 'Received' },
  { id: 'REC-0088', vendor: 'DeskWorld',      city: 'Bangalore', product: 'Standing Desk',       qty: 30,  date: '2025-01-10', status: 'Rejected' },
  { id: 'REC-0087', vendor: 'TechSupply Co.', city: 'Delhi',     product: 'Mechanical Keyboard', qty: 100, date: '2025-01-09', status: 'Received' },
  { id: 'REC-0086', vendor: 'ViewTech',       city: 'Chennai',   product: 'Monitor 27 inch',     qty: 40,  date: '2025-01-08', status: 'Pending'  },
  { id: 'REC-0085', vendor: 'AccessHub',      city: 'Pune',      product: 'Laptop Stand',        qty: 150, date: '2025-01-07', status: 'Received' },
  { id: 'REC-0084', vendor: 'LightCo',        city: 'Jaipur',    product: 'Desk Lamp LED',       qty: 300, date: '2025-01-06', status: 'Received' },
];

const STATUSES = ['All Status', 'Pending', 'Received', 'Rejected'];
const VENDORS  = ['All Vendors', 'TechSupply Co.', 'FurniMart Ltd.', 'AccessHub', 'DeskWorld', 'ViewTech', 'LightCo'];

export default function ReceiptsPage() {
  const [receipts, setReceipts]         = useState(SAMPLE_RECEIPTS);
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [vendorFilter, setVendorFilter] = useState('All Vendors');
  const [showModal, setShowModal]       = useState(false);
  const [viewReceipt, setViewReceipt]   = useState(null);
  const [editReceipt, setEditReceipt]   = useState(null);
  const [form, setForm] = useState({
    vendor: '', city: '', product: '', qty: '', date: '', status: 'Pending',
  });

  // ── Stats ──
  const total    = receipts.length;
  const received = receipts.filter(r => r.status === 'Received').length;
  const pending  = receipts.filter(r => r.status === 'Pending').length;
  const totalQty = receipts.filter(r => r.status === 'Received').reduce((sum, r) => sum + r.qty, 0);

  // ── Filter ──
  const filtered = receipts.filter(r => {
    const matchSearch = r.vendor.toLowerCase().includes(search.toLowerCase()) ||
                        r.id.toLowerCase().includes(search.toLowerCase()) ||
                        r.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All Status' || r.status === statusFilter;
    const matchVendor = vendorFilter === 'All Vendors' || r.vendor === vendorFilter;
    return matchSearch && matchStatus && matchVendor;
  });

  // ── Submit ──
  const handleSubmit = () => {
    if (!form.vendor || !form.product || !form.qty || !form.date) return;
    if (editReceipt) {
      setReceipts(prev => prev.map(r =>
        r.id === editReceipt.id ? { ...r, ...form, qty: parseInt(form.qty) } : r
      ));
    } else {
      const newId = `REC-${String(receipts.length + 1).padStart(4, '0')}`;
      setReceipts(prev => [{ id: newId, ...form, qty: parseInt(form.qty) }, ...prev]);
    }
    closeModal();
  };

  // ── Delete ──
  const handleDelete = (id) => {
    if (confirm('Delete this receipt?')) setReceipts(prev => prev.filter(r => r.id !== id));
  };

  // ── Open edit ──
  const openEdit = (r) => {
    setEditReceipt(r);
    setForm({ vendor: r.vendor, city: r.city, product: r.product, qty: r.qty, date: r.date, status: r.status });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditReceipt(null);
    setViewReceipt(null);
    setForm({ vendor: '', city: '', product: '', qty: '', date: '', status: 'Pending' });
  };

  // ── Badge style ──
  const badgeStyle = (status) => {
    const map = {
      Received: { background: '#7A9E7E22', color: '#7A9E7E' },
      Pending:  { background: '#C9973A22', color: '#C9973A' },
      Rejected: { background: '#B85C4A22', color: '#B85C4A' },
    };
    return map[status] || {};
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

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
          <NavItem label="Dashboard"  href="/dashboard"  active={false} />
          <NavItem label="Products"   href="/products"   active={false} />
          <NavItem label="Receipts"   href="/receipts"   active={true}  />
          <NavItem label="Deliveries" href="/deliveries" active={false} />
          <NavLabel text="Adjustments" />
          <NavItem label="Internal Transfer" href="/adjustments/internal-transfer" active={false} />
          <NavItem label="Stock Adjustments" href="/adjustments/stock-adjustments" active={false} />
          <NavItem label="Move History"      href="/adjustments/move-history"      active={false} />
          <NavLabel text="Account" />
          <NavItem label="Settings" href="/settings" active={false} />
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
      <div style={{ marginLeft: '220px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Topbar */}
        <div style={{ background: '#FDF8F2', borderBottom: '1px solid #E8D5BB', padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#3D2B1F' }}>Receipts</h1>
            <p style={{ fontSize: '12px', color: '#9C8572', marginTop: '2px' }}>Track incoming stock from vendors</p>
          </div>
          <button onClick={() => setShowModal(true)} style={{ background: '#C17F3E', color: '#FDF8F2', border: 'none', borderRadius: '9px', padding: '10px 20px', fontSize: '13px', fontWeight: 600 }}>
            + New Receipt
          </button>
        </div>

        <div style={{ padding: '24px 28px' }}>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
            {[
              { label: 'Total Receipts', val: total,                        tag: '↑ 22 this week',                              tagColor: '#7A9E7E' },
              { label: 'Received',       val: received,                     tag: `${((received/total)*100).toFixed(1)}% completed`, tagColor: '#7A9E7E' },
              { label: 'Pending',        val: pending,                      tag: 'Awaiting arrival',                            tagColor: '#C9973A' },
              { label: 'Total Stock In', val: totalQty.toLocaleString(),    tag: 'Units received',                              tagColor: '#7A94A8' },
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
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#C4A882', fontSize: '14px' }}>🔍</span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search receipt ID, vendor, product..."
                style={{ width: '100%', padding: '10px 14px 10px 36px', background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '13px', color: '#3D2B1F' }}
              />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              style={{ padding: '10px 14px', background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '13px', color: '#3D2B1F' }}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={vendorFilter} onChange={e => setVendorFilter(e.target.value)}
              style={{ padding: '10px 14px', background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '13px', color: '#3D2B1F' }}>
              {VENDORS.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>

          {/* Table */}
          <div style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F5EFE6' }}>
                  {['Receipt ID', 'Vendor', 'Product', 'Qty', 'Date', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9C8572', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #E8D5BB' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#9C8572' }}>No receipts found</td></tr>
                ) : filtered.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: i < filtered.length - 1 ? '0.5px solid #F0E4D0' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#C17F3E' }}>#{r.id}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#3D2B1F' }}>{r.vendor}</div>
                      <div style={{ fontSize: '11px', color: '#C4A882', marginTop: '2px' }}>{r.city}</div>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#9C8572' }}>{r.product}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#3D2B1F' }}>{r.qty}</td>
                    <td style={{ padding: '12px 16px', color: '#9C8572' }}>{formatDate(r.date)}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ ...badgeStyle(r.status), padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>{r.status}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => setViewReceipt(r)} style={{ padding: '5px 12px', background: 'transparent', border: '1px solid #E8D5BB', borderRadius: '6px', fontSize: '12px', color: '#9C6B3C', fontWeight: 500 }}>View</button>
                        <button onClick={() => openEdit(r)} style={{ padding: '5px 12px', background: 'transparent', border: '1px solid #E8D5BB', borderRadius: '6px', fontSize: '12px', color: '#9C6B3C', fontWeight: 500 }}>Edit</button>
                        <button onClick={() => handleDelete(r.id)} style={{ padding: '5px 12px', background: 'transparent', border: '1px solid #B85C4A33', borderRadius: '6px', fontSize: '12px', color: '#B85C4A', fontWeight: 500 }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Count */}
          <div style={{ marginTop: '12px', fontSize: '12px', color: '#9C8572' }}>
            Showing {filtered.length} of {total} receipts
          </div>
        </div>
      </div>

      {/* ── ADD / EDIT MODAL ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(61,43,31,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '460px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#3D2B1F', marginBottom: '24px' }}>
              {editReceipt ? 'Edit Receipt' : 'New Receipt'}
            </h2>

            {/* Row 1 — Vendor + City */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              {[
                { label: 'Vendor Name', key: 'vendor', placeholder: 'e.g. TechSupply Co.' },
                { label: 'City',        key: 'city',   placeholder: 'e.g. Delhi' },
              ].map(f => (
                <div key={f.key}>
                  <label style={labelStyle}>{f.label}</label>
                  <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder} style={inputStyle} />
                </div>
              ))}
            </div>

            {/* Product */}
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Product</label>
              <input value={form.product} onChange={e => setForm(p => ({ ...p, product: e.target.value }))}
                placeholder="e.g. Wireless Headphones" style={inputStyle} />
            </div>

            {/* Row 2 — Qty + Date */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={labelStyle}>Quantity</label>
                <input type="number" value={form.qty} onChange={e => setForm(p => ({ ...p, qty: e.target.value }))}
                  placeholder="e.g. 200" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Receipt Date</label>
                <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                  style={inputStyle} />
              </div>
            </div>

            {/* Status */}
            <div style={{ marginBottom: '26px' }}>
              <label style={labelStyle}>Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} style={inputStyle}>
                {['Pending', 'Received', 'Rejected'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={closeModal} style={{ flex: 1, padding: '11px', background: 'transparent', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '14px', color: '#9C8572', fontWeight: 500 }}>Cancel</button>
              <button onClick={handleSubmit} style={{ flex: 1, padding: '11px', background: '#C17F3E', color: '#FDF8F2', border: 'none', borderRadius: '9px', fontSize: '14px', fontWeight: 600 }}>
                {editReceipt ? 'Save Changes' : 'Create Receipt'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── VIEW MODAL ── */}
      {viewReceipt && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(61,43,31,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '420px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#3D2B1F' }}>Receipt Details</h2>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#C17F3E' }}>#{viewReceipt.id}</span>
            </div>
            {[
              { label: 'Vendor',   val: viewReceipt.vendor  },
              { label: 'City',     val: viewReceipt.city    },
              { label: 'Product',  val: viewReceipt.product },
              { label: 'Quantity', val: viewReceipt.qty     },
              { label: 'Date',     val: formatDate(viewReceipt.date) },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '0.5px solid #F0E4D0' }}>
                <span style={{ fontSize: '13px', color: '#9C8572' }}>{row.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#3D2B1F' }}>{row.val}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', marginBottom: '24px' }}>
              <span style={{ fontSize: '13px', color: '#9C8572' }}>Status</span>
              <span style={{ ...badgeStyle(viewReceipt.status), padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>{viewReceipt.status}</span>
            </div>
            <button onClick={closeModal} style={{ width: '100%', padding: '11px', background: '#C17F3E', color: '#FDF8F2', border: 'none', borderRadius: '9px', fontSize: '14px', fontWeight: 600 }}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

// ── Sidebar helpers ──
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

// ── Shared styles ──
const labelStyle = { fontSize: '12px', fontWeight: 500, color: '#7a5535', display: 'block', marginBottom: '6px' };
const inputStyle = { width: '100%', padding: '10px 14px', background: '#fdf4e8', border: '0.5px solid #d4a96a', borderRadius: '8px', fontSize: '13px', color: '#2c1200', fontFamily: 'inherit', boxSizing: 'border-box' };