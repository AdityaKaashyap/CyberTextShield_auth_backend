const jwtUtil = require("../utils/jwt");
const TokenBlacklist = require("../models/TokenBlacklist");

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Missing token" });

  const token = auth.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Missing token" });

  // 🚫 Check blacklist
  const blacklisted = await TokenBlacklist.findOne({ token });
  if (blacklisted) {
    return res.status(401).json({ message: "Token expired (logged out)" });
  }

  const payload = jwtUtil.verify(token);
  if (!payload) return res.status(401).json({ message: "Invalid token" });

  req.user = payload;
  req.token = token; // store token for logout
  next();
};
