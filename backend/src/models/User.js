const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate auth token
const generateAuthToken = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "7d" },
  );
  return token;
};

// Create user
const createUser = async (userData) => {
  try {
    const hashedPassword = await hashPassword(userData.password);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          phone: userData.phone,
          role: userData.role || "user",
          is_active: true,
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Find user by email
const findUserByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Find user by ID
const findUserById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select(
        "id, name, email, phone, role, address, city, profile_image, is_active, created_at",
      );

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Update user
const updateUser = async (id, updateData) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Delete user
const deleteUser = async (id) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  hashPassword,
  comparePassword,
  generateAuthToken,
};
