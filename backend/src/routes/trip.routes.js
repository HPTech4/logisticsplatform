const express = require("express");
const router = express.Router();
const tripController = require("../controllers/trip.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

// Public routes
router.get("/", tripController.getAllTrips);
router.get("/:id", tripController.getTripById);

// Protected routes - Create, Update, Delete
router.post("/", authMiddleware.verifyToken, tripController.createTrip);
router.put("/:id", authMiddleware.verifyToken, tripController.updateTrip);
router.delete("/:id", authMiddleware.verifyToken, tripController.deleteTrip);

module.exports = router;
