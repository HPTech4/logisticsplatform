module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "7d",
};
