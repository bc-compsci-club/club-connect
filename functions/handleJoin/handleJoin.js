import querystring from 'querystring';

exports.handler = (event, context, callback) => {
  console.log('Received event: ' + event);
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const params = querystring.parse(event.body);
  console.log(params);

  const firstName = params["first-name"];
  const lastName = params["last-name"];
  const email = params["email"];

  callback(null, {
    statusCode: 200,
    body: `Thank you for joining the club ${firstName} ${lastName} with email ${email}`,
  });
};
