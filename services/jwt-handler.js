const { v4: uuid } = require('uuid');
const { sendMail } = require('./smtp');
const { save } = require('./mongo');

/**
 * 
 * @param {string} token 
 * @returns 
 */
const parseToken = (token) => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

/**
 * 
 * @param {string} jwt 
 */
module.exports.getEmail = (jwt) => {
  const idToken = parseToken(jwt['id_token']);
  const [user, domain] = idToken.email.split('@');
  const hidenEmail = `${user.substring(0, 2)}*****@${domain}`;
  return { userName: idToken['cognito:username'], email: hidenEmail };
}

/**
 * 
 * @param {any} jwt 
 */
module.exports.handleMfa = async (jwt) => {
  const idToken = parseToken(jwt['id_token']);
  const mfaCode = uuid().split("-")[0];
  const document = {
    userName: idToken['cognito:username'],
    email: idToken.email,
    jwt,
    mfaCode
  };

  try {
    await Promise.all([save(document), sendMail(document.email, mfaCode)]).catch(error => error);
  } catch (error) {
    console.log(error);
  }
}