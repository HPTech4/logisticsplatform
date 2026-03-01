const Organizer = require("../models/Organizer");

// Get all organizers
exports.getAllOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.getAllOrganizers();

    res.status(200).json({
      message: "Organizers retrieved successfully",
      count: organizers.length,
      organizers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get organizer by ID
exports.getOrganizerById = async (req, res) => {
  try {
    const { id } = req.params;
    const organizer = await Organizer.getOrganizerById(id);

    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }

    res.status(200).json({
      message: "Organizer retrieved successfully",
      organizer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create organizer
exports.createOrganizer = async (req, res) => {
  try {
    const { name, email, phone, address, description } = req.body;

    const organizer = await Organizer.createOrganizer({
      name,
      email,
      phone,
      address,
      description,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Organizer created successfully",
      organizer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update organizer
exports.updateOrganizer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, description } = req.body;

    const organizer = await Organizer.updateOrganizer(id, {
      name,
      email,
      phone,
      address,
      description,
    });

    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }

    res.status(200).json({
      message: "Organizer updated successfully",
      organizer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete organizer
exports.deleteOrganizer = async (req, res) => {
  try {
    const { id } = req.params;
    const organizer = await Organizer.deleteOrganizer(id);

    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }

    res.status(200).json({
      message: "Organizer deleted successfully",
      organizer,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
