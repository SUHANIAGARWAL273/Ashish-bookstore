import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.RDS_HOST,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DATABASE,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});