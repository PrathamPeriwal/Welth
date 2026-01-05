# Ledgerly

**AI-Powered Personal Finance Management Platform**

## 📖 Overview

Ledgerly is a modern, full-stack financial management application that leverages artificial intelligence to help users track spending, manage budgets, and gain actionable financial insights—all through an intuitive interface powered by receipt scanning and automated analysis.

## ⭐ Key Features

### 💰 Transaction Management
- Multi-account support with detailed transaction history
- Real-time balance tracking and transaction flows
- Advanced filtering and bulk operations

### 📊 Budget Management & Insights
- Set monthly category budgets with alerts
- AI-generated financial insights (monthly)
- Automated email reports with analytics

### 🧾 Intelligent Receipt Scanning
- Upload receipts and auto-extract transaction details
- Google Gemini 2.5 Flash vision model
- Smart categorization with form auto-population

### 🔄 Automation
- Automatic recurring transaction detection
- Scheduled background jobs with Inngest
- Monthly cron jobs for reports and alerts

### 🔐 Security
- ArcJet protection (bot detection, DDoS shield)
- Clerk authentication (OAuth, email/password, MFA)
- Rate limiting (10 req/hour per user)

## 🛠️ Tech Stack

### Frontend & Framework
- **Next.js** - React 19 with App Router
- **React 19** - Modern UI with automatic batching and transitions
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component primitives

### Backend & Data
- **PostgreSQL** - Relational database with advanced features
- **Prisma ORM** - Type-safe ORM with auto-generated migrations
- **Node.js** - Runtime environment

### AI & Vision
- **Google Generative AI** - Gemini 2.5 Flash for receipt scanning and insights
- **Vision API Integration** - Advanced image analysis and data extraction

### Authentication & Security
- **Clerk** - Complete authentication platform (OAuth, email/password, MFA)
- **ArcJet** - Bot detection, rate limiting, DDoS shield

### Automation & Jobs
- **Inngest** - Background job scheduling and orchestration
- **Cron Functions** - Scheduled tasks for reports and recurring transactions

### Email & Notifications
- **Resend** - Email delivery service
- **React Email** - JSX-based email templates


## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- API Keys:
  - Google Generative AI key: (https://aistudio.google.com/apikey)
  - Clerk keys: (https://dashboard.clerk.com)
  - Resend API key: (https://resend.com)
  - ArcJet key: (https://arcjet.com)

### Installation

```bash
git clone <repository-url>
cd ai-finance-platform

npm install

cp .env.example .env.local

npx prisma migrate dev

npm run dev
```

The application will be available at `http://localhost:3000`

## 🔑 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ledgerly"
DIRECT_URL="postgresql://user:password@localhost:5432/ledgerly"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

# Google Generative AI
GEMINI_API_KEY="your_gemini_api_key_here"

# Resend Email Service
RESEND_API_KEY="your_resend_api_key_here"

# ArcJet Security
ARCJET_KEY="your_arcjet_key_here"

# Inngest Background Jobs
INNGEST_EVENT_KEY="your_inngest_event_key_here"
INNGEST_SIGNING_KEY="your_inngest_signing_key_here"
```

## 📁 Project Structure

```
ledgerly/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages (sign-in, sign-up)
│   ├── (main)/                   # Main app pages (dashboard, accounts, transactions)
│   ├── api/                      # API routes
│   ├── lib/                      # Application schema
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Landing page
│
├── actions/                      # Server actions
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Radix UI + Tailwind 
│
├── lib/                          # Core utilities & services
│
├── hooks/                        # Custom React hooks
│
├── prisma/                       # Database
│
├── emails/                       # Email templates
│
├── data/                         # Static data
│
├── public/                       # Static assets
│
├── package.json
├── configuration files
├── .env.local                    # Environment variables
└── README.md
```

## 📚 Support & Resources

- **Documentation**: See inline code comments and JSDoc annotations
- **Clerk Docs**: https://clerk.com/docs
- **Google Gemini API**: https://ai.google.dev/gemini-api
- **Prisma Docs**: https://www.prisma.io/docs
- **Inngest Docs**: https://www.inngest.com/docs
- **Next.js Docs**: https://nextjs.org/docs

## 📄 License

This project is licensed under the MIT License 

---

**Built with ❤️ for better financial management**
