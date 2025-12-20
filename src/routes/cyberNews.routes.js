const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/cyberNews.controller");
const authMiddleware = require("../middleware/auth.middleware");

// 🔐 Protected — user must be logged in
router.get("/latest", authMiddleware, ctrl.getCyberNews);

module.exports = router;
