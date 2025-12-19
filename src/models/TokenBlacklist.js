const mongoose = require("mongoose");

const TokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expires_at: { type: Date, required: true }
});

// Automatically delete expired tokens
TokenBlacklistSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("TokenBlacklist", TokenBlacklistSchema);
