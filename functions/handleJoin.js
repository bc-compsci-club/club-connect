import querystring from 'querystring';

exports.handler = async (event, context, callback) => {
  console.log('Received event: ' + event);
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const params = querystring.parse(event.body);
  
  const firstName = params.firstName;
  const lastName = params.lastName;
  const email = params.email;

  return {
    statusCode: 200,
    body: `Hello, ${firstName}`,
  };
};
