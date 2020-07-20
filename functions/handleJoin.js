import querystring from 'querystring';
import admin from 'firebase-admin';

exports.handler = async (event, context, callback) => {
  // Only POST events are allowed
  console.log('Received event: ' + event);
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  // Initialize Firebase
  admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT_KEY),
  });

  // Initialize Firestore
  const db = admin.firestore();

  // Parse event body
  const params = querystring.parse(event.body);
  const firstName = params['first-name'];
  const lastName = params['last-name'];
  const email = params['email'];

  // Create new Firestore document
  const docRef = db.collection('members').doc(email);
  await docRef.set({
    firstName: firstName,
    lastName: lastName,
    email: email,
  });

  callback(null, {
    statusCode: 200,
    body: `Thank you for joining the club ${firstName} ${lastName} with email ${email}`,
  });
};
