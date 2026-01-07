# Personal Finance Tracker

A premium, AI-powered personal finance management platform designed for clarity and growth. Track expenses, manage portfolios, and achieve financial goals with sophisticated design, intelligent insights, and an intuitive user experience.

> 📖 **New to the app?** Check out [HowToUse.md](./HowToUse.md) for a comprehensive user guide.

## Features

### AI-Powered Intelligence
- AI Financial Coach: Real-time personalized insights powered by Google Gemini 1.5 Flash, providing spending alerts, kudos for achievements, and actionable coaching tips.
- Interactive AI Chat: Natural language conversations about your finances with context-aware responses and smart recommendations.
- Anomaly Detection: Automatic identification of unusual spending patterns and financial outliers.

### Financial Health Monitoring
- Health Score Dashboard: Comprehensive scoring system (0-100) based on savings rate, budget adherence, and emergency fund progress.
- Visual Gauge Display: Animated circular gauge showing overall financial health with color-coded status indicators.
- Key Metrics Tracking: Real-time monitoring of savings rate percentage, budget adherence rate, and emergency fund progress.
- Personalized Action Plan: AI-generated recommendations for improving financial health with specific, actionable steps.

### Achievement System
- Badge Collection: Four achievement badges (Frugal King, Goal Crusher, Debt Slayer, Savings Star) with unlock criteria.
- Progress Tracking: Visual progress bars showing completion status for each badge.
- Gamification: Unlock badges by meeting financial milestones to stay motivated.

### Advanced Analytics
- Intelligence Dashboard: Comprehensive financial overview with interactive Shadcn UI charts including:
  - Income vs Expenses area chart with 6-month trends.
  - Spending breakdown pie chart with category insights.
  - Month-over-month comparison metrics.
  - Dynamic stat cards with percentage changes.
- Budget Overview: Visual spending flow with category percentages and total spending display.
- Activity Calendar: High-fidelity visualization of daily financial events to identify spending patterns.
- Budget Analytics: Visual progress tracking with threshold alerts and spending forecasts.

### Core Financial Management
- Transaction Engine: Precision recording of income, expenses, and internal transfers with CSV export and recurring logic support.
- Budgeting System: Define and monitor spending limits per category with visual progress analytics.
- Wealth Goals: Set sophisticated savings targets with deadline-based tracking and contribution history.
- Unified Account View: Seamless management of diverse asset types including Checking, Savings, Credit, Investments, and Cash.
- Adaptive Categories: Flexible, hierarchical category system with customizable visual identifiers.

### Premium User Experience
- Eye Protection Light Mode: Specialized warm-ivory theme designed to reduce blue light strain and provide a comfortable reading experience.
- Dark Mode Excellence: Sophisticated dark theme with OKLCH color model and refined UI elements.
- Responsive Design: Fully mobile-responsive interface optimized for all screen sizes.
- PWA Ready: Progressive Web App capabilities for native-like performance and offline access.
- Global Preferences: Multi-currency support (USD, INR, EUR, GBP, JPY), regional date formats, and customizable settings.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | React 18, TypeScript, Vite 7 |
| Styling | Tailwind CSS 4, Shadcn UI (Radix UI) |
| State Management | React Context API |
| Routing | React Router DOM 7 |
| Charts | Shadcn UI Charts (Recharts) |
| AI Integration | Google Gemini 1.5 Flash, React Markdown |
| Backend | Neon (PostgreSQL) |
| Icons | Lucide React, Hugeicons |
| Runtime | Bun |
| PWA | Vite PWA Plugin |
| Aesthetics | OKLCH Color Model, Refined Cards, Custom Filters |

## Key Highlights

### Financial Health Score
- Comprehensive scoring based on three pillars: savings rate (40% weight), budget adherence (30% weight), and emergency fund progress (30% weight).
- Interactive donut chart visualization with real-time updates.
- Detailed breakdown modal with actionable improvement steps.
- Status indicators: Excellent (80+), Good (60-79), Average (40-59), Needs Attention (below 40).

### Achievement Badges System
- Frugal King: Awarded for staying 20% under total budget with progress tracking.
- Goal Crusher: Unlocked when any savings goal reaches 100% completion.
- Debt Slayer: Earned by maintaining zero credit card debt.
- Savings Star: Granted for achieving 30% or higher savings rate.
- Visual progress indicators for locked badges with completion percentages.

