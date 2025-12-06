const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const { validateFullNumber } = require("../utils/phone");
const { sendOtpSms } = require("../utils/twilio");
const jwtUtil = require("../utils/jwt");
const { PhoneNumberUtil, PhoneNumberFormat } = require("google-libphonenumber");
const phoneUtil = PhoneNumberUtil.getInstance();

const OTP_EXP_MIN = parseInt(process.env.OTP_EXPIRY_MINUTES || "5", 10);

function genOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.register = async (req, res) => {
  try {
    const { username, country_code, phone_number, password } = req.body;

    // Combine country code + phone number
    const cc = country_code.startsWith("+") ? country_code : `+${country_code}`;
    const fullNumber = phone_number.startsWith("+") ? phone_number : `${cc}${phone_number}`;

    // Validate phone number using google-libphonenumber
    let number;
    try {
      number = phoneUtil.parse(fullNumber);
      if (!phoneUtil.isValidNumber(number)) {
        return res.status(400).json({ message: "Invalid phone number/country code" });
      }
    } catch (err) {
      console.error("Phone validation error:", err.message);
      return res.status(400).json({ message: "Invalid phone number/country code" });
    }

    // Check if phone already exists
    const existing = await User.findOne({ phone_number: fullNumber });
    if (existing) return res.status(400).json({ message: "Phone already registered" });

    // Hash password and create user
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      country_code: cc,
      phone_number: fullNumber,
      password: hashed
    });

    return res.json({ message: "Registered", user_id: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { country_code, phone_number, password } = req.body;

    // Make canonical full number like registration
    const cc = country_code.startsWith("+") ? country_code : `+${country_code}`;
    const fullNumber = phone_number.startsWith("+") ? phone_number : `${cc}${phone_number}`;

    // Validate number
    let number;
    try {
      number = phoneUtil.parse(fullNumber);
      if (!phoneUtil.isValidNumber(number)) {
        return res.status(400).json({ message: "Invalid phone number/country code" });
      }
    } catch {
      return res.status(400).json({ message: "Invalid phone number/country code" });
    }

    // Lookup user
    const user = await User.findOne({ phone_number: fullNumber });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    return res.json({ message: "Login successful", user_id: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// FORGOT PASSWORD
function getCanonicalNumber(country_code, phone_number) {
  try {
    const cc = country_code.startsWith("+") ? country_code : `+${country_code}`;
    const fullNumber = phone_number.startsWith("+") ? phone_number : `${cc}${phone_number}`;
    const number = phoneUtil.parse(fullNumber);
    return phoneUtil.isValidNumber(number) ? fullNumber : null;
  } catch {
    return null;
  }
}

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  try {
    const { country_code, phone_number } = req.body;
    const fullNumber = getCanonicalNumber(country_code, phone_number);
    if (!fullNumber)
      return res.status(400).json({ message: "Invalid phone number/country code" });

    const user = await User.findOne({ phone_number: fullNumber });
    if (!user) return res.status(400).json({ message: "User not found" });

    // TODO: Send OTP via SMS here
    return res.json({ message: "OTP sent to phone", user_id: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { user_id, otp } = req.body;
    // TODO: Verify OTP logic here
    // For now, we just respond success
    return res.json({ message: "OTP verified", user_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { user_id, new_password } = req.body;
    const hashed = await bcrypt.hash(new_password, 10);
    const user = await User.findByIdAndUpdate(user_id, { password: hashed }, { new: true });
    if (!user) return res.status(400).json({ message: "User not found" });

    return res.json({ message: "Password reset successful", user_id: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};