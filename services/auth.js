const axios = require('axios');

/**
 * 
 * @param {string} code 
 * @returns 
 */
module.exports.auth = (code) => {
  const url = process.env.OAUTH_URL;
  const data = new URLSearchParams();
  data.append('grant_type', 'authorization_code');
  data.append('client_id', process.env.CLIENT_ID);
  data.append('client_secret', process.env.CLIENT_SECRET);
  data.append('redirect_uri', process.env.REDIRECT_URL);
  data.append('code', code);

  return axios.post(url, data, {
    'Content-Type': 'application/x-www-form-urlencoded'
  });
}
