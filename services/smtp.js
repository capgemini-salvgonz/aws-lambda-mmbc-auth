const axios = require('axios');

/**
 * 
 * @param {string} email 
 * @param {string} code 
 */
module.exports.sendMail = async (email, code) => {

  const url = process.env.EMAIL_SERVICE_URL;
  const apiKey = process.env.EMAIL_API_KEY;
  const mailOptions = {
    to: email,
    subject: 'MFA Code',
    html: `<p>Tu código de autorización es: <strong>${code}</strong></p>`
  };
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
  }

  axios.post(url, mailOptions, { headers });
}

