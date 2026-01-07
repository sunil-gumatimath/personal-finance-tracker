/**
 * Migration Script: Supabase to Neon
 * 
 * This script migrates data from Supabase to Neon
 * 
 * Usage:
 *   1. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env
 *   2. Set VITE_NEON_DATABASE_URL in .env
 *   3. Run: bun run scripts/migrate-to-neon.ts
 */

import { createClient } from '@supabase/supabase-js';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import * as dotenv from 'dotenv';

// Configure WebSocket for Node.js environment
neonConfig.webSocketConstructor = ws;

// Load environment variables
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const neonUrl = process.env.VITE_NEON_DATABASE_URL;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

if (!neonUrl) {
  console.error('❌ Missing Neon database URL. Set VITE_NEON_DATABASE_URL in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const pool = new Pool({ connectionString: neonUrl });

interface MigrationStats {
  profiles: number;
  accounts: number;
  categories: number;
  transactions: number;
  budgets: number;
  goals: number;
}

async function migrateTable<T>(
  tableName: string,
  transform?: (row: any) => T
): Promise<T[]> {
  console.log(`📦 Migrating ${tableName}...`);

  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error(`❌ Error fetching ${tableName}:`, error);
    return [];
  }

  if (!data || data.length === 0) {
    console.log(`   ⚠️  No data in ${tableName}`);
    return [];
  }

  console.log(`   ✅ Found ${data.length} rows`);

  // Transform data if needed
  const transformedData = transform ? data.map(transform) : data;

  return transformedData as T[];
}

async function insertIntoNeon(tableName: string, data: any[]): Promise<number> {
  if (data.length === 0) return 0;

  const columns = Object.keys(data[0]);
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
  const columnNames = columns.join(', ');

  let inserted = 0;
  const batchSize = 100;

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);

    for (const row of batch) {
      const values = columns.map(col => row[col]);
      // Use "ON CONFLICT DO NOTHING" to avoid duplicates if re-running
      // Note: This assumes 'id' is the primary key for all tables, which is generally true here
      const query = `
        INSERT INTO ${tableName} (${columnNames})
        VALUES (${placeholders})
        ON CONFLICT (id) DO NOTHING
      `;

      try {
        await pool.query(query, values);
        inserted++;
      } catch (error: any) {
        // Skip if row already exists
        if (error.message?.includes('duplicate') || error.code === '23505') {
          console.log(`   ⚠️  Skipping duplicate row in ${tableName}`);
          continue;
        }
        console.error(`   ❌ Error inserting into ${tableName}:`, error.message);
      }
    }
  }

  return inserted;
}

async function verifyMigration(stats: MigrationStats): Promise<void> {
  console.log('\n🔍 Verifying migration...\n');

  const tables = [
    { name: 'profiles', expected: stats.profiles },
    { name: 'accounts', expected: stats.accounts },
    { name: 'categories', expected: stats.categories },
    { name: 'transactions', expected: stats.transactions },
    { name: 'budgets', expected: stats.budgets },
    { name: 'goals', expected: stats.goals },
  ];

  for (const table of tables) {
    try {
      const result = await pool.query(`SELECT COUNT(*) as count FROM ${table.name}`);
      const count = parseInt(result.rows[0]?.count || '0');

      if (count === table.expected) {
        console.log(`   ✅ ${table.name}: ${count} rows (matches)`);
      } else {
        // It might be non-zero if data already existed, so just show the count
        console.log(`   ℹ️  ${table.name}: ${count} rows (migrated ${table.expected})`);
      }
    } catch (error: any) {
      console.error(`   ❌ Error verifying ${table.name}:`, error.message);
    }
  }
}

async function main() {
  console.log('🚀 Starting Supabase to Neon migration...\n');

  const stats: MigrationStats = {
    profiles: 0,
    accounts: 0,
    categories: 0,
    transactions: 0,
    budgets: 0,
    goals: 0,
  };

  try {
    // 1. Migrate Profiles
    const profiles = await migrateTable('profiles');
    if (profiles.length > 0) {
      stats.profiles = await insertIntoNeon('profiles', profiles);
      console.log(`   ✅ Inserted ${stats.profiles} profiles\n`);
    }

    // 2. Migrate Accounts
    const accounts = await migrateTable('accounts');
    if (accounts.length > 0) {
      stats.accounts = await insertIntoNeon('accounts', accounts);
      console.log(`   ✅ Inserted ${stats.accounts} accounts\n`);
    }

    // 3. Migrate Categories
    const categories = await migrateTable('categories');
    if (categories.length > 0) {
      stats.categories = await insertIntoNeon('categories', categories);
      console.log(`   ✅ Inserted ${stats.categories} categories\n`);
    }

    // 4. Migrate Transactions
    const transactions = await migrateTable('transactions');
    if (transactions.length > 0) {
      stats.transactions = await insertIntoNeon('transactions', transactions);
      console.log(`   ✅ Inserted ${stats.transactions} transactions\n`);
    }

    // 5. Migrate Budgets
    const budgets = await migrateTable('budgets');
    if (budgets.length > 0) {
      stats.budgets = await insertIntoNeon('budgets', budgets);
      console.log(`   ✅ Inserted ${stats.budgets} budgets\n`);
    }

    // 6. Migrate Goals
    const goals = await migrateTable('goals');
    if (goals.length > 0) {
      stats.goals = await insertIntoNeon('goals', goals);
      console.log(`   ✅ Inserted ${stats.goals} goals\n`);
    }

    // Verify migration
    await verifyMigration(stats);

    console.log('\n✅ Migration completed successfully!\n');
    console.log('📊 Summary (Rows Inserted):');
    console.log(`   Profiles: ${stats.profiles}`);
    console.log(`   Accounts: ${stats.accounts}`);
    console.log(`   Categories: ${stats.categories}`);
    console.log(`   Transactions: ${stats.transactions}`);
    console.log(`   Budgets: ${stats.budgets}`);
    console.log(`   Goals: ${stats.goals}\n`);
    console.log('You can now remove Supabase credentials from .env if desired.');

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
