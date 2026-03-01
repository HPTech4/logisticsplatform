# SUPABASE QUICK REFERENCE - All Code in One Place

## IMPORTANT FILES & CODE SNIPPETS

---

## 1. `.env` FILE TEMPLATE

Create this file in your backend root directory: `backend/.env`

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-from-supabase-dashboard
JWT_SECRET=your-super-secret-random-string-here
PORT=3000
NODE_ENV=development
```

**How to get values:**
- `SUPABASE_URL` → Supabase Dashboard → Settings → API → Project URL
- `SUPABASE_ANON_KEY` → Supabase Dashboard → Settings → API → anon public
- `JWT_SECRET` → Any random string (e.g., `logisticBooking2024!@#$`)

---

## 2. DATABASE SCHEMA - COPY & PASTE INTO SUPABASE SQL EDITOR

**Steps:**
1. Open https://app.supabase.com
2. Select your project
3. Go to **SQL Editor** → **New Query**
4. Copy all code below and paste it
5. Click **RUN**

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(100),
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'organizer', 'admin')),
  profile_image VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create trips table
CREATE TABLE IF NOT EXISTS trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination VARCHAR(255) NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  seats INTEGER NOT NULL,
  available_seats INTEGER NOT NULL,
  max_capacity INTEGER NOT NULL,
  description TEXT,
  image VARCHAR(255),
  organizer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  itinerary TEXT[],
  status VARCHAR(50) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  passengers INTEGER NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status VARCHAR(50) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create organizers table
