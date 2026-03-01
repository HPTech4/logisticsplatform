# TESTING YOUR SETUP - Step by Step

This guide will help you test that everything is working correctly.

---

## STEP 1: Verify Server is Running

1. Open a terminal in your backend folder:
```bash
cd c:\Users\WAREEZ\Desktop\logistic booking system\backend
```

2. Start the server:
```bash
npm start
```

3. You should see:
```
Server is running on port 3000
```

4. Leave this terminal running and open a new one for testing.

---

## STEP 2: Test Basic Health Check

Open a new PowerShell terminal and run:

```bash
curl http://localhost:3000/api/health
```

**Expected Response:**
```json
{"message":"Server is running"}
```

If you see this, your server is working! ✅

---

## STEP 3: Complete API Testing

### Using PowerShell with curl

**Test 1: Register a User**

```powershell
$body = @{
    name = "John Doe"
    email = "john@example.com"
    password = "password123"
    phone = "+1234567890"
} | ConvertTo-Json

curl -X POST http://localhost:3000/api/auth/register `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

**Expected Response (✅):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "some-uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

**Test 2: Login User**

```powershell
$body = @{
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

$response = curl -X POST http://localhost:3000/api/auth/login `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body

$response
```

**Expected Response (✅):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "some-uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**⚠️ IMPORTANT:** Copy the `token` value from the response and use it in the next test!

---

**Test 3: Get User Profile (Protected Route)**

Replace `YOUR_TOKEN_HERE` with the token from Test 2:

```powershell
curl -X GET http://localhost:3000/api/users/profile `
  -Headers @{"Authorization"="Bearer YOUR_TOKEN_HERE"}
```

**Expected Response (✅):**
```json
{
  "message": "Profile fetched successfully",
  "user": {
    "id": "some-uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"
  }
}
```

**If you see this, authentication is working! ✅**

---

**Test 4: Try Without Token (Should Fail)**

```powershell
curl -X GET http://localhost:3000/api/users/profile
```

**Expected Response (❌ Error):**
```json
{
  "error": "No token provided"
}
```

This is correct! The endpoint requires authentication. ✅

---

## STEP 4: Test with Postman (Recommended)

If you prefer a GUI, use Postman:

1. Download Postman from [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
2. Install it
3. Open Postman

### Create a Collection

1. Click **"Collections"** → **"Create New Collection"**
2. Name it: `Logistic Booking API`

### Add Requests

**Request 1: Register**
- Method: `POST`
- URL: `http://localhost:3000/api/auth/register`
- Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```
- Click **Send**

**Request 2: Login**
- Method: `POST`
- URL: `http://localhost:3000/api/auth/login`
- Body (JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- Click **Send**
- Copy the `token` from the response

**Request 3: Get Profile**
- Method: `GET`
- URL: `http://localhost:3000/api/users/profile`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer YOUR_TOKEN_HERE` (paste the token from Request 2)
- Click **Send**

---

## STEP 5: Check Database

1. Go to https://app.supabase.com
2. Select your project
3. Click **Table Editor** (left sidebar)
4. You should see a new entry in the `users` table with the user you just created!

---

## STEP 6: Full Test Checklist

Check off each item as you complete it:

```
☐ Server starts without errors (npm start)
☐ Health check returns success
☐ User registration works
☐ User login returns a token
☐ Profile fetch works with token
☐ Profile fetch fails without token
☐ New user appears in Supabase users table
☐ Can login with registered email and password
☐ Token is a valid JWT (test at jwt.io)
```

If all items are checked, your backend is **fully working**! 🎉

---

## STEP 7: Common Test Errors & Solutions

### Error: "Cannot connect to http://localhost:3000"
**Solution:** Check if server is running. Type in a terminal:
```bash
npm start
```

### Error: "CORS error"
**Solution:** CORS is already configured. Try from the same machine first.

### Error: "Email already exists"
**Solution:** Use a different email in the request:
```json
{
  "email": "jane@example.com",
  "password": "password123",
  "name": "Jane Doe",
  "phone": "+1234567890"
}
```

### Error: "Invalid token"
**Solution:** 
1. Make sure you copied the full token
2. Check the Authorization header format: `Bearer TOKEN_HERE`
3. Token might have expired (generate a new one)

### Error: "No token provided"
**Solution:** Add Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### Error: "Database connection failed"
**Solution:** 
1. Check .env file has correct `SUPABASE_URL` and `SUPABASE_ANON_KEY`
2. Verify Supabase project is active
3. Restart the server

---

## STEP 8: Advanced Testing

### Test Creating a Trip

First, upgrade your user to "organizer" role:

1. Go to Supabase dashboard
2. Click **Table Editor** → **users**
3. Click on your user's row
4. Change `role` from `user` to `organizer`
5. Click **Update**

Now test creating a trip:

```powershell
$body = @{
    destination = "Paris, France"
    start_date = "2024-06-15T09:00:00Z"
    end_date = "2024-06-22T18:00:00Z"
    price = 1500
    seats = 30
    max_capacity = 30
    description = "Beautiful trip to Paris"
    itinerary = @("Day 1: Arrival", "Day 2: Eiffel Tower", "Day 3: Louvre")
} | ConvertTo-Json

curl -X POST http://localhost:3000/api/trips `
  -Headers @{
    "Content-Type"="application/json"
    "Authorization"="Bearer YOUR_TOKEN_HERE"
  } `
  -Body $body
```

**Expected Response (✅):**
```json
{
  "message": "Trip created successfully",
  "trip": {
    "id": "uuid-here",
    "destination": "Paris, France",
    "price": 1500,
    "seats": 30
  }
}
```

---

### Test Getting All Trips

```powershell
curl -X GET http://localhost:3000/api/trips
```

**Expected Response (✅):**
```json
{
  "message": "Trips fetched successfully",
  "trips": [
    {
      "id": "trip-uuid",
      "destination": "Paris, France",
      "price": 1500,
      "seats": 30,
      "organizer_id": "user-uuid"
    }
  ]
}
```

---

## STEP 9: Load Testing (Optional)

Test the server under load:

```bash
# Install Apache Bench (if not installed)
# Already available on Windows

# Test 1000 requests to the health endpoint
ab -n 1000 -c 10 http://localhost:3000/api/health
```

Expected output should show all requests succeeded with good response times.

---

## STEP 10: Verify Database Indexes

1. Go to Supabase → SQL Editor
2. Run this query:
```sql
SELECT * FROM pg_indexes WHERE schemaname = 'public';
```

You should see 8 indexes created for performance optimization.

---

## ✅ YOU'RE ALL SET!

Your backend is fully tested and working. You can now:

1. ✅ Build your frontend
2. ✅ Connect it to `http://localhost:3000/api`
3. ✅ Store JWT tokens in localStorage
4. ✅ Send tokens with protected API requests
5. ✅ Deploy to production

---

## NEXT STEPS

1. **Build Frontend** (React, Vue, or Angular)
2. **Connect to Backend** using your API endpoints
3. **Test on Different Devices** (mobile, tablet, desktop)
4. **Deploy Backend** to Heroku, Railway, or similar (change SUPABASE_URL port to 5432 for production)
5. **Deploy Frontend** to Vercel, Netlify, or similar

---

**Questions?** Check the troubleshooting section in `SUPABASE_SETUP.md`

**Need more help?** Check `SUPABASE_QUICK_REFERENCE.md` for common code snippets.

Good luck! 🚀
