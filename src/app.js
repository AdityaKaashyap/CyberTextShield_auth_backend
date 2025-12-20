require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db"); // connects to MongoDB
const authRoutes = require("./routes/auth.routes");
const permRoutes = require("./routes/permission.routes");
const smsRoutes = require("./routes/sms.routes");
const reportsRoutes = require("./routes/report.routes");
const authMiddleware = require("./middleware/auth.middleware");
const cyberNewsRoutes = require("./routes/cyberNews.routes");




const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use("/auth", authRoutes);

app.use("/reports", authMiddleware, reportsRoutes);
app.use("/sms", authMiddleware, smsRoutes);
app.use("/permissions", authMiddleware, permRoutes);
app.use("/cyber-news", cyberNewsRoutes);

app.get("/", (req, res) => res.send("API Working"))

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on http://0.0.0.0:5000");
});
