const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "replace_me";
const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

function sign(payload) {
  return jwt.sign(payload, secret, { expiresIn });
}

function verify(token) {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
}

module.exports = { sign, verify };
