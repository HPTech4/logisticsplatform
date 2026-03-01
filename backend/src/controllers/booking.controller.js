const Booking = require("../models/Booking");
const generateBookingRef = require("../utils/generateBookingRef");

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { tripId, passengers, totalPrice } = req.body;

    const bookingRef = generateBookingRef();

    const booking = await Booking.createBooking({
      bookingRef,
      userId: req.user.id,
      tripId,
      passengers,
      totalPrice,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings for user
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.getBookingsByUser(req.user.id);

    res.status(200).json({
      message: "Bookings retrieved successfully",
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.getBookingById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking retrieved successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { passengers, totalPrice, status } = req.body;

    const booking = await Booking.updateBooking(id, {
      passengers,
      totalPrice,
      status,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.cancelBooking(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm booking
exports.confirmBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.confirmBooking(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking confirmed successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
