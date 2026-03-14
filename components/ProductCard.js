"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";

// ─────────────────────────────────────────────────────────────────────────────
//  FILE:  app/products/page.js
//  Products page — table + search + filters + Add Product modal
//  Uses:  components/Navbar.js  +  globals.css variables
// ─────────────────────────────────────────────────────────────────────────────

// ── Demo data (replace with real API calls later) ─────────────────────────────
const INITIAL_PRODUCTS = [
  { id: 1,  name: "Steel Rods",       sku: "SKU-1042", category: "Raw Materials", unit: "kg",    stock: 3,   minStock: 50,  status: "Low Stock"    },
  { id: 2,  name: "Office Chairs",    sku: "SKU-2045", category: "Furniture",     unit: "units", stock: 120, minStock: 20,  status: "In Stock"     },
  { id: 3,  name: "PVC Pipes",        sku: "SKU-3310", category: "Raw Materials", unit: "m",     stock: 8,   minStock: 40,  status: "Low Stock"    },
  { id: 4,  name: "Copper Wire",      sku: "SKU-4450", category: "Electrical",    unit: "kg",    stock: 85,  minStock: 30,  status: "Medium"       },
  { id: 5,  name: "Hex Nuts",         sku: "SKU-5502", category: "Spare Parts",   unit: "pcs",   stock: 0,   minStock: 200, status: "Out of Stock" },
  { id: 6,  name: "Packaging Boxes",  sku: "SKU-6601", category: "Packaging",     unit: "pcs",   stock: 500, minStock: 100, status: "In Stock"     },
  { id: 7,  name: "Aluminium Sheets", sku: "SKU-7710", category: "Raw Materials", unit: "kg",    stock: 200, minStock: 50,  status: "In Stock"     },
  { id: 8,  name: "LED Bulbs",        sku: "SKU-8801", category: "Electrical",    unit: "pcs",   stock: 18,  minStock: 50,  status: "Low Stock"    },
];

const CATEGORIES = ["All Categories", "Raw Materials", "Furniture", "Electrical", "Spare Parts", "Packaging"];
const STOCK_FILTERS = ["All Stock", "In Stock", "Low Stock", "Out of Stock"];
const UNITS = ["kg", "pcs", "m", "litre", "units", "box"];

const EMPTY_FORM = { name: "", sku: "", category: "Raw Materials", unit: "kg", stock: "", minStock: "" };

// ── Status badge style map ────────────────────────────────────────────────────
const STATUS_CLASS = {
  "In Stock":     "b-green",
  "Low Stock":    "b-red",
  "Out of Stock": "b-red",
  "Medium":       "b-amber",
};

// ── Stock bar color ───────────────────────────────────────────────────────────
function stockBarColor(pct) {
  if (pct <= 15) return "#ef4444";
  if (pct <= 50) return "#f59e0b";
  return "#22c55e";
}

