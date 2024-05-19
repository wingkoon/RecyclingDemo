-- Create table for Waste Categories
CREATE TABLE IF NOT EXISTS waste_categories (
  id SERIAL PRIMARY KEY,  -- Use SERIAL for auto-incrementing ID
  category_name TEXT NOT NULL UNIQUE
);

-- Create table for Recycling Service Providers
CREATE TABLE IF NOT EXISTS providers (
  id SERIAL PRIMARY KEY,  -- Use SERIAL for auto-incrementing ID
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  phone VARCHAR(20),
  address TEXT
);

-- Create table for Locations (Define before referencing in Users)
CREATE TABLE IF NOT EXISTS locations (
  id SERIAL PRIMARY KEY,  -- Use SERIAL for auto-incrementing ID
  town VARCHAR(255) UNIQUE  -- Unique constraint on town (one town per entry)
);

-- Create table for Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,  -- Use SERIAL for auto-incrementing ID
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  town TEXT REFERENCES locations(town),  -- Foreign key references locations.town
  province TEXT,
  country TEXT
);



CREATE TABLE wastes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id), -- Foreign key references users.id
  wastes_type VARCHAR(255) NOT NULL,
  quantity INTEGER,
  condition TEXT,
  scheduled BOOLEAN DEFAULT FALSE,  -- Optional: Flag to indicate pickup scheduling
  date DATE NOT NULL
);

CREATE TABLE service_options (
  id SERIAL PRIMARY KEY,
  provider_id INTEGER NOT NULL REFERENCES providers(id), -- Foreign key references providers.id
  location_id INTEGER NOT NULL REFERENCES locations(id), -- Foreign key references locations.id
  waste_type VARCHAR(255) NOT NULL, -- Foreign key references wastes.wastes_type
  service_details TEXT,  -- Optional: Details about the collection service (e.g., pricing, collection frequency)
  UNIQUE (provider_id, location_id, waste_type)  -- Ensures unique service per provider, location, and waste type
);

-- Create table for Waste Collection Events (Optional)
CREATE TABLE IF NOT EXISTS waste_collection_events (
  id SERIAL PRIMARY KEY,
  organizer_name TEXT,
  location TEXT,
  date DATE,
  accepted_waste_categories TEXT,
  description TEXT
);

-- Create table for User-Event Enrollments (Optional: Many-to-Many relationship between Users and Events)
CREATE TABLE IF NOT EXISTS user_event_enrollments (
  user_id INTEGER REFERENCES users(id), 
  event_id INTEGER REFERENCES waste_collection_events(id),
  PRIMARY KEY (user_id, event_id)  -- Composite primary key for unique enrollments
);

