// MariaDB connection pool (server-only). Config from environment — see .env.example.
import mysql from 'mysql2/promise'

let pool

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: Number(process.env.DB_POOL || 10),
      charset: 'utf8mb4',
    })
  }
  return pool
}

// MariaDB returns JSON columns as strings via mysql2 — parse defensively.
export function parseJson(value) {
  if (value == null) return null
  if (typeof value === 'object') return value
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}
