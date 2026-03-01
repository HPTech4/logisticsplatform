# SETUP CHECKLIST - Quick Reference

Follow these steps in order. Check off each item as you complete it.

---

## ✅ PRE-SETUP CHECKLIST

Before you start, you need:

```
☐ Supabase Account (free at https://supabase.com)
☐ Node.js installed (v14 or higher)
☐ Terminal/PowerShell access
☐ Text Editor or IDE (VS Code)
```

---

## 🚀 SETUP STEPS (DO IN ORDER)

### STEP 1: Supabase Account & Project (5 minutes)

```
☐ Sign up at https://supabase.com
☐ Verify email
☐ Create new project:
  - Name: logistic-booking
  - Password: Save securely
  - Region: Choose closest to you
☐ Wait for project to be created (2-3 minutes)
```

---

### STEP 2: Get Credentials (2 minutes)

From Supabase Dashboard:

```
☐ Go to Settings → API
☐ Copy Project URL → SUPABASE_URL
☐ Copy anon public key → SUPABASE_ANON_KEY
☐ Create JWT Secret (any random string) → JWT_SECRET
```

---

### STEP 3: Create .env File (2 minutes)

```
☐ In backend folder, create file: .env
☐ Add this content:

SUPABASE_URL=https://your-url-here.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
JWT_SECRET=anyRandomSecretString123!@#
PORT=3000
NODE_ENV=development

☐ Save file
```

---

### STEP 4: Create Database Tables (5 minutes)

```
☐ Open https://app.supabase.com
☐ Select your project
☐ Go to SQL Editor → New Query
☐ Copy full SQL from: SUPABASE_QUICK_REFERENCE.md (section 2)
☐ Paste in SQL Editor
☐ Click RUN button
☐ Wait for success messages
☐ Check Table Editor - should see 5 tables:
  - users ✓
  - trips ✓
  - bookings ✓
  - organizers ✓
  - payments ✓
```

---

### STEP 5: Install Dependencies (3-5 minutes)

```
☐ Open PowerShell in backend folder:
  cd c:\Users\WAREEZ\Desktop\logistic booking system\backend

☐ Run: npm install

☐ Wait for all packages to install
☐ Should not have any errors
```

---

### STEP 6: Test Connection (1 minute)

```
☐ Create file: test-supabase.js in backend root
☐ Copy code from SUPABASE_QUICK_REFERENCE.md (section 1)
☐ Run: node test-supabase.js
☐ Should see: ✅ Connection successful!
```

---

### STEP 7: Start Server (1 minute)

```
☐ Run: npm start
☐ Should see: Server is running on port 3000
☐ Keep terminal open
```

---

### STEP 8: Test APIs (5 minutes)

Open a new terminal and test:

```
☐ Health check:
  curl http://localhost:3000/api/health

☐ Register user (copy command from TESTING_GUIDE.md):
  Register test user

☐ Login user:
  Get token from response

☐ Get profile (with token):
  Should work with token
  Should fail without token

☐ Check Supabase Table Editor:
  New user appears in users table ✓
```

---

## 📋 FILE CHECKLIST

Verify all files exist in backend folder:

### Configuration Files

```
☐ .env (with your credentials)
☐ package.json (with npm scripts)
☐ src/config/supabase.js
☐ src/config/env.js
☐ src/config/db.js
```

### Route Files

```
☐ src/routes/auth.routes.js
☐ src/routes/user.routes.js
☐ src/routes/trip.routes.js
☐ src/routes/booking.routes.js
☐ src/routes/organizer.routes.js
☐ src/routes/admin.routes.js
```

### Controller Files

```
☐ src/controllers/auth.controllers.js
☐ src/controllers/user.controller.js
☐ src/controllers/trip.controllers.js
☐ src/controllers/booking.controller.js
☐ src/controllers/organizer.controller.js
☐ src/controllers/admin.controller.js
```

### Model Files

```
☐ src/models/User.js
☐ src/models/Trip.js
☐ src/models/Booking.js
☐ src/models/Organizer.js
☐ src/models/Payment.js
```

### Middleware Files

```
☐ src/middlewares/auth.middleware.js
☐ src/middlewares/role.middleware.js
☐ src/middlewares/error.middleware.js
```

