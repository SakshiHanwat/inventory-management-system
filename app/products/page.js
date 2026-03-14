'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', sku: 'WH-0124', category: 'Electronics', stock: 248, price: 2499, status: 'In Stock' },
  { id: 2, name: 'Office Chair Pro',    sku: 'OC-0891', category: 'Furniture',    stock: 8,   price: 12999, status: 'Low Stock' },
  { id: 3, name: 'USB-C Cable 2m',      sku: 'UC-0312', category: 'Accessories',  stock: 0,   price: 349,   status: 'Out of Stock' },
  { id: 4, name: 'Standing Desk',       sku: 'SD-0445', category: 'Furniture',    stock: 54,  price: 24999, status: 'In Stock' },
  { id: 5, name: 'Mechanical Keyboard', sku: 'MK-0567', category: 'Electronics',  stock: 12,  price: 4999,  status: 'Low Stock' },
  { id: 6, name: 'Monitor 27 inch',     sku: 'MN-0678', category: 'Electronics',  stock: 31,  price: 18999, status: 'In Stock' },
  { id: 7, name: 'Laptop Stand',        sku: 'LS-0789', category: 'Accessories',  stock: 0,   price: 1299,  status: 'Out of Stock' },
  { id: 8, name: 'Desk Lamp LED',       sku: 'DL-0890', category: 'Accessories',  stock: 76,  price: 899,   status: 'In Stock' },
];

