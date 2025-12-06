const Report = require("../models/Reports");

exports.reportFalsePositive = async (req, res) => {
  try {
    const payload = req.body; // apply validation in production
    await Report.create({ type: "false_positive", payload });
    res.json({ message: "Report received" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.reportFalsePrediction = async (req, res) => {
  try {
    const payload = req.body;
    await Report.create({ type: "false_prediction", payload });
    res.json({ message: "Report received" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
