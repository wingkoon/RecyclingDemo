const Pool = require('pg').Pool; // for connecting to PostgreSQL
const ENV = require("./environment");
const fs = require('fs');

const pg = require("pg");
const dbpool = {
    host: process.env.PGHOST,
    name: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
  };
  
  const pool = new Pool(dbpool);

async function resetDatabase() {
  try {
    await pool.connect();
    console.log('Connected to database');

    // Read and execute contents of create.sql
    const createScript = await fs.promises.readFile('./db/schema/create.sql', 'utf8');
    await pool.query(createScript);
    console.log('create.sql executed');

    // Read and execute contents of development.sql (optional)
    
      const devScript = await fs.promises.readFile('./db/schema/development.sql', 'utf8');
      await pool.query(devScript);
      console.log('development.sql executed');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await pool.end();
    console.log('Connection closed');
  }
}

resetDatabase()
  .then(() => console.log('Database reset complete.'))
  .catch((error) => console.error(error));
