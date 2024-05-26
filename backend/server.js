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
const http = require('http');
const backport = 'http://localhost:8001'

let userEmail = "";
let providerEmail = "";
let userId = 0;
let providerId = 0;
let userProfile;

const dbpool = {
  host: process.env.PGHOST,
  name: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
};

const pool = new Pool(dbpool);

pool
  .connect()
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

//app.use(cors({ origin: 'api/login' })); // Replace with your frontend origin
// ... (rest of your server code)


app.use(bodyParser.json()); // Parse incoming JSON data
app.use(cors());
app.use(morgan('dev'));

  app.post('/api/user/login', async (req, res) => {
    let useremail;
    let refPassword;
const {email, password} = req.body;
    console.log(email, password);
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
      userProfile = result.rows[0];
      if (!userProfile) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      } else {
      useremail = userProfile.email;
      refPassword = userProfile.password;
      }
      if (!useremail) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  
      // Implement password validation logic here (e.g., bcrypt)
      // ... (code to validate password against user.password)
  
      if (password != refPassword) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  
      // Login successful, send relevant user information (excluding password)
      
      res.status(200).json({ success: true, userProfile: userProfile });
      console.log(userProfile);
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  
// Registration API endpoint (modified)
app.post('/api/user/register', async (req, res) => {
  const email = req.body.email;
    const password = req.body.password;
  
  console.log('Received registration data:', req.body, email); // Log the entire request body

  
try {
    // Check if user already exists
    
    let { rows }  = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }
} catch (error) {
  console.error('Registration error:', error);
}
    // Create a new user
    try {
      // Insert the user into the USERS table
      await pool.query(
          'INSERT INTO users (email, password) VALUES ($1, $2)',
          [email, password]
      );
      return res.status(201).json({ success: true});
  } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }

});


// Route to update user profile
app.post('/api/user/profile', async (req, res) => {
  const { id, email, password, name, phone, address, town, province, country } = req.body;

  try {
    const client = await pool.connect();
    await client.query('UPDATE users SET name = $1, phone = $2, address = $3, town = $4, province = $5, country = $6 WHERE id = $7',
      [name, phone, address, town, province, country, id]);

    client.release();
    return res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/location', async (req, res) => {
const town = req.body.town;
console.log(town);
try{
  const result = await pool.query('SELECT id FROM locations WHERE town = $1;', [town]);
  const id = result.rows[0].id;
  res.status(200).json({ success: true, id: id });
  console.log(id);
} catch (error) {
  console.error('Error adding user:', error);
}});

app.post('/api/user/waste', async (req, res) => {
  const {userId, wasteType, locationId, quantity, condition} = req.body;
  console.log(req.body);
  try {
   const waste = await pool.query(
        'INSERT INTO wastes (user_id, wastes_type, location_id, quantity, condition) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [userId, wasteType, locationId, quantity, condition]
    );
    const wasteId = waste.rows[0].id;
    console.log(wasteId);
    const result = await pool.query('SELECT provider_id FROM service_options WHERE location_id = $1 AND waste_type ILIKE $2;', [locationId, wasteType]);
   console.log(result.rows);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No matching service options found' }); // Use status 404 (Not Found)
    }else{
      const updateresult = result.rows;
for (let i = 0; i < result.rows.length; i++) {
    const record = await pool.query('SELECT email, organization, phone FROM providers WHERE id = $1;', [result.rows[i].provider_id]);
    Object.assign(updateresult[i], record.rows[0]);
}
    res.status(200).json({ success: true, result: updateresult, id: wasteId });
    console.log(updateresult, wasteId);
}
  } catch (error) {
    console.error('Error fetching service options:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' }); // Generic error for unexpected issues
  }
});

app.post('/api/matched', async (req, res) => {
  const {userId, wasteId, providerId} = req. body;
  console.log(req.body);
  try {
    const matched = await pool.query(
         'INSERT INTO matchd (user_id, waste_id, provider_id) VALUES ($1, $2, $3) RETURNING id',
         [userId, wasteId, providerId]
     );
     console.log(matched);
    } catch (error) {
      console.error('Error', error);
    }
});


app.post('/api/provider/login', async (req, res) => {
  let useremail;
  let refPassword;
const {email, password} = req.body;
  console.log(email, password);
  try {
    const result = await pool.query('SELECT * FROM providers WHERE email = $1;', [email]);
    userProfile = result.rows[0];
    if (!userProfile) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    } else {
    useremail = userProfile.email;
    refPassword = userProfile.password;
    }
    if (!useremail) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Implement password validation logic here (e.g., bcrypt)
    // ... (code to validate password against user.password)

    if (password != refPassword) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Login successful, send relevant user information (excluding password)
    
    res.status(200).json({ success: true, userProfile: userProfile });
    console.log(userProfile);
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Registration API endpoint (modified)
app.post('/api/provider/register', async (req, res) => {
const email = req.body.email;
  const password = req.body.password;

console.log('Received registration data:', req.body, email); // Log the entire request body


try {
  // Check if user already exists
  
  let { rows }  = await pool.query('SELECT * FROM providers WHERE email = $1', [email]);
  if (rows.length > 0) {
    return res.status(400).json({ success: false, message: 'Email already in use' });
  }
} catch (error) {
console.error('Registration error:', error);
}
  // Create a new user
  try {
    // Insert the user into the USERS table
    await pool.query(
        'INSERT INTO providers (email, password) VALUES ($1, $2)',
        [email, password]
    );
    res.status(201).json({ success: true});
} catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal server error' });
}

});








app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode.`);
});

module.exports = pool;

