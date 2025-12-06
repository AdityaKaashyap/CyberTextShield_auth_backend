const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/sms.controller");

router.post("/intercept", ctrl.intercept);

module.exports = router;
