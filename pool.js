
// src/db/pool.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sepatuDwiki',
  password: '654321',
  port: '5432',
});

module.exports = pool;
