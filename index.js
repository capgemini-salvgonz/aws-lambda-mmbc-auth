require('dotenv').config();
const queryString = require('querystring');
const { auth } = require('./services/auth');
const { getEmail, handleMfa } = require('./services/jwt-handler');

/**
 * 
 * @param {any} event 
 * @returns 
 */
module.exports.handler = async (event) => {

  const { code } = queryString.parse(event['body']);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };

  if (!code) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        message: 'Bad Request [code]'
      }),
    }
  }

  const response = await auth(code)
    .then((response) => {
      return handleMfa(response.data).then(r => response)
    })
    .then(response => {
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify(getEmail(response.data))
      }
    })
    .catch((error) => {
      console.error(error);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: error.message,
          code: error.code
        })
      }
    });

  return response;
};
