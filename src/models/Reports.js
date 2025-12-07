const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  type: { type: String, enum: ["false_positive", "false_prediction"], required: true },

  message: { type: String, required: true },
  sender: { type: String, default: "UNKNOWN" },

  predicted_label: { type: String, required: true },  // what model predicted
  correct_label: { type: String, required: true },    // what user says it actually is

  reported_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", ReportSchema);
