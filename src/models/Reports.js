const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  type: { type: String }, // false_positive / false_prediction
  payload: { type: Object },
  reported_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Report", ReportSchema);
