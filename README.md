# 📦 CoreInventory — Smart Inventory Management System

<div align="center">

![CoreInventory Banner](https://img.shields.io/badge/CoreInventory-Smart%20IMS-C1692A?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNnoiLz48L3N2Zz4=)

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)

**A modular, real-time Inventory Management System that replaces manual registers and Excel sheets with a centralized digital platform.**

[🚀 Live Demo](#) · [📋 Features](#-features) · [🛠 Tech Stack](#-tech-stack) · [⚙️ Setup](#%EF%B8%8F-getting-started) · [📁 Folder Structure](#-folder-structure)

</div>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#%EF%B8%8F-getting-started)
- [Folder Structure](#-folder-structure)
- [Module Breakdown](#-module-breakdown)
- [Database Schema](#-database-schema)
- [API Routes](#-api-routes)
- [Environment Variables](#-environment-variables)
- [Screenshots](#-screenshots)
- [Inventory Flow](#-inventory-flow)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About the Project

**CoreInventory** is a full-stack Inventory Management System (IMS) built for businesses that want to move away from manual stock tracking. It provides a centralized, real-time platform to manage all stock-related operations — from receiving goods from vendors to delivering orders to customers.

### 🔥 Why CoreInventory?

| Before | After |
|--------|-------|
| 📋 Manual paper registers | ✅ Digital, real-time records |
| 📊 Scattered Excel sheets | ✅ Centralized dashboard |
| ❌ No stock visibility | ✅ Live stock levels per location |
| ⚠️ Human data entry errors | ✅ Automated stock updates on validate |
| 🐢 Slow warehouse operations | ✅ Streamlined pick → pack → deliver flow |
| 🔀 No transfer tracking | ✅ Every movement logged in ledger |

---

## ✨ Features

### 🔐 Authentication
- User Sign Up & Login with email/password
- OTP-based password reset flow
- Session management with JWT
- Google OAuth login
- Redirect to Dashboard after successful login

### 📊 Dashboard
- **KPI Cards:** Total Products, Low Stock count, Out of Stock count, Pending Receipts, Pending Deliveries
- **Operations Table:** All recent stock movements in one unified view
- **Dynamic Filters:** By document type (Receipt / Delivery / Transfer / Adjustment) and by status (Draft / Waiting / Ready / Done / Canceled)
- **Low Stock Alert Banner:** Automatic warning when products hit reorder level
- **Charts:** Monthly operations bar chart + Stock status donut chart

### 📦 Product Management
- Create, edit, and view products
- Product fields: Name, SKU/Code, Category, Unit of Measure, Initial Stock
- Stock availability per warehouse location
- Product categories: Raw Materials, Finished Goods, Packaging, Office Supplies, Equipment
- SKU search and smart filters
- Low stock / Out of stock status badges

### 🚚 Receipts — Incoming Stock
- Create new receipt with supplier name
- Add multiple products with quantities
- Status flow: `Draft` → `Waiting` → `Done`
- Validate receipt → stock **increases automatically**
- Every receipt logged with reference number (e.g. `REC/2025/0041`)

### 📤 Deliveries — Outgoing Stock
- Create delivery order with customer name
- Add products and quantities to deliver
- Status flow: `Draft` → `Ready` → `Done`
- Validate delivery → stock **decreases automatically**
- Every delivery logged with reference number (e.g. `DEL/2025/0089`)

### 🔄 Adjustments (Dropdown with 3 sub-modules)

#### ↔️ Internal Transfers
- Move stock between warehouses, racks, or production areas
- Select source location → destination → product → quantity
- Total stock unchanged; only location is updated
- Status flow: `Draft` → `Waiting` → `Done`
- Reference format: `INT/2025/0022`

#### 📝 Stock Adjustments
- Fix mismatches between recorded and physical stock
- Reasons: Damaged goods, Lost items, Counting errors, Expired items
- Enter physically counted quantity → system auto-calculates difference
- Auto-logged in stock ledger
- Reference format: `ADJ/2025/0011`

#### 📜 Move History
- Complete stock ledger of every movement
- Columns: Date, Reference, Type, Product, Qty Change, From, To, Warehouse
- Filter by product, document type, and date range
- Full audit trail — nothing is ever deleted

### ⚙️ Settings
- Warehouse management (create & manage multiple warehouses)
- Default warehouse configuration

### 👤 Profile
- My Profile view
- Logout

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 14 | React framework with App Router |
| [React](https://react.dev/) | 18 | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety across the codebase |
| [Tailwind CSS](https://tailwindcss.com/) | 3 | Utility-first CSS styling |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| [Node.js](https://nodejs.org/) | 20 | JavaScript runtime |
| [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | 14 | REST API endpoints |
| [NextAuth.js](https://next-auth.js.org/) | 5 | Authentication & sessions |

### Database
| Technology | Version | Purpose |
|------------|---------|---------|
| [MongoDB](https://www.mongodb.com/) | 7 | NoSQL document database |
| [Mongoose](https://mongoosejs.com/) | 8 | MongoDB ODM for schema modeling |

### Tools & DevOps
| Tool | Purpose |
|------|---------|
| [GitHub](https://github.com/) | Version control & collaboration |
| [Postman](https://www.postman.com/) | API testing |
| [Figma](https://figma.com/) | UI/UX design & prototyping |
| [VS Code](https://code.visualstudio.com/) | Code editor |

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have these installed:

```bash
node --version   # v20 or higher
npm --version    # v10 or higher
git --version    # any recent version
```

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/coreinventory.git
cd coreinventory
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env.local
```
Then fill in your values (see [Environment Variables](#-environment-variables) section).

**4. Run the development server**
```bash
npm run dev
```

**5. Open in browser**
```
http://localhost:3000
```

The app will redirect to `/login`. Sign up to get started!

### Build for Production
```bash
npm run build
npm start
```

---

## 📁 Folder Structure

```
coreinventory/
│
├── 📁 app/                          # Next.js App Router (pages)
│   ├── 📄 layout.tsx                # Root layout — metadata, fonts, global providers
│   ├── 📄 page.tsx                  # Root page — redirects to /dashboard
│   ├── 📄 globals.css               # Global CSS variables & base styles
│   │
│   ├── 📁 login/
│   │   └── 📄 page.tsx              # Login & Signup page
│   │
│   ├── 📁 dashboard/
│   │   └── 📄 page.tsx              # Dashboard — KPIs, filters, operations table
│   │
│   ├── 📁 products/
│   │   └── 📄 page.tsx              # Product list + Add/Edit product form
│   │
│   ├── 📁 receipts/
│   │   └── 📄 page.tsx              # Receipts — incoming stock management
│   │
│   ├── 📁 deliveries/
│   │   └── 📄 page.tsx              # Deliveries — outgoing stock management
│   │
│   ├── 📁 adjustments/
│   │   └── 📄 page.tsx              # Adjustments dropdown hub (Transfers / Adjustments / History)
│   │
│   ├── 📁 transfers/
│   │   └── 📄 page.tsx              # Internal transfers between warehouses
│   │
│   ├── 📁 history/
│   │   └── 📄 page.tsx              # Move history — full stock ledger
│   │
│   ├── 📁 warehouse/
│   │   └── 📄 page.tsx              # Warehouse settings & management
│   │
│   ├── 📁 settings/
│   │   └── 📄 page.tsx              # App settings
│   │
│   └── 📁 api/                      # Next.js API Routes (backend)
│       ├── 📁 auth/
│       │   └── 📁 [...nextauth]/
│       │       └── 📄 route.ts      # NextAuth login/signup/session
│       ├── 📁 products/
│       │   └── 📄 route.ts          # GET all products, POST new product
│       ├── 📁 receipts/
│       │   └── 📄 route.ts          # GET receipts, POST create, PATCH validate
│       ├── 📁 deliveries/
│       │   └── 📄 route.ts          # GET deliveries, POST create, PATCH validate
│       ├── 📁 transfers/
│       │   └── 📄 route.ts          # GET transfers, POST create, PATCH validate
│       ├── 📁 adjustments/
│       │   └── 📄 route.ts          # GET adjustments, POST create, PATCH validate
│       └── 📁 history/
│           └── 📄 route.ts          # GET full move history / ledger
│
├── 📁 components/                   # Reusable UI components
│   ├── 📄 AppLayout.tsx             # Main app shell — sidebar + topbar + content
│   ├── 📄 Sidebar.tsx               # Left navigation sidebar with all nav links
│   ├── 📄 Topbar.tsx                # Top header bar — page title, search, profile
│   ├── 📄 KpiCard.tsx               # Dashboard KPI metric card
│   ├── 📄 StatusBadge.tsx           # Colored status pill (Draft/Waiting/Done etc.)
│   ├── 📄 DataTable.tsx             # Reusable sortable data table
│   ├── 📄 FilterBar.tsx             # Filter pills for dashboard & lists
│   ├── 📄 Modal.tsx                 # Generic modal/dialog wrapper
│   ├── 📄 ProductForm.tsx           # Add/Edit product form
│   ├── 📄 ReceiptForm.tsx           # Create receipt form
│   ├── 📄 DeliveryForm.tsx          # Create delivery form
│   ├── 📄 TransferForm.tsx          # Create internal transfer form
│   └── 📄 AdjustmentForm.tsx        # Create stock adjustment form
│
├── 📁 lib/                          # Utilities, helpers, data layer
│   ├── 📄 data.ts                   # Mock data — products, receipts, deliveries etc.
│   ├── 📄 db.ts                     # MongoDB connection utility (Mongoose)
│   ├── 📄 auth.ts                   # NextAuth config & options
│   └── 📄 utils.ts                  # Helper functions (formatDate, statusColor etc.)
│
├── 📁 models/                       # Mongoose database models
│   ├── 📄 User.ts                   # User model — name, email, password, role
│   ├── 📄 Product.ts                # Product model — SKU, category, UOM, stock
│   ├── 📄 Warehouse.ts              # Warehouse model — name, location
│   ├── 📄 Receipt.ts                # Receipt model — supplier, products, status
│   ├── 📄 Delivery.ts               # Delivery model — customer, products, status
│   ├── 📄 Transfer.ts               # Internal transfer model — from/to warehouse
│   ├── 📄 Adjustment.ts             # Stock adjustment model — reason, qty diff
│   └── 📄 MoveHistory.ts            # Stock ledger model — all movements logged
│
├── 📁 types/                        # TypeScript type definitions
│   ├── 📄 index.ts                  # All shared types (Product, Receipt, etc.)
│   └── 📄 next-auth.d.ts            # Extended NextAuth session types
│
├── 📁 hooks/                        # Custom React hooks
│   ├── 📄 useProducts.ts            # Fetch & manage products state
│   ├── 📄 useReceipts.ts            # Fetch & manage receipts state
│   └── 📄 useFilters.ts             # Filter state management for tables
│
├── 📁 public/                       # Static assets
│   ├── 🖼 logo.svg                  # CoreInventory logo
│   └── 🖼 favicon.ico               # Browser favicon
│
├── 📁 styles/                       # Additional stylesheets
│   └── 📄 components.css            # Component-level CSS (if not using Tailwind only)
│
├── 📁 src/
│   └── 📁 pages/
│       └── 📄 login.html            # Standalone HTML login page (demo/prototype)
│
├── 📄 .env.local                    # Local environment variables (not committed)
├── 📄 .env.example                  # Environment variable template
├── 📄 .gitignore                    # Files to ignore in Git
├── 📄 next.config.ts                # Next.js configuration
├── 📄 tailwind.config.ts            # Tailwind CSS configuration
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 package.json                  # Project dependencies & scripts
└── 📄 README.md                     # This file
```

---

## 🧩 Module Breakdown

### Navigation Structure

```
CoreInventory App
│
├── 🔐 Login / Signup               → /login
│
├── 📊 Dashboard                    → /dashboard
│
├── 📦 Products                     → /products
│
├── 🚚 Receipts (Incoming)          → /receipts
│
├── 📤 Deliveries (Outgoing)        → /deliveries
│
└── ⚙️ Adjustments (Dropdown)
    ├── ↔️  Internal Transfers      → /transfers
    ├── 📝  Stock Adjustments       → /adjustments
    └── 📜  Move History            → /history
```

### Status Flow for Each Module

```
RECEIPT:    Draft ──► Waiting ──► Done
DELIVERY:   Draft ──► Ready   ──► Done
TRANSFER:   Draft ──► Waiting ──► Done
ADJUSTMENT: Draft ──────────────► Done
```

### KPI Cards on Dashboard

| Card | Description |
|------|-------------|
| Total Products | Total number of products in system |
| Low Stock | Products below reorder level |
| Out of Stock | Products with 0 quantity |
| Pending Receipts | Receipts in Draft or Waiting status |
| Pending Deliveries | Deliveries in Draft or Ready status |

---

## 🗄 Database Schema

### Product
```typescript
{
  _id:        ObjectId
  name:       string        // "Steel Rods"
  sku:        string        // "SKU-001"
  category:   string        // "Raw Materials"
  uom:        string        // "kg" | "pcs" | "m" | "roll"
  stock:      number        // current quantity
  reorder:    number        // low stock threshold
  warehouse:  ObjectId      // ref: Warehouse
  status:     string        // "in_stock" | "low_stock" | "out_stock"
  createdAt:  Date
  updatedAt:  Date
}
```

### Receipt
```typescript
{
  _id:        ObjectId
  ref:        string        // "REC/2025/0041"
  supplier:   string        // "MetalCorp Ltd"
  products:   [{
    productId: ObjectId,
    name:      string,
    qty:       number,
    uom:       string
  }]
  warehouse:  ObjectId      // ref: Warehouse
  status:     string        // "draft" | "waiting" | "done"
  date:       Date
  createdAt:  Date
}
```

### Delivery
```typescript
{
  _id:        ObjectId
  ref:        string        // "DEL/2025/0089"
  customer:   string        // "Sharma Interiors"
  products:   [{
    productId: ObjectId,
    name:      string,
    qty:       number,
    uom:       string
  }]
  warehouse:  ObjectId      // ref: Warehouse
  status:     string        // "draft" | "ready" | "done"
  date:       Date
  createdAt:  Date
}
```

### Transfer
```typescript
{
  _id:        ObjectId
  ref:        string        // "INT/2025/0022"
  from:       ObjectId      // ref: Warehouse (source)
  to:         ObjectId      // ref: Warehouse (destination)
  products:   [{
    productId: ObjectId,
    name:      string,
    qty:       number,
    uom:       string
  }]
  status:     string        // "draft" | "waiting" | "done"
  date:       Date
  createdAt:  Date
}
```

### Adjustment
```typescript
{
  _id:        ObjectId
  ref:        string        // "ADJ/2025/0011"
  product:    ObjectId      // ref: Product
  warehouse:  ObjectId      // ref: Warehouse
  qty:        number        // negative = decrease, positive = increase
  uom:        string
  reason:     string        // "Damaged" | "Lost" | "Count mismatch" | "Expired"
  status:     string        // "draft" | "done"
  date:       Date
  createdAt:  Date
}
```

### MoveHistory (Stock Ledger)
```typescript
{
  _id:        ObjectId
  date:       Date
  ref:        string        // Reference number from source document
  type:       string        // "Receipt" | "Delivery" | "Transfer" | "Adjustment"
  product:    string        // Product name
  qty:        string        // "+100 kg" | "-20 pcs" etc.
  from:       string        // Source location
  to:         string        // Destination location
  warehouse:  ObjectId      // ref: Warehouse
  createdAt:  Date
}
```

---

## 🔌 API Routes

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/signin` | Login with email/password |
| POST | `/api/auth/reset-password` | Request OTP for password reset |
| POST | `/api/auth/verify-otp` | Verify OTP and reset password |

### Products
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create new product |
| GET | `/api/products/:id` | Get single product |
| PATCH | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Receipts
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/receipts` | Get all receipts |
| POST | `/api/receipts` | Create new receipt |
| PATCH | `/api/receipts/:id/validate` | Validate receipt → stock increases |

### Deliveries
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/deliveries` | Get all deliveries |
| POST | `/api/deliveries` | Create new delivery |
| PATCH | `/api/deliveries/:id/validate` | Validate delivery → stock decreases |

### Transfers
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/transfers` | Get all internal transfers |
| POST | `/api/transfers` | Create new transfer |
| PATCH | `/api/transfers/:id/validate` | Validate transfer → location updates |

### Adjustments
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/adjustments` | Get all adjustments |
| POST | `/api/adjustments` | Create new adjustment |
| PATCH | `/api/adjustments/:id/validate` | Validate → stock corrected |

### Move History
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/history` | Get full stock ledger |
| GET | `/api/history?product=X` | Filter by product name |
| GET | `/api/history?type=Receipt` | Filter by movement type |

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# ── Database ──────────────────────────────────
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/coreinventory

# ── NextAuth ──────────────────────────────────
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_key_here_min_32_chars

# ── Google OAuth (optional) ───────────────────
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ── Email OTP (optional) ──────────────────────
EMAIL_SERVER=smtp://user:password@smtp.gmail.com:587
EMAIL_FROM=noreply@coreinventory.com
```

Copy the template:
```bash
cp .env.example .env.local
```

> ⚠️ Never commit `.env.local` to GitHub. It is already listed in `.gitignore`.

---

## 📸 Screenshots

| Page | Preview |
|------|---------|
| Login | Creamish split layout — branding left, form right |
| Dashboard | KPI cards + operations table with filters |
| Products | Product list with stock status badges |
| Receipts | Incoming stock form with validate flow |
| Deliveries | Outgoing stock with pick → pack → validate |
| Adjustments | Dropdown hub for Transfers / Adjustments / History |
| Move History | Full stock ledger with all movements |

---

## 🔄 Inventory Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      INVENTORY LIFECYCLE                        │
└─────────────────────────────────────────────────────────────────┘

  VENDOR
    │
    │  Create Receipt → Add Supplier + Products → Validate
    ▼
  RECEIPT ──────────────────────────────► STOCK +100 kg ✓
    │
    │  Internal Transfer → From: Main → To: Production
    ▼
  TRANSFER ─────────────────────────────► LOCATION UPDATED ✓
    │
    │  Create Delivery → Add Customer + Products → Validate
    ▼
  DELIVERY ─────────────────────────────► STOCK -20 kg ✓
    │
    │  Physical count differs → Enter actual qty
    ▼
  ADJUSTMENT ───────────────────────────► STOCK CORRECTED ✓
    │
    │  Every single movement
    ▼
  MOVE HISTORY ─────────────────────────► FULL AUDIT TRAIL 📜
```

---

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check

# Database
npm run seed         # Seed database with sample data
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

### Commit Message Convention
```
feat:     New feature
fix:      Bug fix
docs:     Documentation update
style:    UI/styling changes
refactor: Code refactor
chore:    Build or config changes
```

---

## 🗺 Roadmap

- [x] Authentication (Login / Signup / OTP Reset)
- [x] Dashboard with KPIs and filters
- [x] Product Management
- [x] Receipts — Incoming Stock
- [x] Deliveries — Outgoing Stock
- [x] Internal Transfers
- [x] Stock Adjustments
- [x] Move History / Stock Ledger
- [ ] Barcode scanning support
- [ ] Mobile warehouse app (React Native)
- [ ] Role-based access control (Manager / Staff)
- [ ] AI demand prediction & reorder suggestions
- [ ] PDF export for receipts and delivery notes
- [ ] Email notifications for low stock alerts
- [ ] Advanced analytics & reporting dashboard

---

## 👨‍💻 Authors

Built with ❤️ for Hackathon 2025

| Name | Role |
|------|------|
| Your Name | Full Stack Developer |
| Teammate | UI/UX & Frontend |
| Teammate | Backend & Database |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ · CoreInventory · Hackathon 2025

</div>
