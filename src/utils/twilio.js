const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM;
const client = twilio(accountSid, authToken);

async function sendOtpSms(to, otp) {
  // send simple SMS
  const body = `Your verification code is ${otp}. It will expire in ${process.env.OTP_EXPIRY_MINUTES || 5} minutes.`;
  return client.messages.create({ body, from: fromNumber, to });
}

// If using Twilio Verify service, you can add functions to start verification and check verification
module.exports = { sendOtpSms };
