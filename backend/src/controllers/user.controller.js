const User = require("../models/User");

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    delete user.password;
    res.status(200).json({
      message: "Profile retrieved successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, address, city } = req.body;

    const user = await User.updateUser(userId, { name, phone, address, city });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    delete user.password;
    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();

    res.status(200).json({
      message: "Users retrieved successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    delete user.password;
    res.status(200).json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.deleteUser(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