### Recent Improvements
- Financial Health Score: Implemented comprehensive health monitoring with gauge visualization and actionable insights.
- Badges Grid: Added achievement system with progress tracking and unlock mechanics.
- Budget Overview: Enhanced spending flow visualization with category percentages and top spending identification.
- Accounts Page Redesign: Migrated to a clean Shadcn-based design with improved header, search, filtering, and sorting capabilities.
- Enhanced Dashboard Charts: Updated components with smooth animations, interactive tooltips, and premium styling.
- Refined Settings UI: Horizontal tabs layout with consistent rounded corners and cohesive design language.
- Mobile Responsive: Fully optimized for all screen sizes with adaptive layouts.
- AI Integration: Powered by Gemini 1.5 Flash for intelligent financial insights.
- Improved Logo Design: Modern finance-themed logo with emerald/teal gradient and abstract growth arrow.
- Bun Optimization: Fully transitioned to Bun for faster development and consistent environment.

## Prerequisites

- Bun (Latest version)
- A Neon account

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sunil-gumatimath/Personal-Finance-Tracker.git
   cd Personal-Finance-Tracker
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Environment Setup:**

   Create a `.env` file in the root directory:
   ```env
   VITE_NEON_DATABASE_URL=your_neon_database_url
   VITE_USE_NEON=true
   ```

4. **Database Setup:**
   - Create a new project in [Neon](https://neon.tech)
   - Run the setup script to get your connection string:
     ```bash
     ./scripts/setup-neon-project.sh
     ```
   - Execute `database/database-neon.sql` in your Neon SQL Editor
   - After your first login, run `SELECT seed_my_data();` to populate demo data

   **For existing Supabase users migrating to Neon:**
   - Keep your existing Supabase credentials temporarily
   - Set up Neon as described above
   - Run the migration script:
     ```bash
     bun run scripts/migrate-to-neon.ts
     ```

5. **AI Integration (Optional):**
   - Visit [Google AI Studio](https://aistudio.google.com)
   - Create an API Key
   - Add it in **Settings > AI Integration** within the app

6. **Start Development:**
   ```bash
   bun run dev
   ```

## Development Commands

**Start development server:**
```bash
bun run dev
```

**Type checking:**
```bash
bun run typecheck
```

**Linting:**
```bash
bun run lint
```

**Build for production:**
```bash
bun run build
```

## AI Features

The application includes powerful AI-driven insights powered by Google Gemini 1.5 Flash:

### AI Financial Coach
- Appears on the dashboard with real-time insights.
- Provides spending alerts, achievements, and coaching tips.
- Automatically rotates through multiple insights.
- Click Chat to open the full AI Assistant.

### AI Assistant
- Natural language conversations about your finances.
- Context-aware responses based on your actual financial data.
- Ask questions like:
  - "How much did I spend on dining last month?"
  - "What are my top spending categories?"
  - "Give me tips to save more money."
  - "Am I on track with my budget?"

Note: AI features require a Gemini API key. Add it in Settings > AI Integration.

## Deployment

### Vercel (Recommended)

The project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Configure environment variables:
   - `VITE_NEON_DATABASE_URL`
   - `VITE_USE_NEON=true`
4. Deploy with Bun runtime for optimal performance

### Docker

Build and run with Docker Compose:

```bash
docker-compose up --build
```

Access the application at `http://localhost:8080`

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React Context providers
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utilities and helpers
│   ├── pages/          # Main application pages
│   └── types/          # TypeScript type definitions
├── database/           # Database schema and migrations
├── public/             # Static assets
└── scripts/            # Utility scripts
```

## Database Schema

The application uses Neon (PostgreSQL) with the following data model:

| Table | Description |
| ------- | ------------- |
| **profiles** | User profiles with currency preferences and personal information |
| **accounts** | Financial accounts (checking, savings, credit, investment, cash) with balances |
| **categories** | Transaction categories for income and expenses with custom colors and icons |
| **transactions** | Financial transactions with support for recurring entries and categorization |
| **budgets** | Spending limits per category with weekly, monthly, or yearly periods |
| **goals** | Savings goals with target amounts, deadlines, and progress tracking |

**Security:** All tables include Row Level Security (RLS) policies to ensure data privacy and user isolation.

## Support

For questions or issues, please open an issue on GitHub or check out the [HowToUse.md](./HowToUse.md) guide.

## License

This project is free and open-source software licensed under the MIT License.

