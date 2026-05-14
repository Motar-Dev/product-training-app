/**
 * This file connects to database!
 */

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { ENV } from '../config/env';

if (!ENV.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables.');
}

/**
 * Connection Pool?
 * - It is is a cache of database connections that are kept open and reused.
 *
 * Why we use it?
 * - Opening and closing connection is slow. So to save time
 *   we are reusing the existing ones, instead of creating a new connection
 *   for each request.
 * - Database limit concurrent connections. A "Pool" --> new Pool(), manages
 *   a fixed number of connections and shares them across requests.
 */

// initialize PostgreSQL connection pool
// OBS: the default is set to 10 requests
const pool = new Pool({ connectionString: ENV.DATABASE_URL });

// log when the first connection is made!
pool.on('connect', () => {
  console.log('Database connected successfully ✅');
});

// log when an error occurs
pool.on('error', (error) => {
  console.log('❌ Database connection error: ', error);
});

export const db = drizzle({ client: pool, schema });
