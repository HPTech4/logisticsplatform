const express = require("express");
const router = express.Router();
const organizerController = require("../controllers/organizer.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Public routes
router.get("/", organizerController.getAllOrganizers);
router.get("/:id", organizerController.getOrganizerById);

// Protected routes
router.post(
  "/",
  authMiddleware.verifyToken,
  organizerController.createOrganizer,
);
router.put(
  "/:id",
  authMiddleware.verifyToken,
  organizerController.updateOrganizer,
);
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  organizerController.deleteOrganizer,
);

module.exports = router;