CREATE TABLE IF NOT EXISTS organizers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(100),
  description TEXT,
  logo VARCHAR(255),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating DECIMAL(3, 2) DEFAULT 0,
  total_trips INTEGER DEFAULT 0,
  verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  account_name VARCHAR(255),
  account_number VARCHAR(50),
  bank_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('card', 'bank_transfer', 'wallet', 'cash')),
  transaction_id VARCHAR(100) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  receipt VARCHAR(255),
  payment_date TIMESTAMP,
  refund_date TIMESTAMP,
  refund_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_trips_organizer_id ON trips(organizer_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_trip_id ON bookings(trip_id);
CREATE INDEX idx_bookings_booking_ref ON bookings(booking_ref);
CREATE INDEX idx_organizers_user_id ON organizers(user_id);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
```

---

## 3. SUPABASE CLIENT CONFIGURATION

**File:** `backend/src/config/supabase.js` (Already created)

```javascript
const { createClient } = require("@supabase/supabase-js");
const env = require("./env");

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

module.exports = supabase;
```

---

## 4. ENVIRONMENT CONFIGURATION

**File:** `backend/src/config/env.js` (Already created)

```javascript
module.exports = {
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
};
```

---

## 5. PACKAGE.JSON DEPENDENCIES

**File:** `backend/package.json` (Already created)

Key packages that should be installed:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.38.0",
    "express": "^5.2.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.1.0",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

**Install all packages:**
```bash
npm install
```

---

## 6. EXAMPLE API REQUESTS

### A. Register a New User
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"
  }
}
```

---

### B. Login User
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIn0.lhc0vNZU9Jb_PQ_XdH5K6uPe",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### C. Get User Profile (Protected Route)
```bash
GET http://localhost:3000/api/users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxNDE3NDAwMCIsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIn0.lhc0vNZU9Jb_PQ_XdH5K6uPe
```

**Response:**
```json
{
  "message": "Profile fetched successfully",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": null,
    "city": null,
    "role": "user"
  }
}
```

---

### D. Create a Trip (Organizer Only)
```bash
POST http://localhost:3000/api/trips
Authorization: Bearer YOUR_ORGANIZER_TOKEN
Content-Type: application/json

{
  "destination": "Paris, France",
  "start_date": "2024-06-15T09:00:00Z",
  "end_date": "2024-06-22T18:00:00Z",
  "price": 1500,
  "seats": 30,
  "max_capacity": 30,
  "description": "A wonderful 7-day trip to Paris",
  "itinerary": [
    "Day 1: Arrival and Eiffel Tower",
    "Day 2: Louvre Museum",
    "Day 3: Arc de Triomphe"
  ]
}
```

---

### E. Create a Booking
```bash
POST http://localhost:3000/api/bookings
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "trip_id": "123e4567-e89b-12d3-a456-426614174001",
  "passengers": 2,
  "total_price": 3000,
  "special_requests": "Window seat preferred"
}
```

---

## 7. QUICK COMMANDS

**Start development server with auto-reload:**
```bash
npm run dev
```

**Start production server:**
```bash
npm start
```

**Test Supabase connection:**
```bash
node test-supabase.js
```

**Check if server is running:**
```bash
GET http://localhost:3000/api/health
```

---

## 8. DATABASE TABLES STRUCTURE

### users
```
- id (UUID, Primary Key)
- name (VARCHAR)
- email (VARCHAR, Unique)
- password (VARCHAR)
- phone (VARCHAR)
- address (VARCHAR)
- city (VARCHAR)
- role (VARCHAR: user, organizer, admin)
- profile_image (VARCHAR)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### trips
```
- id (UUID, Primary Key)
- destination (VARCHAR)
- start_date (TIMESTAMP)
- end_date (TIMESTAMP)
- price (DECIMAL)
- seats (INTEGER)
- available_seats (INTEGER)
- max_capacity (INTEGER)
- description (TEXT)
- image (VARCHAR)
- organizer_id (UUID, Foreign Key → users.id)
- itinerary (TEXT Array)
- status (VARCHAR: upcoming, ongoing, completed, cancelled)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### bookings
```
- id (UUID, Primary Key)
- booking_ref (VARCHAR, Unique - generated like "BK-1234567890-ABCD")
- user_id (UUID, Foreign Key → users.id)
- trip_id (UUID, Foreign Key → trips.id)
- passengers (INTEGER)
- total_price (DECIMAL)
- status (VARCHAR: pending, confirmed, cancelled, completed)
- payment_status (VARCHAR: unpaid, paid, refunded)
- special_requests (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### organizers
```
- id (UUID, Primary Key)
- name (VARCHAR)
- email (VARCHAR)
- phone (VARCHAR)
- address (VARCHAR)
- city (VARCHAR)
- description (TEXT)
- logo (VARCHAR)
- user_id (UUID, Foreign Key → users.id)
- rating (DECIMAL)
- total_trips (INTEGER)
- verification_status (VARCHAR: pending, verified, rejected)
- account_name (VARCHAR)
- account_number (VARCHAR)
- bank_name (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### payments
```
- id (UUID, Primary Key)
- booking_id (UUID, Foreign Key → bookings.id)
- user_id (UUID, Foreign Key → users.id)
- amount (DECIMAL)
- payment_method (VARCHAR: card, bank_transfer, wallet, cash)
- transaction_id (VARCHAR, Unique)
- status (VARCHAR: pending, completed, failed, refunded)
- receipt (VARCHAR)
- payment_date (TIMESTAMP)
- refund_date (TIMESTAMP)
- refund_reason (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

---

## 9. ALL API ENDPOINTS

**Base URL:** `http://localhost:3000/api`

| Method | Endpoint | Auth Required | Role | Description |
|--------|----------|---------------|------|-------------|
| POST | /auth/register | ❌ No | - | Register new user |
| POST | /auth/login | ❌ No | - | Login user |
| POST | /auth/refresh-token | ✅ Yes | - | Refresh JWT token |
| POST | /auth/logout | ✅ Yes | - | Logout user |
| GET | /users/profile | ✅ Yes | - | Get own profile |
| PUT | /users/profile | ✅ Yes | - | Update own profile |
| GET | /users | ✅ Yes | - | List all users |
| GET | /users/:id | ✅ Yes | - | Get user by ID |
| DELETE | /users/:id | ✅ Yes | admin | Delete user |
| GET | /trips | ❌ No | - | List all trips |
| GET | /trips/:id | ❌ No | - | Get trip by ID |
| POST | /trips | ✅ Yes | organizer | Create trip |
| PUT | /trips/:id | ✅ Yes | organizer | Update trip |
| DELETE | /trips/:id | ✅ Yes | admin | Delete trip |
| GET | /bookings | ✅ Yes | - | Get own bookings |
| GET | /bookings/:id | ✅ Yes | - | Get booking by ID |
| POST | /bookings | ✅ Yes | - | Create booking |
| PUT | /bookings/:id | ✅ Yes | - | Update booking |
| DELETE | /bookings/:id | ✅ Yes | - | Cancel booking |
| POST | /bookings/:id/confirm | ✅ Yes | organizer | Confirm booking |
| GET | /organizers | ❌ No | - | List all organizers |
| GET | /organizers/:id | ❌ No | - | Get organizer by ID |
| POST | /organizers | ✅ Yes | - | Create organizer profile |
| PUT | /organizers/:id | ✅ Yes | organizer | Update organizer |
| DELETE | /organizers/:id | ✅ Yes | admin | Delete organizer |
| GET | /admin/dashboard | ✅ Yes | admin | Admin dashboard stats |
| GET | /admin/users | ✅ Yes | admin | Get all users |
| GET | /admin/trips | ✅ Yes | admin | Get all trips |
| GET | /admin/bookings | ✅ Yes | admin | Get all bookings |

---

## 10. TROUBLESHOOTING CHECKLIST

```
□ Is Supabase project created and active?
  → Check at https://app.supabase.com

□ Do you have .env file with correct credentials?
  → SUPABASE_URL and SUPABASE_ANON_KEY

□ Are all database tables created?
  → Go to Table Editor in Supabase dashboard

□ Did you run npm install?
  → All dependencies installed?

□ Is the server running on port 3000?
  → npm start or npm run dev

□ Are API requests using correct headers?
  → Authorization: Bearer TOKEN for protected routes

□ Is JWT token valid?
  → Check token format and not expired
```

---

**Everything is configured! You're ready to go! 🚀**

If you have any issues, check the main `SUPABASE_SETUP.md` file for detailed troubleshooting.
