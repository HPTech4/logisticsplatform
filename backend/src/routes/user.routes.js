const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Protected routes
router.get("/profile", authMiddleware.verifyToken, userController.getProfile);
router.put(
  "/profile",
  authMiddleware.verifyToken,
  userController.updateProfile,
);
router.get("/", authMiddleware.verifyToken, userController.getAllUsers);
router.get("/:id", authMiddleware.verifyToken, userController.getUserById);
router.delete("/:id", authMiddleware.verifyToken, userController.deleteUser);

module.exports = router;
