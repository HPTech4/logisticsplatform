// Generate unique booking reference
const generateBookingRef = () => {
  const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
  const random = Math.random().toString(36).substring(2, 8).toUpperCase(); // Random alphanumeric
  return `BK-${timestamp}-${random}`;
};

module.exports = generateBookingRef;
