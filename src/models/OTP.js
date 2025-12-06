const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  country_code: String,
  phone_number: String,
  otp: String,
  expires_at: Date,
  used: { type: Boolean, default: false }
});

OTPSchema.index({ phone_number: 1, country_code: 1, expires_at: 1 });

module.exports = mongoose.model("OTP", OTPSchema);
