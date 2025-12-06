const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/permission.controller");

router.post("/update", ctrl.updatePermissions);

module.exports = router;
