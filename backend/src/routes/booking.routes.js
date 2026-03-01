const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Protected routes
router.post("/", authMiddleware.verifyToken, bookingController.createBooking);
router.get("/", authMiddleware.verifyToken, bookingController.getBookings);
router.get(
  "/:id",
  authMiddleware.verifyToken,
  bookingController.getBookingById,
);
router.put("/:id", authMiddleware.verifyToken, bookingController.updateBooking);
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  bookingController.cancelBooking,
);
router.post(
  "/:id/confirm",
  authMiddleware.verifyToken,
  bookingController.confirmBooking,
);

module.exports = router;
