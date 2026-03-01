const User = require("../models/User");
const Trip = require("../models/Trip");
const supabase = require("../config/supabase");

// Get admin dashboard
exports.getDashboard = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    const trips = await Trip.getAllTrips();

    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("*");

    if (bookingsError) throw bookingsError;

    const confirmedBookings = bookings.filter(
      (b) => b.status === "confirmed",
    ).length;

    res.status(200).json({
      message: "Dashboard retrieved successfully",
      dashboard: {
        totalUsers: users.length,
        totalTrips: trips.length,
        totalBookings: bookings.length,
        confirmedBookings,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
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

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.getAllTrips();

    res.status(200).json({
      message: "Trips retrieved successfully",
      count: trips.length,
      trips,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        "*, users(name, email), trips(destination, start_date, end_date)",
      );

    if (error) throw error;

    res.status(200).json({
      message: "Bookings retrieved successfully",
      count: data.length,
      bookings: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role } = req.body;

    const user = await User.updateUser(id, { name, email, phone, role });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
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

// Update trip
exports.updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { destination, startDate, endDate, price, seats, description } =
      req.body;

    const trip = await Trip.updateTrip(id, {
      destination,
      startDate,
      endDate,
      price,
      seats,
      description,
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({
      message: "Trip updated successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete trip
exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.deleteTrip(id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({
      message: "Trip deleted successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
