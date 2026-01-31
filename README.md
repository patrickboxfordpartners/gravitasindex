# GRAVITAS INDEX

Modern Next.js application for Gravitas Index - Entity Search infrastructure for real estate professionals.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (create at https://supabase.com)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Supabase:**
   - Create a new project at https://supabase.com
   - Go to Project Settings → API to get your keys
   - Copy the SQL migration from `supabase/migrations/20260131_initial_schema.sql`
   - Run it in the Supabase SQL Editor

3. **Configure environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` with your actual Supabase credentials.

4. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the site.

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── (marketing)/           # Marketing pages
│   │   ├── page.tsx          # Homepage
│   │   ├── how-it-works/     # How It Works page
│   │   ├── faq/              # FAQ page
│   │   ├── privacy/          # Privacy Policy
│   │   └── terms/            # Terms of Service
│   ├── api/                  # API routes
│   │   └── leads/            # Lead submission endpoint
│   └── globals.css           # Global styles
├── components/
│   ├── marketing/            # Marketing components
│   │   ├── Header.tsx       # Site header with nav
│   │   ├── Footer.tsx       # Site footer
│   │   ├── HeroSection.tsx  # Homepage hero
│   │   └── AlphaForm.tsx    # Lead capture form
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Logo.tsx
└── lib/
    ├── supabase/            # Supabase client
    └── validations/         # Zod schemas
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Validation:** Zod
- **Deployment:** Vercel (recommended)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Testing the Lead Form

1. Start the dev server: `npm run dev`
2. Navigate to `http://localhost:3000/#alpha`
3. Fill out and submit the form
4. Check your Supabase dashboard to verify the lead was created in the `leads` table

## 📊 Database Schema

The database includes the following tables:
- `leads` - Lead submissions from forms
- `email_sequences` - Email automation tracking
- `lead_magnet_downloads` - PDF download tracking
- `analytics_events` - Custom event tracking
- `subscriptions` - Stripe subscription data
- `admin_notes` - Lead management notes

See `supabase/migrations/20260131_initial_schema.sql` for the complete schema.

## 🔐 Environment Variables

Required variables (see `.env.local.example`):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Future phases will require:
# - RESEND_API_KEY (email)
# - STRIPE_SECRET_KEY (payments)
# - NEXT_PUBLIC_POSTHOG_KEY (analytics)
# - NEXT_PUBLIC_SANITY_PROJECT_ID (CMS)
```

## 📝 Implementation Status

**Completed:**
- ✅ Phase 0: Backup & Setup
- ✅ Phase 1: Core Migration (all pages)
- ✅ Phase 2: Backend Foundation (Supabase + forms)

**Pending:**
- ⏳ Phase 3: Lead Magnet System
- ⏳ Phase 4: Email Automation
- ⏳ Phase 5: CMS Integration
- ⏳ Phase 6: Analytics
- ⏳ Phase 7: Admin Dashboard
- ⏳ Phase 8: Payment Integration
- ⏳ Phase 9: Polish & Optimization
- ⏳ Phase 10: Deployment

See `IMPLEMENTATION_STATUS.md` for detailed progress tracking.

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The site will be available at your Vercel URL.

### Environment Variables in Production

Make sure to add all environment variables in the Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`
- Redeploy if needed

## 🎨 Design System

The site uses a carefully crafted design system:

**Colors:**
- Background: `#020617`
- Panel: `#0f172a`
- Border: `#1e293b`
- Text Main: `#f1f5f9`
- Text Muted: `#64748b`
- Accent: `#38bdf8`

**Fonts:**
- Serif: Playfair Display
- Sans: Inter
- Mono: JetBrains Mono

All configured in `tailwind.config.ts`.

## 🔒 Security

- Row Level Security (RLS) enabled on all Supabase tables
- API routes validate input with Zod schemas
- Environment variables are properly scoped (PUBLIC vs server-only)
- Forms include CSRF protection via Next.js

## 📱 Mobile Responsive

All pages and components are fully responsive with:
- Mobile-first design approach
- Hamburger menu on mobile
- Optimized touch targets
- Responsive grid layouts

## ♿ Accessibility

The site includes:
- Skip to main content link
- Proper ARIA labels
- Focus visible states
- Reduced motion support
- Semantic HTML structure

## 📞 Support

For questions or issues:
- **Email:** hello@gravitasindex.com
- **Documentation:** See `IMPLEMENTATION_STATUS.md`
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs

## 📄 License

Proprietary - All rights reserved.

---

Built with Next.js 15, TypeScript, and Tailwind CSS.
