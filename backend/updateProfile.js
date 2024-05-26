const Pool = require('pg').Pool; // for connecting to PostgreSQL

// Configure your database connection details
const pool = new Pool({
    host: process.env.PGHOST,
    name: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

async function updateUserProfile(userData) {
  const { name, phone, address, town, province, country, email } = userData;

  try {
    const client = await pool.connect();

    try {
      // Update user profile query
      const updateQuery = 'UPDATE users SET name = $1, phone = $2, address = $3, town = $4, province = $5, country = $6 WHERE email = $7';
      const values = [name, phone, address, town, province, country, email];

      await client.query(updateQuery, values);

      console.log(`User profile updated for email: ${email}`); // Log the change

      return { success: true, message: 'Profile updated successfully!' };
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error; // Re-throw the error for handling in the main application
  }
}

module.exports = { updateUserProfile }; // Export the function
