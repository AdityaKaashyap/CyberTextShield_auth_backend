const User = require("../models/User");

exports.updatePermissions = async (req, res) => {
  try {
    const { user_id, allow_contacts, allow_location, allow_media, allow_sms } = req.body;
    const update = {
      permissions: {
        allow_contacts: !!allow_contacts,
        allow_location: !!allow_location,
        allow_media: !!allow_media,
        allow_sms: !!allow_sms
      }
    };
    await User.findByIdAndUpdate(user_id, update);
    res.json({ message: "Permissions updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