export default function ProductsPage() {
  const [products, setProducts]   = useState(INITIAL_PRODUCTS);
  const [search, setSearch]       = useState("");
  const [catFilter, setCatFilter] = useState("All Categories");
  const [stFilter, setStFilter]   = useState("All Stock");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem]   = useState(null);   // null = add mode
  const [form, setForm]           = useState(EMPTY_FORM);
  const [page, setPage]           = useState(1);

  const PER_PAGE = 8;

  // ── Filtered list ───────────────────────────────────────────────────────────
  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All Categories" || p.category === catFilter;
    const matchSt  = stFilter  === "All Stock"      || p.status   === stFilter;
    return matchSearch && matchCat && matchSt;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // ── Modal helpers ───────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditItem(product);
    setForm({
      name:     product.name,
      sku:      product.sku,
      category: product.category,
      unit:     product.unit,
      stock:    product.stock,
      minStock: product.minStock,
    });
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditItem(null); };

  // ── Save (add or edit) ──────────────────────────────────────────────────────
  const handleSave = () => {
    if (!form.name.trim() || !form.sku.trim()) return;
    const stockNum    = Number(form.stock)    || 0;
    const minStockNum = Number(form.minStock) || 0;

    let status = "In Stock";
    if (stockNum === 0)                   status = "Out of Stock";
    else if (stockNum < minStockNum)      status = "Low Stock";
    else if (stockNum < minStockNum * 2)  status = "Medium";

    if (editItem) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editItem.id
            ? { ...p, ...form, stock: stockNum, minStock: minStockNum, status }
            : p
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { id: Date.now(), ...form, stock: stockNum, minStock: minStockNum, status },
      ]);
    }
    closeModal();
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = (id) => {
    if (confirm("Delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <>
      <style>{`
        .prod-page { min-height: 100dvh; background: var(--cream); }
        .prod-body { padding: 28px 32px; max-width: 1400px; margin: 0 auto; }

        /* ── Header ── */
        .prod-hd {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 22px;
          animation: fadeUp .4s cubic-bezier(.16,1,.3,1) both;
        }
        .prod-title {
          font-family: 'Playfair Display', serif;
          font-size: 26px; font-weight: 700; color: var(--text-primary); letter-spacing: -.4px;
        }
        .prod-sub { font-size: 13px; color: var(--text-muted); margin-top: 3px; }
        .hd-right { display: flex; gap: 10px; align-items: center; }

        /* ── Buttons ── */
        .btn-primary {
          padding: 9px 18px; border-radius: 9px; border: none;
          background: var(--accent); color: #fff;
          font-size: 13px; font-weight: 600; cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex; align-items: center; gap: 6px;
          transition: background .15s, transform .13s, box-shadow .15s;
          box-shadow: 0 2px 8px rgba(193,127,58,.28);
        }
        .btn-primary:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(193,127,58,.36);
        }
        .btn-secondary {
          padding: 9px 14px; border-radius: 9px;
          border: 1px solid var(--border); background: var(--surface);
          color: var(--text-body); font-size: 13px; font-weight: 500;
          cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex; align-items: center; gap: 6px;
          transition: background .15s;
        }
        .btn-secondary:hover { background: var(--cream-dark); }

        /* ── Toolbar ── */
        .toolbar {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 16px; gap: 12px; flex-wrap: wrap;
          animation: fadeUp .4s .06s cubic-bezier(.16,1,.3,1) both;
        }
        .search-wrap { position: relative; flex: 1; max-width: 320px; }
        .search-ico  {
          position: absolute; left: 12px; top: 50%;
          transform: translateY(-50%); font-size: 14px; color: var(--text-faint);
          pointer-events: none;
        }
        .search-inp {
          width: 100%; padding: 9px 12px 9px 36px;
          border: 1px solid var(--border); border-radius: 9px;
          font-size: 13px; color: var(--text-body); background: var(--surface);
          outline: none; font-family: 'Plus Jakarta Sans', sans-serif;
          transition: border-color .18s, box-shadow .18s;
        }
        .search-inp:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(193,127,58,.1); }
        .search-inp::placeholder { color: var(--text-faint); }

        .toolbar-right { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .sel-inp {
          padding: 8px 12px; border: 1px solid var(--border); border-radius: 9px;
          font-size: 13px; color: var(--text-body); background: var(--surface);
          outline: none; font-family: 'Plus Jakarta Sans', sans-serif; cursor: pointer;
          transition: border-color .15s;
        }
        .sel-inp:focus { border-color: var(--accent); }

        /* ── Table card ── */
        .table-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 14px; overflow: hidden;
          animation: fadeUp .4s .1s cubic-bezier(.16,1,.3,1) both;
        }
        .table-wrap { overflow-x: auto; }

        table { width: 100%; border-collapse: collapse; }
        th {
          text-align: left; padding: 11px 18px;
          font-size: 10.5px; font-weight: 600; letter-spacing: .6px;
          text-transform: uppercase; color: var(--text-faint);
          background: var(--surface-2); border-bottom: 1px solid var(--cream-dark);
          white-space: nowrap;
        }
        td {
          padding: 13px 18px; font-size: 13px; color: var(--text-body);
          border-bottom: 1px solid #f9f5f0; vertical-align: middle;
        }
        tr:last-child td { border-bottom: none; }
        tbody tr { transition: background .13s; cursor: pointer; }
        tbody tr:hover td { background: var(--surface-2); }

        .prod-name { font-weight: 600; color: var(--text-primary); }
        .prod-sku  { font-size: 11px; color: var(--text-faint); margin-top: 2px; }

        /* ── Stock bar cell ── */
        .stock-cell { display: flex; align-items: center; gap: 10px; }
        .stock-bar  { width: 60px; height: 5px; background: var(--cream-deeper); border-radius: 4px; flex-shrink: 0; }
        .stock-fill { height: 100%; border-radius: 4px; }

        /* ── Badges ── */
        .badge {
          display: inline-flex; align-items: center;
          padding: 3px 9px; border-radius: 20px;
          font-size: 10.5px; font-weight: 600;
        }
        .b-green { background: var(--success-bg); color: var(--success); }
        .b-amber { background: var(--warning-bg); color: var(--warning); }
        .b-red   { background: var(--danger-bg);  color: var(--danger);  }

        /* ── Action buttons ── */
        .action-wrap { display: flex; gap: 6px; }
        .act-btn {
          width: 28px; height: 28px; border-radius: 7px;
          border: 1px solid var(--border); background: var(--cream-dark);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 13px; cursor: pointer; transition: background .13s;
        }
        .act-btn:hover { background: var(--cream-deeper); }
        .act-btn.del:hover { background: var(--danger-bg); border-color: var(--danger); }

        /* ── Empty state ── */
        .empty-state {
          text-align: center; padding: 52px 20px;
          color: var(--text-muted); font-size: 14px;
        }
        .empty-icon { font-size: 36px; margin-bottom: 10px; opacity: .4; }

        /* ── Pagination ── */
        .pagination {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px; border-top: 1px solid var(--cream-dark);
        }
        .page-info { font-size: 12.5px; color: var(--text-muted); }
        .page-btns { display: flex; gap: 4px; }
        .pg-btn {
          width: 30px; height: 30px; border-radius: 7px;
          border: 1px solid var(--border); background: var(--surface);
          font-size: 12.5px; font-weight: 500; color: var(--text-body);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background .13s;
        }
        .pg-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }
        .pg-btn:hover:not(.active) { background: var(--cream-dark); }
        .pg-btn:disabled { opacity: .4; cursor: not-allowed; }

        /* ── Modal overlay ── */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(26,21,16,.45);
          display: flex; align-items: center; justify-content: center;
          z-index: 500; padding: 20px;
          opacity: 0; pointer-events: none;
          transition: opacity .2s;
        }
        .modal-overlay.show { opacity: 1; pointer-events: all; }

        .modal {
          background: var(--surface); border-radius: 16px;
          width: 100%; max-width: 480px; padding: 28px;
          box-shadow: 0 20px 60px rgba(90,65,30,.2);
          transform: translateY(10px);
          transition: transform .22s cubic-bezier(.16,1,.3,1);
          max-height: 90dvh; overflow-y: auto;
        }
        .modal-overlay.show .modal { transform: translateY(0); }

        .modal-hd {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 22px;
        }
        .modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px; font-weight: 700; color: var(--text-primary);
        }
        .close-btn {
          width: 30px; height: 30px; border-radius: 8px;
          border: 1px solid var(--border); background: var(--cream-dark);
          cursor: pointer; font-size: 14px;
          display: flex; align-items: center; justify-content: center;
          transition: background .13s;
        }
        .close-btn:hover { background: var(--cream-deeper); }

        /* ── Form fields ── */
        .field { margin-bottom: 16px; }
        .field-label {
          display: block; font-size: 11px; font-weight: 600;
          letter-spacing: .5px; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 7px;
        }
        .field-inp, .field-sel {
          width: 100%; padding: 10px 13px;
          border: 1px solid var(--border); border-radius: 9px;
          font-size: 13.5px; color: var(--text-body); background: var(--surface);
          outline: none; font-family: 'Plus Jakarta Sans', sans-serif;
          transition: border-color .18s, box-shadow .18s;
        }
        .field-inp:focus, .field-sel:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(193,127,58,.1);
        }
        .field-inp::placeholder { color: var(--text-faint); }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .modal-footer {
          display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px;
        }

        /* ── Animation ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="prod-page">
        <Navbar />

        <div className="prod-body">

          {/* ── Header ── */}
          <div className="prod-hd">
            <div>
              <div className="prod-title">Products</div>
              <div className="prod-sub">{products.length} products across all categories</div>
            </div>
            <div className="hd-right">
              <button className="btn-secondary">⬇ Export</button>
              <button className="btn-primary" onClick={openAdd}>+ Add Product</button>
            </div>
          </div>

          {/* ── Toolbar ── */}
          <div className="toolbar">
            <div className="search-wrap">
              <span className="search-ico">🔍</span>
              <input
                className="search-inp"
                placeholder="Search by name or SKU..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <div className="toolbar-right">
              <select
                className="sel-inp"
                value={catFilter}
                onChange={(e) => { setCatFilter(e.target.value); setPage(1); }}
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select
                className="sel-inp"
                value={stFilter}
                onChange={(e) => { setStFilter(e.target.value); setPage(1); }}
              >
                {STOCK_FILTERS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* ── Table ── */}
          <div className="table-card">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Unit</th>
                    <th>Stock</th>
                    <th>Min Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={7}>
                        <div className="empty-state">
                          <div className="empty-icon">📦</div>
                          No products found
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginated.map((p) => {
                      const pct = p.minStock > 0
                        ? Math.min(100, Math.round((p.stock / (p.minStock * 2)) * 100))
                        : 100;
                      return (
                        <tr key={p.id}>
                          <td>
                            <div className="prod-name">{p.name}</div>
                            <div className="prod-sku">{p.sku}</div>
                          </td>
                          <td>{p.category}</td>
                          <td>{p.unit}</td>
                          <td>
                            <div className="stock-cell">
                              <span style={{ fontWeight: 600 }}>{p.stock}</span>
                              <div className="stock-bar">
                                <div
                                  className="stock-fill"
                                  style={{
                                    width: `${pct}%`,
                                    background: stockBarColor(pct),
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td>{p.minStock}</td>
                          <td>
                            <span className={`badge ${STATUS_CLASS[p.status] || "b-amber"}`}>
                              {p.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-wrap">
                              <button className="act-btn" onClick={() => openEdit(p)} title="Edit">✏</button>
                              <button className="act-btn del" onClick={() => handleDelete(p.id)} title="Delete">🗑</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filtered.length > PER_PAGE && (
              <div className="pagination">
                <div className="page-info">
                  Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} products
                </div>
                <div className="page-btns">
                  <button className="pg-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      className={`pg-btn ${page === n ? "active" : ""}`}
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </button>
                  ))}
                  <button className="pg-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>›</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      <div
        className={`modal-overlay ${modalOpen ? "show" : ""}`}
        onClick={(e) => { if (e.target.classList.contains("modal-overlay")) closeModal(); }}
      >
        <div className="modal">
          <div className="modal-hd">
            <div className="modal-title">{editItem ? "Edit Product" : "Add New Product"}</div>
            <button className="close-btn" onClick={closeModal}>✕</button>
          </div>

          <div className="field">
            <label className="field-label">Product Name</label>
            <input
              className="field-inp"
              placeholder="e.g. Steel Rods"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label className="field-label">SKU / Code</label>
              <input
                className="field-inp"
                placeholder="SKU-0001"
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
              />
            </div>
            <div className="field">
              <label className="field-label">Unit of Measure</label>
              <select
                className="field-sel"
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
              >
                {UNITS.map((u) => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label className="field-label">Category</label>
              <select
                className="field-sel"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.filter((c) => c !== "All Categories").map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field-label">Initial Stock</label>
              <input
                className="field-inp"
                type="number"
                placeholder="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <label className="field-label">Min Stock (Reorder Point)</label>
            <input
              className="field-inp"
              type="number"
              placeholder="e.g. 50"
              value={form.minStock}
              onChange={(e) => setForm({ ...form, minStock: e.target.value })}
            />
          </div>

          <div className="modal-footer">
            <button className="btn-secondary" onClick={closeModal}>Cancel</button>
            <button className="btn-primary" onClick={handleSave}>
              {editItem ? "Save Changes" : "Save Product"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}