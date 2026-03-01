const supabase = require("../config/supabase");

// Create payment
const createPayment = async (paymentData) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .insert([
        {
          booking_id: paymentData.bookingId,
          user_id: paymentData.userId,
          amount: paymentData.amount,
          payment_method: paymentData.paymentMethod,
          transaction_id: paymentData.transactionId,
          status: "pending",
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Get payment by ID
const getPaymentById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Get payments by booking ID
const getPaymentsByBooking = async (bookingId) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("booking_id", bookingId);

    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

// Update payment
const updatePayment = async (id, updateData) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Mark payment as completed
const completePayment = async (id) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .update({ status: "completed", payment_date: new Date() })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Mark payment as failed
const failPayment = async (id) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .update({ status: "failed" })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  getPaymentsByBooking,
  updatePayment,
  completePayment,
  failPayment,
};
