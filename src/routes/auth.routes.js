const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/logout", authMiddleware, ctrl.logout);
router.post("/forgot-password", ctrl.forgotPassword);
router.post("/verify-otp", ctrl.verifyOtp);
router.post("/reset-password", ctrl.resetPassword);

module.exports = router;
