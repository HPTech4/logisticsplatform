const Trip = require("../models/Trip");

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

// Get trip by ID
exports.getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.getTripById(id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({
      message: "Trip retrieved successfully",
      trip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create trip
exports.createTrip = async (req, res) => {
  try {
    const { destination, startDate, endDate, price, seats, description } =
      req.body;

    const trip = await Trip.createTrip({
      destination,
      startDate,
      endDate,
      price,
      seats,
      description,
      organizerId: req.user.id,
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip,
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
