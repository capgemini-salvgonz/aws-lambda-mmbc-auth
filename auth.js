const axios = require('axios');


module.exports.auth = (code) => {
  const url = "https://mmbc.auth.us-west-1.amazoncognito.com/oauth2/token";
  const data = new URLSearchParams();
  data.append('grant_type', 'authorization_code');
  data.append('client_id', '');
  data.append('client_secret', '');
  data.append('redirect_uri', 'http://localhost:4200/auth');
  data.append('code', code);

  return axios.post(url, data, {
    'Content-Type': 'application/x-www-form-urlencoded'
  });
}