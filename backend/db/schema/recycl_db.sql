-- Create table for Waste Categories
CREATE TABLE IF NOT EXISTS waste_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_name TEXT NOT NULL UNIQUE
);

-- Create table for Recycling Service Providers
CREATE TABLE IF NOT EXISTS providers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
 email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
 phone INTEGER VARCHAR(9),
  address TEXT,
  accepted_waste_types TEXT
);

-- Create table for Users
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  phone INTEGER VARCHAR(9),
  address TEXT,
  town TEXT REFERENCES locations(town)  -- Foreign key,
  province TEXT,
  country TEXT
);

CREATE TABLE locations (
  town VARCHAR(255) PRIMARY KEY
);

CREATE TABLE wastes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  waste_type VARCHAR(255) NOT NULL,
  date DATE NOT NULL
);

  waste_category_id INTEGER REFERENCES waste_categories(id),
  waste_type TEXT,
  waste_quantity INTEGER,
  waste_condition TEXT,
  pickup_scheduled BOOLEAN DEFAULT FALSE  -- Optional: Flag to indicate pickup scheduling
);

CREATE TABLE IF NOT EXISTS wastes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  user
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  phone INTEGER VARCHAR(9),
  address TEXT,
  province TEXT,
  country TEXT,
  waste_category_id INTEGER REFERENCES waste_categories(id),
  waste_type TEXT,
  waste_quantity INTEGER,
  waste_condition TEXT,
  pickup_scheduled BOOLEAN DEFAULT FALSE  -- Optional: Flag to indicate pickup scheduling
);


-- Create table for Waste Collection Events (Optional)
CREATE TABLE IF NOT EXISTS waste_collection_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  organizer_name TEXT,
  location TEXT,
  date DATETIME,
  accepted_waste_categories TEXT,
  description TEXT
);

-- Create table for User-Event Enrollments (Optional: Many-to-Many relationship between Users and Events)
CREATE TABLE IF NOT EXISTS user_event_enrollments (
  user_id INTEGER REFERENCES users(id),
  event_id INTEGER REFERENCES waste_collection_events(id),
  PRIMARY KEY (user_id, event_id)  -- Composite primary key for unique enrollments
);