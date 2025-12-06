const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  country_code: { type: String, required: true },
  phone_number: { type: String, required: true, unique: true }, // store E.164 or canonical
  password: { type: String, required: true },
  permissions: {
    allow_contacts: { type: Boolean, default: false },
    allow_location: { type: Boolean, default: false },
    allow_media: { type: Boolean, default: false },
    allow_sms: { type: Boolean, default: false }
  },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
