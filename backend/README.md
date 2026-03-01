# Logistic Booking System - Backend

A Node.js Express backend for a logistic booking system built with Supabase (PostgreSQL) for data management.

## Project Structure

```
backend/
├── server.js                 # Server entry point
├── package.json             # Dependencies
├── database.sql             # Database schema
├── .env.example             # Environment variables template
└── src/
    ├── app.js               # Express app setup
    ├── config/              # Configuration files
    │   ├── db.js           # Database config
    │   ├── env.js          # Environment variables
    │   └── supabase.js     # Supabase client
    ├── controllers/         # Business logic
    │   ├── auth.controller.js
    │   ├── user.controller.js
    │   ├── trip.controller.js
    │   ├── booking.controller.js
    │   ├── organizer.controller.js
    │   └── admin.controller.js
    ├── models/             # Database queries
    │   ├── User.js
    │   ├── Trip.js
    │   ├── Booking.js
    │   ├── Organizer.js
    │   └── Payment.js
    ├── routes/             # API endpoints
    │   ├── auth.routes.js
    │   ├── user.routes.js
    │   ├── trip.routes.js
    │   ├── booking.routes.js
    │   ├── organizer.routes.js
    │   └── admin.routes.js
    ├── middlewares/        # Custom middlewares
    │   ├── auth.middleware.js
    │   ├── role.middleware.js
    │   └── error.middleware.js
    ├── services/           # Business services
    │   ├── payment.service.js
    │   └── receipt.service.js
    └── utils/              # Utility functions
        └── generateBookingRef.js
```

## Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Setup environment variables:**
   Create a `.env` file in the backend directory:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_secret_key
PORT=3000
```

3. **Setup Supabase database:**

- Go to Supabase dashboard
- Run the SQL from `database.sql` in the SQL editor
- This creates all necessary tables and indexes

4. **Start the server:**

```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh JWT token
- `POST /api/auth/logout` - Logout user

### Users

- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `DELETE /api/users/:id` - Delete user (protected)

### Trips

- `GET /api/trips/` - Get all trips (public)
- `GET /api/trips/:id` - Get trip details (public)
- `POST /api/trips/` - Create new trip (protected)
- `PUT /api/trips/:id` - Update trip (protected)
- `DELETE /api/trips/:id` - Delete trip (protected)

### Bookings

- `POST /api/bookings/` - Create booking (protected)
- `GET /api/bookings/` - Get user's bookings (protected)
- `GET /api/bookings/:id` - Get booking details (protected)
- `PUT /api/bookings/:id` - Update booking (protected)
- `DELETE /api/bookings/:id` - Cancel booking (protected)
- `POST /api/bookings/:id/confirm` - Confirm booking (protected)

### Organizers

- `GET /api/organizers/` - Get all organizers (public)
- `GET /api/organizers/:id` - Get organizer details (public)
- `POST /api/organizers/` - Create organizer profile (protected)
- `PUT /api/organizers/:id` - Update organizer (protected)
- `DELETE /api/organizers/:id` - Delete organizer (protected)

### Admin

- `GET /api/admin/dashboard` - Get dashboard stats (admin only)
- `GET /api/admin/users` - View all users (admin only)
- `GET /api/admin/trips` - View all trips (admin only)
- `GET /api/admin/bookings` - View all bookings (admin only)
- `PUT /api/admin/users/:id` - Update user as admin (admin only)
- `DELETE /api/admin/users/:id` - Delete user as admin (admin only)
- `PUT /api/admin/trips/:id` - Update trip as admin (admin only)
- `DELETE /api/admin/trips/:id` - Delete trip as admin (admin only)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

**How to use:**

1. Register or login to get a token
2. Include token in request headers: `Authorization: Bearer <token>`
3. Token expires in 7 days

## Database Schema

### Tables

- **users** - User accounts with roles (user, organizer, admin)
- **trips** - Travel trips organized by users
- **bookings** - User bookings for trips
- **organizers** - Organizer profiles
- **payments** - Payment records

All tables include `created_at` and `updated_at` timestamps.

## Models

### User

- Authentication with hashed passwords
- JWT token generation
- Role-based access (user, organizer, admin)

### Trip

- Create and manage trips
- Track available seats
- Organizer relationships

### Booking

- Auto-generated booking references
- Track payment status
- Support for pending, confirmed, cancelled, completed statuses

### Organizer

- Organizer profiles
- Verification status
- Bank account details

### Payment

- Multiple payment methods (card, bank_transfer, wallet, cash)
- Refund support
- Transaction tracking

## Services

### Payment Service

- Create payment records
- Complete payments
- Process refunds
- Check payment status

### Receipt Service

- Generate booking receipts
- Format as JSON or text
- Include full booking details

## Middleware

### Auth Middleware

- Verify JWT tokens
- Protect routes

### Role Middleware

- Check user roles
- Support single role or multiple roles
- Admin access control

### Error Middleware

- Global error handling
- Async error wrapper

## Utils

### generateBookingRef

- Generate unique booking references
- Format: `BK-{timestamp}-{random}`

## Environment Variables

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# JWT Configuration
JWT_SECRET=your_secret_key_for_jwt

# Server Configuration
PORT=3000
NODE_ENV=development
```

## Technologies Used

- **Express.js** - Web framework
- **Supabase** - PostgreSQL database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

## Error Handling

All endpoints return consistent JSON responses:

**Success:**

```json
{
  "message": "Operation successful",
  "data": {...}
}
```

**Error:**

```json
{
  "message": "Error description",
  "status": 400
}
```

## Development

For development with hot-reload:

```bash
npm run dev
```

This uses nodemon to automatically restart the server on file changes.

## Production

For production:

```bash
npm start
```

## License

ISC - HPTech

## Support

For issues or questions, contact the development team.
