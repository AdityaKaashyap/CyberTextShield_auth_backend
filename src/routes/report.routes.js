const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/reports.controller");

router.post("/false-positive", ctrl.reportFalsePositive);
router.post("/false-prediction", ctrl.reportFalsePrediction);

module.exports = router;
