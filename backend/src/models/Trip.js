const supabase = require("../config/supabase");

// Create trip
const createTrip = async (tripData) => {
  try {
    const { data, error } = await supabase
      .from("trips")
      .insert([
        {
          destination: tripData.destination,
          start_date: tripData.startDate,
          end_date: tripData.endDate,
          price: tripData.price,
          seats: tripData.seats,
          available_seats: tripData.seats,
          max_capacity: tripData.seats,
          description: tripData.description,
          organizer_id: tripData.organizerId,
          status: "upcoming",
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Get all trips
const getAllTrips = async () => {
  try {
    const { data, error } = await supabase
      .from("trips")
      .select("*, users(id, name, email)");

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Get trip by ID
const getTripById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("trips")
      .select("*, users(id, name, email, phone)")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Update trip
const updateTrip = async (id, updateData) => {
  try {
    const { data, error } = await supabase
      .from("trips")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Delete trip
const deleteTrip = async (id) => {
  try {
    const { data, error } = await supabase
      .from("trips")
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
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};
