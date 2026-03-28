import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool(): Pool | null {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return null;
  }

  pool ??= new Pool({ connectionString: databaseUrl });
  return pool;
}
