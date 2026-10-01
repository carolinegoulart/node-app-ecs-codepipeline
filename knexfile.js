// knexfile.js
import 'dotenv/config';

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Env ${name} not specified`);
  return v;
}

const useSsl = (process.env.PG_SSL || 'true').toLowerCase() === 'true';
const poolMin = Number(process.env.PG_POOL_MIN || 0);
const poolMax = Number(process.env.PG_POOL_MAX || 5);
const acquireMs = Number(process.env.PG_ACQUIRE_TIMEOUT || 15000);
const idleMs = Number(process.env.PG_IDLE_TIMEOUT || 30000);

let connection;

// If DATABASE_URL is set, ensure sslmode=require in the string
if (process.env.DATABASE_URL) {
  const u = new URL(process.env.DATABASE_URL);

  if (useSsl) {
    u.searchParams.set('sslmode', 'require'); // supported by the pg driver
  }

  connection = u.toString();
} else {
  // No fallback for localhost in production/ECS
  connection = {
    host: required('PG_HOST'),
    port: Number(process.env.PG_PORT || 5432),
    user: required('PG_USER'),
    password: required('PG_PASSWORD'),
    database: required('PG_DATABASE'),
    ssl: useSsl ? { rejectUnauthorized: false } : false,
    application_name: process.env.PG_APP_NAME || 'products-database',
    connectionTimeoutMillis: Number(process.env.PG_CONNECT_TIMEOUT || 10000),
  };
}

export default {
  client: 'pg',
  connection,
  migrations: { directory: './migrations' },
  seeds: { directory: './seeds' },
  pool: {
    min: poolMin,
    max: poolMax,
    acquireTimeoutMillis: acquireMs,
    idleTimeoutMillis: idleMs,
  },
};