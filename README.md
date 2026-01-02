# Personal Finance Tracker

A premium, AI-powered personal finance management platform designed for clarity and growth. Track expenses, manage portfolios, and achieve financial goals with sophisticated design, intelligent insights, and an intuitive user experience.

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
| Backend | Supabase (PostgreSQL, Auth, RLS) |
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
- A Supabase account

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd personal-finance-tracker
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Environment Setup:
   Create a .env file in the root directory:
   ```bash
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Adding Your Gemini API Key:
   - Visit Google AI Studio.
   - Sign in with your Google account.
   - Create an API Key and copy it.
   - Add it in Settings > AI Integration within the application.

5. Database Initialization:
   - Execute supabase/database.sql in your Supabase SQL Editor.
   - Run `SELECT seed_my_data();` after your first login to populate the dashboard with demonstration data.

## Development

```bash
bun run dev
```

## Type Checking

```bash
bun run typecheck
```

## Linting

```bash
bun run lint
```

## Building for Production

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

### Vercel
The project is optimized for deployment on Vercel using Bun. Ensure your build settings use Bun for the fastest and most reliable deployment.

### Docker
Build and run with Docker Compose for production-grade hosting:
```bash
docker-compose up --build
```
The application will be accessible at http://localhost:8080.

## Database Schema

The application uses the following data model:

- **profiles**: User profiles with currency preferences and personal information.
- **accounts**: Financial accounts (checking, savings, credit, investment, cash) with balances.
- **categories**: Transaction categories for income and expenses with custom colors and icons.
- **transactions**: Financial transactions with support for recurring entries and categorization.
- **budgets**: Spending limits per category with weekly, monthly, or yearly periods.
- **goals**: Savings goals with target amounts, deadlines, and progress tracking.

All tables include Row Level Security (RLS) policies to ensure data privacy.

## License

This project is free and open-source software licensed under the MIT License.
