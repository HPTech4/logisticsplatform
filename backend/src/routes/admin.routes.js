const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// Admin protected routes - require admin role
router.get(
  "/dashboard",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  adminController.getDashboard,
);
router.get(
  "/users",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  adminController.getAllUsers,
);
router.get(
  "/trips",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  adminController.getAllTrips,
);
router.get(
  "/bookings",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  adminController.getAllBookings,
);
router.put(
  "/users/:id",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  adminController.updateUser,
);
router.delete(
  "/users/:id",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  adminController.deleteUser,
);
router.put(
  "/trips/:id",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  adminController.updateTrip,
);
router.delete(
  "/trips/:id",
  authMiddleware.verifyToken,
  roleMiddleware.checkRole("admin"),
  adminController.deleteTrip,
);

module.exports = router;
