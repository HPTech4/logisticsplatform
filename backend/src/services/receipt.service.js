// Generate receipt for booking
const generateReceipt = (booking, trip, user) => {
  const receipt = {
    receiptNumber: `RC-${booking.booking_ref}`,
    date: new Date().toISOString(),
    bookingRef: booking.booking_ref,
    user: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    trip: {
      destination: trip.destination,
      startDate: trip.start_date,
      endDate: trip.end_date,
    },
    booking: {
      passengers: booking.passengers,
      totalPrice: booking.total_price,
      status: booking.status,
      paymentStatus: booking.payment_status,
    },
    generatedAt: new Date().toLocaleString(),
  };

  return receipt;
};

// Format receipt as string
const formatReceiptText = (receipt) => {
  const text = `
╔════════════════════════════════════════════╗
║          BOOKING RECEIPT                   ║
╚════════════════════════════════════════════╝

Receipt Number: ${receipt.receiptNumber}
Date: ${receipt.generatedAt}

PASSENGER INFORMATION
─────────────────────
Name: ${receipt.user.name}
Email: ${receipt.user.email}
Phone: ${receipt.user.phone}

TRIP DETAILS
─────────────────────
Destination: ${receipt.trip.destination}
Start Date: ${new Date(receipt.trip.startDate).toLocaleDateString()}
End Date: ${new Date(receipt.trip.endDate).toLocaleDateString()}

BOOKING DETAILS
─────────────────────
Number of Passengers: ${receipt.booking.passengers}
Total Price: $${receipt.booking.totalPrice.toFixed(2)}
Status: ${receipt.booking.status}
Payment Status: ${receipt.booking.paymentStatus}

Booking Reference: ${receipt.booking.totalPrice}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thank you for your booking!
For inquiries, contact our support team.
  `;

  return text;
};

// Save receipt
const saveReceipt = async (receipt, format = "json") => {
  try {
    if (format === "json") {
      return JSON.stringify(receipt, null, 2);
    } else if (format === "text") {
      return formatReceiptText(receipt);
    }
    return receipt;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateReceipt,
  formatReceiptText,
  saveReceipt,
};
