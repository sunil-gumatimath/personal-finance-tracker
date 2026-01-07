
import { query } from '../src/lib/neon';

async function check() {
    try {
        const { rows } = await query('SELECT id, email, full_name FROM users');
        console.log('All Users in DB:', rows);
    } catch (error) {
        console.error('Error checking users:', error);
    }
}

check();
