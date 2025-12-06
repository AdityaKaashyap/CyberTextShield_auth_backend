// src/controllers/sms.controller.js

const axios = require("axios");
require("dotenv").config();

exports.intercept = async (req, res) => {
  try {
    const { message, sender } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message text is required" });
    }

    // Default sender if not provided
    const senderId = sender || "UNKNOWN";

    // Load prediction endpoint from .env
    const PREDICT_URL = process.env.FRONTEND_PREDICT_URL;

    if (!PREDICT_URL) {
      return res.status(500).json({
        error: "FRONTEND_PREDICT_URL missing in .env file"
      });
    }

    // ------ Send to FastAPI Model ------
    const payload = {
      messages: [message],
      senders: [senderId]
    };

    const response = await axios.post(PREDICT_URL, payload, {
      timeout: 10000
    });

    return res.status(200).json({
      message: "Prediction successful",
      model_output: response.data
    });

  } catch (error) {
    console.error("Prediction error:", error.message);

    return res.status(500).json({
      error: "Prediction failed",
      details: error.message
    });
  }
};
