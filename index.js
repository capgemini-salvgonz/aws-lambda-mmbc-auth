const queryString = require('querystring');
const { auth } = require('./auth');

module.exports.handler = async (event) => {

  const { code } = queryString.parse(event['body']);

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Bad Request [code]'
      })
    }
  }

  const response = await auth(code)
    .then((response) => {
      return {
        statusCode: response.status,
        body: JSON.stringify(response.data)
      }
    })
    .catch((error) => {
      console.error(error);
      return {
        statusCode: 400,
        body: JSON.stringify({
          message : error.message, 
          code: error.code
        })
      }
    });

    return response;
};
