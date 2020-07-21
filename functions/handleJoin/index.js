const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const sanitize = require('mongo-sanitize');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.handleJoin = async (req, res) => {
  // Check for requests other than POST
  if (req.method !== 'POST') {
    console.error('Invalid request type!');
    res.status(405).send('Method Not Allowed');
    return;
  }

  // Check for correct origin
  if (req.get('origin') !== 'https://bc-compsci-club.netlify.app') {
    console.error('Incorrect origin!');
    res.status(403).send('Forbidden');
    return;
  }

  const body = req.body;

  // Sanitize inputs
  const firstName = sanitize(body['first-name']);
  const lastName = sanitize(body['last-name']);
  const email = sanitize(body['email']);

  console.log(
    `${firstName} ${lastName} is requesting to join the club with email ${email}.`
  );

  if (
    // Validate form data
    firstName === '' ||
    lastName === '' ||
    !email.includes('@') ||
    // Validate data types
    typeof firstName !== 'string' ||
    typeof lastName !== 'string' ||
    typeof email !== 'string'
  ) {
    console.error('Form data invalid!');
    res.status(400).send('Bad Request');
    return;
  }

  // Generate unique document ID
  const docId = `${firstName} ${lastName} ${email} ${uuidv4()}`;
  const docRef = db.collection('members').doc(docId);

  console.log(
    `${firstName} ${lastName} has joined the club with email ${email}.`
  );

  // Add member to database
  await docRef.set({
    firstName: firstName,
    lastName: lastName,
    email: email,
    joinDate: new Date(),
  });

  res.redirect('https://bc-compsci-club.netlify.app/welcome');
};
