const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8001;
const Pool = require('pg').Pool; // for connecting to PostgreSQL
const ENV = require("./environment");

const app = require("./application")(ENV);
const updateProfile = require("./updateProfile");
const morgan = require('morgan');
const cors = require('cors');
const pg = require("pg");
const frontport = 'http://localhost:3000';

const pool = new pg.Pool({
  host: process.env.PGHOST,
  name: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

pool
  .connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

//app.use(cors({ origin: 'api/login' })); // Replace with your frontend origin
// ... (rest of your server code)
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode.`);
});

app.use(bodyParser.json()); // Parse incoming JSON data
app.use(cors());
app.use(morgan('dev'));

// Login API endpoint
app.post(frontport + '/api/user/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login data:', req.body, email); // Log the entire request body

  try {
    // Check if user exists
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Validate password (replace with your password hashing/encryption logic for a real application)
    // ... (compare password with stored password in database - not implemented here for demonstration)
    //if (!/* password matches */) {
    //  return res.status(401).json({ success: false, message: 'Invalid email or password' });
    //}

    // Login successful, generate a token (replace with your preferred token generation method)
    const token = 'your_token_generation_logic(existingUser.id)'; // Example placeholder

    // Respond with success and token
    res.json({ success: true, message: 'Login successful!', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// Registration API endpoint (modified)
app.post(frontport + '/api/user/register', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received registration data:', req.body, email); // Log the entire request body

  try {
    // Check if user already exists
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Create a new user
    const [result] = await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    const userId = result.insertId; // Get the newly inserted user ID

    // Generate a session token (replace with your preferred token generation method)
    const token = 'your_token_generation_logic(userId)'; // Example placeholder

    // Respond with success, user ID, and token
    res.status(201).json({ success: true, message: 'Registration successful!', user: { id: userId }, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

app.get(frontport + '/api/user/profile', (req,res) => {
  const userData = req.body;
    console.log("profile received");
});

app.post(frontport + '/api/user/profile', async (req, res) => {
  try {
    const userData = req.body;
    console.log("profile received");
    const response = await userProfile.updateUserProfile(userData);

    res.json(response); // Send success response
  } catch (error) {
    console.error('Error processing user profile update:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
