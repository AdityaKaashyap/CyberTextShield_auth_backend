const jwtUtil = require("../utils/jwt");
module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Missing token" });
  const token = auth.split(" ")[1];
  const payload = jwtUtil.verify(token);
  if (!payload) return res.status(401).json({ message: "Invalid token" });
  req.user = payload;
  next();
};
