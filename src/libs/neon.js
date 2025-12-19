require("dotenv").config();

const { Pool } = require("pg");

const {
  pgHost,
  pgDatabase,
  pgUser,
  pgPassword,
} = require("./../config/config");

const pool = new Pool({
  host: pgHost,
  database: pgDatabase,
  user: pgUser,
  password: pgPassword,
  port: 5432,
  ssl: {
    require: true,
  },
});

console.log("CONEXION EXITOSA", pool);

async function getPgVersion() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT version()");
    console.log(result.rows[0]);
  } finally {
    client.release();
  }
}

getPgVersion();
