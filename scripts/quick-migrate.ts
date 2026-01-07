/**
 * Quick Migration Helper
 * Helps you get started with Neon migration
 */

import { neon } from '@neondatabase/serverless';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('🚀 Neon Migration Helper\n');

  const neonUrl = process.env.VITE_NEON_DATABASE_URL;

  if (!neonUrl) {
    console.log('❌ VITE_NEON_DATABASE_URL not found in .env\n');
    console.log('Please:');
    console.log('1. Create a Neon project at https://console.neon.tech');
    console.log('2. Get your connection string from Connection Details');
    console.log('3. Add it to .env as VITE_NEON_DATABASE_URL\n');

    const hasUrl = await question('Do you have a connection string? (y/n): ');

    if (hasUrl.toLowerCase() === 'y') {
      const url = await question('Paste your Neon connection string: ');
      console.log('\n✅ Add this to your .env file:');
      console.log(`VITE_NEON_DATABASE_URL=${url}\n`);
    }

    rl.close();
    return;
  }

  console.log('✅ Neon connection string found\n');
  console.log('Testing connection...\n');

  try {
    const sql = neon(neonUrl);
    const result = await sql`SELECT NOW() as current_time, version() as pg_version`;

    console.log('✅ Connection successful!');
    console.log(`   Database time: ${result[0]?.current_time}`);
    console.log(`   PostgreSQL: ${result[0]?.pg_version?.split(' ')[0]}\n`);

    // Check if schema exists
    const tablesResult = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;

    const tables = tablesResult.map((r: any) => r.table_name);

    if (tables.length === 0) {
      console.log('⚠️  No tables found. You need to import the schema first.\n');
      console.log('Next steps:');
      console.log('1. Go to Neon Dashboard → SQL Editor');
      console.log('2. Open supabase/database-neon.sql');
      console.log('3. Copy and paste into SQL Editor');
      console.log('4. Click "Run"\n');
    } else {
      console.log(`✅ Found ${tables.length} tables:`);
      tables.forEach((table: string) => console.log(`   - ${table}`));
      console.log('');

      // Check for data
      const hasData = await sql`SELECT COUNT(*) as count FROM profiles`;
      const count = parseInt(hasData[0]?.count || '0');

      if (count === 0) {
        console.log('⚠️  No data found. Run migration script to import data.\n');
        console.log('Run: bun run scripts/migrate-to-neon.ts\n');
      } else {
        console.log(`✅ Found ${count} profiles. Data migration may be complete.\n`);
      }
    }

    console.log('📋 Migration Status:');
    console.log('   ✅ Connection: Working');
    console.log(`   ${tables.length > 0 ? '✅' : '❌'} Schema: ${tables.length > 0 ? 'Imported' : 'Not imported'}`);
    console.log(`   ${tables.length > 0 ? '✅' : '❌'} Data: ${tables.length > 0 ? 'Check above' : 'N/A'}\n`);

  } catch (error: any) {
    console.error('❌ Connection failed:', error.message);
    console.log('\nPlease check:');
    console.log('1. Connection string is correct');
    console.log('2. Database is accessible');
    console.log('3. SSL mode is set correctly\n');
  }

  rl.close();
}

main();
