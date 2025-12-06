const mongoose = require("mongoose");

const SMSSchema = new mongoose.Schema({
  user_id: String,
  sender: String,
  message_content: String,
  timestamp: String,
  original_language: { type: String, default: "en" },
  translated_content: { type: String, default: null }
});

module.exports = mongoose.model("SMS", SMSSchema);
