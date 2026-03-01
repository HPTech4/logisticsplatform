const supabase = require("../config/supabase");

// Create payment record
exports.createPayment = async (paymentData) => {
  try {
    const { bookingId, userId, amount, paymentMethod, transactionId } =
      paymentData;

    const { data, error } = await supabase
      .from("payments")
      .insert([
        {
          booking_id: bookingId,
          user_id: userId,
          amount,
          payment_method: paymentMethod,
          transaction_id: transactionId,
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

// Complete payment
exports.completePayment = async (paymentId) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .update({
        status: "completed",
        payment_date: new Date().toISOString(),
      })
      .eq("id", paymentId)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Refund payment
exports.refundPayment = async (paymentId, reason) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .update({
        status: "refunded",
        refund_date: new Date().toISOString(),
        refund_reason: reason,
      })
      .eq("id", paymentId)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

// Get payment status
exports.getPaymentStatus = async (paymentId) => {
  try {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("id", paymentId)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  } catch (error) {
    throw error;
  }
};
