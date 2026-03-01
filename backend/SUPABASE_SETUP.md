# SUPABASE SETUP GUIDE - Complete Step-by-Step

This guide will walk you through setting up Supabase for your logistic booking system backend.

---

## STEP 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign Up"**
3. Choose to sign up with:
   - GitHub
   - Google
   - Or email + password
4. Verify your email if using email/password

---

## STEP 2: Create a New Project

1. After logging in, you'll see the dashboard
2. Click **"New Project"** button
3. Fill in the form:
   - **Project Name**: `logistic-booking` (or your choice)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you (e.g., US East, Europe)
   - **Pricing Plan**: Choose "Free" tier for development
4. Click **"Create new project"**
5. Wait 2-3 minutes for the project to be created

---

## STEP 3: Get Your Credentials

Once your project is created:

1. Click on **"Settings"** (bottom left) → **"API"**
2. You'll see:
   - **Project URL** (looks like: `https://xxxxxxxxxxxx.supabase.co`)
   - **API Keys** section with:
     - **anon public** (this is your SUPABASE_ANON_KEY)
     - **service_role** (keep secret, don't use in frontend)

3. **Copy these values:**
   - Project URL → `SUPABASE_URL`
   - anon public key → `SUPABASE_ANON_KEY`

---

## STEP 4: Setup Environment Variables

1. Navigate to your backend folder:
```bash
cd c:\Users\WAREEZ\Desktop\logistic booking system\backend
```

2. Create a `.env` file (in the backend root directory):
```bash
# On PowerShell
New-Item .env
```

3. Open `.env` and paste this content:
```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
JWT_SECRET=your-super-secret-key-here-use-any-random-string
PORT=3000
NODE_ENV=development
```

4. Replace the values:
   - `SUPABASE_URL` - Paste your Project URL
   - `SUPABASE_ANON_KEY` - Paste your anon public key
   - `JWT_SECRET` - Create any random string (e.g., `mySecretKey2024!@#$`)

**Example:**
```env
SUPABASE_URL=https://abc123def456.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
JWT_SECRET=logisticBookingSecret2024!@#$%
PORT=3000
NODE_ENV=development
```

5. Save the file (Ctrl+S)

---

## STEP 5: Create Database Tables

### Method 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Click on **"SQL Editor"** (left sidebar)
3. Click **"New Query"** button
4. Copy and paste the entire SQL code below:

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

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_trips_organizer_id ON trips(organizer_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_trip_id ON bookings(trip_id);
CREATE INDEX idx_bookings_booking_ref ON bookings(booking_ref);
CREATE INDEX idx_organizers_user_id ON organizers(user_id);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
```

5. Click **"RUN"** button (or press Ctrl+Enter)
6. You should see ✅ success messages for each table

---

## STEP 6: Verify Database Setup

After running the SQL:

1. Go to **"Table Editor"** (left sidebar)
2. You should see all 5 tables:
   - ✅ users
   - ✅ trips
   - ✅ bookings
   - ✅ organizers
   - ✅ payments
3. Click each table to see the columns are created correctly

---

## STEP 7: Test the Connection

### Install Dependencies First

1. Open PowerShell in your backend folder:
```bash
cd c:\Users\WAREEZ\Desktop\logistic booking system\backend
npm install
```

Wait for all packages to install (~2-3 minutes)

### Test Connection

2. Create a test file to verify Supabase connection:

Create file: `test-supabase.js` in backend root:
```javascript
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Test connection by fetching from users table
async function testConnection() {
  try {
    console.log("🧪 Testing Supabase connection...");
    
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .limit(1);
    
    if (error) {
      console.error("❌ Error:", error.message);
    } else {
      console.log("✅ Connection successful!");
      console.log("Database is ready to use");
    }
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  }
}

testConnection();
```

3. Run the test:
```bash
node test-supabase.js
```

Expected output:
```
🧪 Testing Supabase connection...
✅ Connection successful!
Database is ready to use
```

If you see ✅, your Supabase is properly configured!

---

## STEP 8: Start Your Backend Server

Now everything is ready. Start your backend:

```bash
# Development mode (auto-reload on file changes)
npm run dev

# OR Production mode
npm start
```

You should see:
```
Server is running on port 3000
```

---

## TESTING THE API

Once the server is running, you can test endpoints.

### Using Postman or REST Client

**1. Test Health Check (No auth needed):**
```
GET http://localhost:3000/api/health
```

Response:
```json
{
  "message": "Server is running"
}
```

**2. Register a User:**
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }
}
```

**3. Login User:**
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**4. Get User Profile (Requires Token):**
```
GET http://localhost:3000/api/users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ENVIRONMENT CHECKLIST

Make sure you have:

✅ `.env` file created with:
```
SUPABASE_URL=https://your-url.supabase.co
SUPABASE_ANON_KEY=your-key-here
JWT_SECRET=your-secret
PORT=3000
```

✅ All 5 database tables created:
- users
- trips
- bookings
- organizers
- payments

✅ Dependencies installed:
```bash
npm install
```

✅ Server running:
```bash
npm start
```

---

## TROUBLESHOOTING

### Problem: "Error: Missing Supabase credentials"
**Solution:** Check `.env` file has correct `SUPABASE_URL` and `SUPABASE_ANON_KEY`

### Problem: "Cannot connect to database"
**Solution:** 
1. Verify your `.env` credentials
2. Check Supabase project is active
3. Ensure VPN/firewall isn't blocking

### Problem: "Table does not exist"
**Solution:** 
1. Go to Supabase SQL Editor
2. Run the database.sql again
3. Check Table Editor to confirm tables exist

### Problem: "Invalid JWT"
**Solution:** 
1. Verify `JWT_SECRET` in `.env` matches what was set
2. Make sure token format is: `Authorization: Bearer <token>`

### Problem: Port 3000 already in use
**Solution:**
```bash
# Use different port
$env:PORT=3001
npm start
```

---

## WHAT'S NEXT?

Once Supabase is set up:

1. ✅ Your backend is fully functional
2. ✅ All endpoints are ready to use
3. ✅ Database is connected
4. ✅ Authentication is working

Next steps:
- Build your frontend (React, Vue, etc.)
- Connect frontend to `http://localhost:3000/api` endpoints
- Store JWT tokens in localStorage/cookies
- Send token with each authenticated request

---

## USEFUL LINKS

- Supabase Dashboard: [https://app.supabase.com](https://app.supabase.com)
- Supabase Documentation: [https://supabase.com/docs](https://supabase.com/docs)
- PostgreSQL Docs: [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
- JWT.io: [https://jwt.io](https://jwt.io)

---

## QUICK REFERENCE

**Your API Base URL:**
```
http://localhost:3000/api
```

**Available Endpoints:**
```
POST   /auth/register          - Register user
POST   /auth/login             - Login user
GET    /users/profile          - Get your profile
GET    /trips                  - List all trips
POST   /trips                  - Create trip
GET    /bookings               - Get your bookings
POST   /bookings               - Create booking
GET    /admin/dashboard        - Admin dashboard (admin only)
```

**Headers for Protected Routes:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

You're all set! 🚀 Your Supabase is configured and ready to go!
