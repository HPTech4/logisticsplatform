const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);

// Protected routes
router.post("/logout", authMiddleware.verifyToken, authController.logout);

module.exports = router;
