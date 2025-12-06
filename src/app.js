require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db"); // connects to MongoDB
const authRoutes = require("./routes/auth.routes");
const permRoutes = require("./routes/permission.routes");
const smsRoutes = require("./routes/sms.routes");
const reportsRoutes = require("./routes/report.routes");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use("/auth", authRoutes);
app.use("/permissions", permRoutes);
app.use("/sms", smsRoutes);
app.use("/reports", reportsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Auth backend running on ${PORT}`));