### Service Files

```
☐ src/services/payment.service.js
☐ src/services/receipt.service.js
```

### Utility Files

```
☐ src/utils/generateBookingRef.js
```

### Main Files

```
☐ src/app.js
☐ server.js
☐ database.sql
```

### Documentation

```
☐ SUPABASE_SETUP.md (detailed guide)
☐ SUPABASE_QUICK_REFERENCE.md (code snippets)
☐ TESTING_GUIDE.md (API testing)
☐ SETUP_CHECKLIST.md (this file)
☐ README.md
```

---

## 🎯 FINAL VERIFICATION

Run this checklist to confirm everything works:

```
☐ npm start runs without errors
☐ Server shows "running on port 3000"
☐ Health endpoint responds
☐ Can register new user
☐ Can login and get token
☐ Can fetch profile with token
☐ Profile fetch fails without token
☐ New user appears in Supabase database
☐ All 6 routes are mounted (check app.js)
☐ All 6 controllers exist and are imported
☐ All 5 models exist and use Supabase
☐ Middleware is properly configured
☐ Environment variables are loaded from .env
```

If all items checked ✅ → Your backend is **PRODUCTION READY!**

---

## 🔧 TROUBLESHOOTING QUICK LINKS

| Issue                    | Solution                                                           |
| ------------------------ | ------------------------------------------------------------------ |
| Server won't start       | Check port 3000 not in use. Run: `npm install` first               |
| Connection refused       | Make sure .env has correct Supabase credentials                    |
| Tables not found         | Run SQL in Supabase SQL Editor (check SUPABASE_QUICK_REFERENCE.md) |
| Token invalid            | Make sure JWT_SECRET in .env is set                                |
| CORS errors              | Already configured in `app.js`                                     |
| Can't register user      | Check email format is valid and unique                             |
| Port 3000 already in use | Change PORT in .env to 3001 or another number                      |

**Read full troubleshooting:** SUPABASE_SETUP.md (Troubleshooting section)

---

## 📖 DOCUMENTATION FILES

| File                            | Purpose                                       |
| ------------------------------- | --------------------------------------------- |
| **SUPABASE_SETUP.md**           | Complete step-by-step guide with explanations |
| **SUPABASE_QUICK_REFERENCE.md** | All code snippets in one place                |
| **TESTING_GUIDE.md**            | How to test all API endpoints                 |
| **SETUP_CHECKLIST.md**          | This file - quick verification                |

---

## ✨ WHAT YOU GET

After completing setup, you have:

```
✅ Complete Express.js backend
✅ 30+ API endpoints
✅ PostgreSQL database via Supabase
✅ JWT authentication
✅ Role-based access control (user, organizer, admin)
✅ 5 database tables with relationships
✅ Input validation & error handling
✅ Payment & Receipt services
✅ Production-ready code
```

---

## 🚀 NEXT STEPS

After setup is complete:

1. **Build Frontend** (React, Vue, Angular, etc.)
2. **Connect to API** at `http://localhost:3000/api`
3. **Store JWT tokens** in localStorage/cookies
4. **Send tokens** in Authorization headers
5. **Test on different devices**
6. **Deploy backend** (Heroku, Railway, Render, etc.)
7. **Deploy frontend** (Vercel, Netlify, etc.)

---

## 📞 QUICK REFERENCE COMMANDS

```bash
# Install dependencies
npm install

# Start server (production)
npm start

# Start server (development with auto-reload)
npm run dev

# Test Supabase connection
node test-supabase.js

# Check Node.js version
node --version

# Kill server on port 3000 (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

---

## 📊 API BASE URL

```
http://localhost:3000/api
```

All endpoints listed in: **SUPABASE_QUICK_REFERENCE.md** (section 9)

---

## ✅ YOU'RE READY!

Follow this checklist from top to bottom, and your backend will be fully set up and tested.

**Time to complete:** 30-45 minutes

**Questions?** Read the detailed guide: **SUPABASE_SETUP.md**

**Need code examples?** Check: **SUPABASE_QUICK_REFERENCE.md**

**Want to test APIs?** Follow: **TESTING_GUIDE.md**

---

**Status: READY TO BUILD FRONTEND! 🎉**
