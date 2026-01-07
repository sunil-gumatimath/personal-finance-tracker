
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Configure WebSocket for Node.js environment
neonConfig.webSocketConstructor = ws;

// Load environment variables
dotenv.config({ path: '.env' });

const neonUrl = process.env.VITE_NEON_DATABASE_URL;

if (!neonUrl) {
    console.error('❌ Missing Neon database URL. Set VITE_NEON_DATABASE_URL in .env');
    process.exit(1);
}

const pool = new Pool({ connectionString: neonUrl });

async function main() {
    console.log('🚀 Setting up Neon schema...\n');

    try {
        const sqlPath = path.join(process.cwd(), 'supabase', 'database-neon.sql');
        if (!fs.existsSync(sqlPath)) {
            throw new Error(`Schema file not found at ${sqlPath}`);
        }

        const sqlContent = fs.readFileSync(sqlPath, 'utf8');
        console.log(`📖 Read schema file (${sqlContent.length} bytes)`);

        console.log('⚡ Executing SQL...');
        await pool.query(sqlContent);

        console.log('\n✅ Schema applied successfully!');

        // Quick verification
        const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    `);

        console.log(`\nVerified Tables (${result.rowCount}):`);
        result.rows.forEach((row: any) => console.log(`   - ${row.table_name}`));

    } catch (error) {
        console.error('\n❌ Schema setup failed:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

main();
