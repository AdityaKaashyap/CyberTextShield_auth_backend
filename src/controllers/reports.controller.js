const Report = require("../models/Report");

// FALSE POSITIVE → Model predicted smish but user says ham
exports.reportFalsePositive = async (req, res) => {
  try {
    const { message, sender, predicted_label, correct_label } = req.body;

    if (!message || !predicted_label || !correct_label) {
      return res.status(400).json({ error: "message, predicted_label, correct_label are required" });
    }

    const doc = await Report.create({
      type: "false_positive",
      message,
      sender: sender || "UNKNOWN",
      predicted_label,
      correct_label
    });

    return res.status(200).json({ message: "False positive report saved", data: doc });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// FALSE PREDICTION → Model predicted ham but user says smish
exports.reportFalsePrediction = async (req, res) => {
  try {
    const { message, sender, predicted_label, correct_label } = req.body;

    if (!message || !predicted_label || !correct_label) {
      return res.status(400).json({ error: "message, predicted_label, correct_label are required" });
    }

    const doc = await Report.create({
      type: "false_prediction",
      message,
      sender: sender || "UNKNOWN",
      predicted_label,
      correct_label
    });

    return res.status(200).json({ message: "False prediction report saved", data: doc });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
