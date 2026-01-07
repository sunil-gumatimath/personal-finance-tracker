
import { query } from '../src/lib/neon';

async function check() {
    const email = 'sunilgumatimath38@gmail.com';
    try {
        const { rows } = await query('SELECT id, email FROM users WHERE email = $1', [email]);
        console.log('User in DB:', rows);
    } catch (error) {
        console.error('Error checking user:', error);
    }
}

check();
