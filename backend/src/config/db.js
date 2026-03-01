// Database connection configuration
module.exports = {
  supabase: {
    url: process.env.SUPABASE_URL,
    anon_key: process.env.SUPABASE_ANON_KEY,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: "7d",
  },
  server: {
    port: process.env.PORT || 3000,
  },
};
