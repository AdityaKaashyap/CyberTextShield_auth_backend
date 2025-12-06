// lightweight phone validator using libphonenumber pattern via 'phonenumbers' npm wrapper
const phonenumbers = require("google-libphonenumber");

function validateFullNumber(country_code, phone_number) {
  // Accept inputs like '+1' and '4155552671' or full E.164 '+14155552671'
  let full = phone_number;
  if (!phone_number.startsWith("+")) {
    // ensure country_code like '+1' or '1'
    if (!country_code) return false;
    const cc = country_code.startsWith("+") ? country_code : `+${country_code}`;
    full = cc + phone_number;
  }
  try {
    const parsed = phonenumbers.parse(full);
    return phonenumbers.isValidNumber(parsed);
  } catch (e) {
    return false;
  }
}

module.exports = { validateFullNumber };