const CATEGORIES = ['All Categories', 'Electronics', 'Furniture', 'Accessories'];
const STATUSES   = ['All Status', 'In Stock', 'Low Stock', 'Out of Stock'];

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts]       = useState(SAMPLE_PRODUCTS);
  const [search, setSearch]           = useState('');
  const [category, setCategory]       = useState('All Categories');
  const [status, setStatus]           = useState('All Status');
  const [showModal, setShowModal]     = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm]               = useState({ name: '', sku: '', category: 'Electronics', stock: '', price: '' });

  // ── Derived stats ──
  const total      = products.length;
  const inStock    = products.filter(p => p.status === 'In Stock').length;
  const lowStock   = products.filter(p => p.status === 'Low Stock').length;
  const outOfStock = products.filter(p => p.status === 'Out of Stock').length;

  // ── Filter logic ──
  const filtered = products.filter(p => {
    const matchSearch   = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'All Categories' || p.category === category;
    const matchStatus   = status === 'All Status' || p.status === status;
    return matchSearch && matchCategory && matchStatus;
  });

  // ── Status helper ──
  const getStatus = (stock) => stock === 0 ? 'Out of Stock' : stock <= 10 ? 'Low Stock' : 'In Stock';

  // ── Add / Edit submit ──
  const handleSubmit = () => {
    if (!form.name || !form.sku || !form.stock || !form.price) return;
    const stockNum = parseInt(form.stock);
    if (editProduct) {
      setProducts(prev => prev.map(p => p.id === editProduct.id
        ? { ...p, ...form, stock: stockNum, price: parseInt(form.price), status: getStatus(stockNum) }
        : p));
    } else {
      const newProduct = {
        id: Date.now(),
        ...form,
        stock: stockNum,
        price: parseInt(form.price),
        status: getStatus(stockNum),
      };
      setProducts(prev => [...prev, newProduct]);
    }
    closeModal();
  };

  // ── Delete ──
  const handleDelete = (id) => {
    if (confirm('Delete this product?')) setProducts(prev => prev.filter(p => p.id !== id));
  };

  // ── Open edit modal ──
  const openEdit = (product) => {
    setEditProduct(product);
    setForm({ name: product.name, sku: product.sku, category: product.category, stock: product.stock, price: product.price });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditProduct(null);
    setForm({ name: '', sku: '', category: 'Electronics', stock: '', price: '' });
  };

  // ── Status badge style ──
  const badgeStyle = (status) => {
    if (status === 'In Stock')    return { background: '#7A9E7E22', color: '#7A9E7E' };
    if (status === 'Low Stock')   return { background: '#C9973A22', color: '#C9973A' };
    if (status === 'Out of Stock') return { background: '#B85C4A22', color: '#B85C4A' };
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5EFE6' }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ width: '220px', background: '#EDE0CE', borderRight: '1px solid #E8D5BB', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 50 }}>
        {/* Logo */}
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

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          <NavLabel text="Main" />
          <NavItem label="Dashboard"   href="/dashboard"  active={false} />
          <NavItem label="Products"    href="/products"   active={true}  />
          <NavItem label="Receipts"    href="/receipts"   active={false} />
          <NavItem label="Deliveries"  href="/deliveries" active={false} />
          <NavLabel text="Adjustments" />
          <NavItem label="Internal Transfer"  href="/adjustments/internal-transfer" active={false} />
          <NavItem label="Stock Adjustments"  href="/adjustments/stock-adjustments" active={false} />
          <NavItem label="Move History"       href="/adjustments/move-history"      active={false} />
          <NavLabel text="Account" />
          <NavItem label="Settings" href="/settings" active={false} />
        </nav>

        {/* Profile */}
        <div style={{ padding: '14px 16px', borderTop: '1px solid #E8D5BB', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#C17F3E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#FDF8F2' }}>AJ</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#3D2B1F' }}>Arjun J.</div>
            <div style={{ fontSize: '11px', color: '#9C8572' }}>Admin</div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div style={{ marginLeft: '220px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Topbar */}
        <div style={{ background: '#FDF8F2', borderBottom: '1px solid #E8D5BB', padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#3D2B1F' }}>Products</h1>
            <p style={{ fontSize: '12px', color: '#9C8572', marginTop: '2px' }}>Manage your product catalog</p>
          </div>
          <button onClick={() => setShowModal(true)} style={{ background: '#C17F3E', color: '#FDF8F2', border: 'none', borderRadius: '9px', padding: '10px 20px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            + Add Product
          </button>
        </div>

        <div style={{ padding: '24px 28px' }}>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
            {[
              { label: 'Total Products', val: total,      tag: '+12 this week',  tagColor: '#7A9E7E' },
              { label: 'In Stock',       val: inStock,    tag: `${((inStock/total)*100).toFixed(1)}% of total`, tagColor: '#7A9E7E' },
              { label: 'Low Stock',      val: lowStock,   tag: 'Needs reorder',  tagColor: '#C9973A' },
              { label: 'Out of Stock',   val: outOfStock, tag: 'Action needed',  tagColor: '#B85C4A' },
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
                placeholder="Search products or SKU..."
                style={{ width: '100%', padding: '10px 14px 10px 36px', background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '13px', color: '#3D2B1F' }}
              />
            </div>
            <select value={category} onChange={e => setCategory(e.target.value)}
              style={{ padding: '10px 14px', background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '13px', color: '#3D2B1F' }}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={status} onChange={e => setStatus(e.target.value)}
              style={{ padding: '10px 14px', background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '13px', color: '#3D2B1F' }}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Table */}
          <div style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F5EFE6' }}>
                  {['Product', 'Category', 'SKU', 'Stock', 'Price', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9C8572', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #E8D5BB' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#9C8572' }}>No products found</td></tr>
                ) : filtered.map(p => (
                  <tr key={p.id} style={{ borderBottom: '0.5px solid #F0E4D0' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#3D2B1F' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: '#C4A882', marginTop: '2px' }}>#{p.id.toString().padStart(5,'0')}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: '#C17F3E15', color: '#9C6B3C', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>{p.category}</span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#9C8572' }}>{p.sku}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: p.stock === 0 ? '#B85C4A' : p.stock <= 10 ? '#C9973A' : '#3D2B1F' }}>{p.stock}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#C17F3E' }}>₹{p.price.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ ...badgeStyle(p.status), padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>{p.status}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => openEdit(p)} style={{ padding: '5px 12px', background: 'transparent', border: '1px solid #E8D5BB', borderRadius: '6px', fontSize: '12px', color: '#9C6B3C', fontWeight: 500 }}>Edit</button>
                        <button onClick={() => handleDelete(p.id)} style={{ padding: '5px 12px', background: 'transparent', border: '1px solid #B85C4A33', borderRadius: '6px', fontSize: '12px', color: '#B85C4A', fontWeight: 500 }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Count */}
          <div style={{ marginTop: '12px', fontSize: '12px', color: '#9C8572' }}>
            Showing {filtered.length} of {total} products
          </div>
        </div>
      </div>

      {/* ── ADD / EDIT MODAL ── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(61,43,31,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#FDF8F2', border: '1px solid #E8D5BB', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '440px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#3D2B1F', marginBottom: '24px' }}>
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            {[
              { label: 'Product Name', key: 'name',     type: 'text',   placeholder: 'e.g. Wireless Headphones' },
              { label: 'SKU',          key: 'sku',      type: 'text',   placeholder: 'e.g. WH-0124' },
              { label: 'Stock Qty',    key: 'stock',    type: 'number', placeholder: 'e.g. 100' },
              { label: 'Price (₹)',    key: 'price',    type: 'number', placeholder: 'e.g. 2499' },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 500, color: '#7a5535', display: 'block', marginBottom: '6px' }}>{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  style={{ width: '100%', padding: '10px 14px', background: '#fdf4e8', border: '0.5px solid #d4a96a', borderRadius: '8px', fontSize: '14px', color: '#2c1200' }}
                />
              </div>
            ))}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '12px', fontWeight: 500, color: '#7a5535', display: 'block', marginBottom: '6px' }}>Category</label>
              <select value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', background: '#fdf4e8', border: '0.5px solid #d4a96a', borderRadius: '8px', fontSize: '14px', color: '#2c1200' }}>
                {['Electronics', 'Furniture', 'Accessories'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={closeModal} style={{ flex: 1, padding: '11px', background: 'transparent', border: '1px solid #E8D5BB', borderRadius: '9px', fontSize: '14px', color: '#9C8572', fontWeight: 500 }}>Cancel</button>
              <button onClick={handleSubmit} style={{ flex: 1, padding: '11px', background: '#C17F3E', color: '#FDF8F2', border: 'none', borderRadius: '9px', fontSize: '14px', fontWeight: 600 }}>
                {editProduct ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sidebar helper components ──
function NavLabel({ text }) {
  return <div style={{ fontSize: '10px', fontWeight: 600, color: '#C4A882', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '10px 8px 4px' }}>{text}</div>;
}

function NavItem({ label, href, active }) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '8px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: active ? 600 : 400, color: active ? '#FDF8F2' : '#9C8572', background: active ? '#C17F3E' : 'transparent', marginBottom: '2px', transition: 'all 0.15s' }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: active ? '#FDF8F2' : '#C4A882', flexShrink: 0 }} />
        {label}
      </div>
    </Link>
  );
}