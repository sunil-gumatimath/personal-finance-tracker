# FinanceTrack

A comprehensive personal finance management application designed to help users track expenses, manage budgets, and achieve financial goals. Built with modern web technologies for a responsive and intuitive user experience.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)

## Features

- **Dashboard** - Real-time overview of financial health including total balance, monthly income, expenses, and net savings with visual spending charts and category breakdowns
- **Transaction Management** - Record income, expenses, and transfers with support for recurring transactions and CSV export
- **Budgeting** - Create and track budgets per category with visual progress indicators and alerts
- **Financial Goals** - Set savings targets with deadlines and track contributions over time
- **Calendar View** - Monthly visualization of financial activities to track daily spending patterns
- **Account Management** - Support for multiple account types (Checking, Savings, Credit Cards, Investments, Cash)
- **Category Customization** - Flexible category system for organizing income and expenses
- **Customizable Settings** - Light/Dark/System themes, multiple currencies (USD, EUR, GBP, JPY, INR), date formats, and notification preferences
- **Category Customization** - Flexible category system for organizing income and expenses
- **Security** - Secure authentication with Row Level Security (RLS) ensuring data privacy
- **Mobile-First** - Fully responsive design with Progressive Web App (PWA) support for offline access

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, TypeScript, Vite 7 |
| **Styling** | Tailwind CSS 4, Shadcn UI (Radix UI) |
| **State Management** | React Context API |
| **Routing** | React Router DOM 7 |
| **Charts** | Recharts |
| **Backend** | Supabase (PostgreSQL, Authentication) |
| **Icons** | Lucide React |
| **PWA** | Vite PWA Plugin |
| **Deployment** | Docker, Vercel |

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or bun
- A Supabase account

## Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd finance-track
    ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:

   ```bash
   cp .env.example .env
   ```

   Update with your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**

    - Log in to your Supabase dashboard
    - Navigate to the SQL Editor
    - Copy the contents of `supabase/database.sql` and execute it
    - This sets up all tables, RLS policies, and functions
    - After signing up in the app, run `SELECT seed_my_data();` in the SQL Editor to populate demo data

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Docker Deployment

Build and run with Docker Compose:

```bash
docker-compose up --build
```

The application will be available at `http://localhost:8080`

Or build the Docker image directly:

```bash
docker build -t finance-track .
docker run -p 8080:80 finance-track
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── dashboard/    # Dashboard-specific components
│   ├── layout/       # Layout components (Sidebar, Header)
│   └── ui/           # Shadcn UI components
├── contexts/         # React Context providers
├── hooks/            # Custom React hooks
├── lib/              # Utilities and Supabase client
├── pages/            # Main application views
└── types/            # TypeScript definitions
```

## Database Schema

| Table | Description |
|-------|-------------|
| `profiles` | User information, preferences, and currency settings |
| `accounts` | Financial accounts (checking, savings, credit cards, investments, cash) |
| `categories` | Income and expense categories with customizable colors and icons |
| `transactions` | Financial records with support for recurring transactions |
| `budgets` | Spending limits per category with configurable periods |
| `goals` | Savings targets with progress tracking |

All tables are protected by Row Level Security (RLS) policies, ensuring users can only access their own data.

## License

This project is open source and available under the [MIT License](LICENSE).
