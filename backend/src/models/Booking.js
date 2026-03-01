const supabase = require("../config/supabase");

// Create booking
const createBooking = async (bookingData) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          booking_ref: bookingData.bookingRef,
          user_id: bookingData.userId,
          trip_id: bookingData.tripId,
          passengers: bookingData.passengers,
          total_price: bookingData.totalPrice,
          status: "pending",
          payment_status: "unpaid",
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Get all bookings for a user
const getBookingsByUser = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(
        "*, trips(destination, start_date, end_date, price), users(name, email)",
      )
      .eq("user_id", userId);

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Get booking by ID
const getBookingById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, trips(*), users(name, email, phone)")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Update booking
const updateBooking = async (id, updateData) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Cancel booking
const cancelBooking = async (id) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Confirm booking
const confirmBooking = async (id) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .update({ status: "confirmed" })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createBooking,
  getBookingsByUser,
  getBookingById,
  updateBooking,
  cancelBooking,
  confirmBooking,
};
