# LUXÉ — Premium Luxury Fashion E-Commerce Platform

A production-ready, full-stack luxury fashion e-commerce platform built with Next.js 15, Supabase, Stripe, and Framer Motion.

---

## ✨ Features

### Customer Storefront
- **Luxury Homepage** — Cinematic hero, category banners, featured products, watches showcase, testimonials, Instagram gallery
- **Advanced Shop** — Filtering by category/size/color/price, sorting, grid/list toggle
- **Product Pages** — Multi-image gallery with zoom, variant selection (color + size), reviews, specifications
- **Shopping Cart** — Persistent slide-over drawer with quantity management
- **Wishlist** — Cross-session saved items
- **Full Checkout** — Multi-step flow with address form, Stripe payment, order confirmation
- **User Account** — Profile, order history with tracking, wishlist management

### Admin Dashboard
- **Analytics** — Revenue charts (Recharts), order volume, category breakdowns, KPI cards
- **Product Management** — Full CRUD, bulk actions, variant management, watch/clothing specs
- **Order Management** — Status updates, refunds, tracking, invoice printing
- **Inventory** — Real-time stock tracking, low-stock alerts, activity logs
- **Customer Management** — VIP tiers, spend tracking, order history

### Technical
- **Auth** — Email/password + Google OAuth via Supabase, role-based access (customer/admin/super_admin)
- **Database** — Full PostgreSQL schema with RLS policies, triggers, functions
- **Payments** — Stripe integration with webhooks for order lifecycle
- **Storage** — Supabase Storage for product images, avatars, banners
- **SEO** — Metadata API, OpenGraph, structured data ready
- **Performance** — Image optimization, lazy loading, code splitting

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| State | Zustand + React Query |
| Forms | React Hook Form + Zod |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Payments | Stripe |
| Charts | Recharts |
| Deployment | Vercel |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn
- Supabase account
- Stripe account

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/luxe-fashion.git
cd luxe-fashion
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Fill in your values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Supabase Database

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration file:

```bash
# Copy and run in Supabase SQL Editor:
supabase/migrations/001_initial_schema.sql
```

3. Create Storage buckets in Supabase Dashboard:
   - `product-images` (public)
   - `avatars` (public)
   - `banners` (public)
   - `invoices` (private)

4. Enable Google OAuth (optional):
   - Supabase Dashboard → Authentication → Providers → Google
   - Add your Google OAuth credentials

### 4. Configure Stripe Webhooks

```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy the webhook signing secret to STRIPE_WEBHOOK_SECRET
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📁 Project Structure

```
luxe-fashion/
├── app/
│   ├── (store)/              # Customer-facing pages
│   │   ├── page.tsx          # Homepage
│   │   ├── shop/             # Product listing & detail
│   │   ├── checkout/         # Checkout flow
│   │   ├── account/          # User account area
│   │   └── auth/             # Login, signup
│   ├── admin/                # Admin dashboard
│   │   ├── page.tsx          # Dashboard overview
│   │   ├── products/         # Product management
│   │   ├── orders/           # Order management
│   │   ├── customers/        # Customer management
│   │   └── inventory/        # Stock management
│   ├── api/                  # API routes
│   │   ├── products/         # Products API
│   │   ├── orders/           # Orders API
│   │   └── webhooks/stripe/  # Stripe webhooks
│   ├── auth/callback/        # OAuth callback
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── layout/               # Header, Footer, CartDrawer
│   ├── home/                 # Homepage sections
│   ├── shop/                 # Product cards, filters
│   ├── admin/                # Admin sidebar, header
│   ├── ui/                   # Shared UI components
│   └── providers/            # Context providers
├── features/                 # Feature modules
│   ├── auth/                 # Login/signup forms
│   ├── products/             # Shop & product detail
│   ├── checkout/             # Checkout flow
│   ├── account/              # Account pages
│   └── admin/                # Admin pages
├── lib/
│   ├── supabase/             # Supabase clients
│   └── utils.ts              # Utility functions
├── store/
│   ├── cart.store.ts         # Cart state (Zustand)
│   └── wishlist.store.ts     # Wishlist state (Zustand)
├── types/
│   └── index.ts              # TypeScript types
├── supabase/
│   └── migrations/           # Database migrations
├── .env.example
├── vercel.json
└── .github/workflows/ci.yml
```

---

## 🌐 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel Dashboard or:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... (add all env vars)

# Deploy to production
vercel --prod
```

### Post-Deploy Checklist

- [ ] Set `NEXT_PUBLIC_APP_URL` to your production URL
- [ ] Update Supabase Auth redirect URLs: `https://yourdomain.com/auth/callback`
- [ ] Add production domain to Stripe webhook endpoints
- [ ] Configure Supabase RLS policies for production
- [ ] Set up Supabase Storage CORS policy

---

## 🗄 Database Schema

Key tables:
- `profiles` — User accounts (extends Supabase auth)
- `products` — Product catalog
- `product_images` — Product photos
- `product_variants` — Size/color variants with stock
- `watch_specs` — Watch-specific specifications
- `clothing_specs` — Clothing-specific specifications
- `orders` — Customer orders
- `order_items` — Individual items per order
- `cart_items` — Shopping cart (persistent)
- `wishlist_items` — Saved products
- `reviews` — Product reviews
- `coupons` — Discount codes
- `banners` — Homepage/promotional banners

Full schema: `supabase/migrations/001_initial_schema.sql`

---

## 🔐 Authentication & Authorization

Three user roles:
- **customer** — Can shop, manage orders/wishlist/addresses
- **admin** — Full product/order/customer management
- **super_admin** — All admin access + settings/user management

Protected routes:
- `/account/*` — Requires login
- `/checkout` — Requires login
- `/admin/*` — Requires admin/super_admin role

---

## 💳 Stripe Integration

The checkout flow:
1. Customer fills shipping form
2. POST `/api/orders` creates order + Stripe PaymentIntent
3. Frontend collects card details via Stripe Elements
4. On payment success, webhook at `/api/webhooks/stripe` updates order status
5. Inventory automatically deducted via database trigger

Test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

---

## 📊 Admin Access

Create an admin account:

```sql
-- In Supabase SQL Editor, after creating an account:
UPDATE profiles 
SET role = 'super_admin' 
WHERE email = 'admin@yourdomain.com';
```

---

## 📄 License

MIT License — Free to use for commercial and personal projects.
