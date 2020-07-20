const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

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
  let body = req.body;

  const firstName = body['first-name'];
  const lastName = body['last-name'];
  const email = body['email'];

  const docId = `${firstName} ${lastName} ${email} ${uuidv4()}`;
  console.log(docId);
  const docRef = db.collection('members').doc(docId);
  await docRef.set({
    firstName: firstName,
    lastName: lastName,
    email: email,
  });

  res
    .status(200)
    .send(
      `Welcome to the club, ${firstName} ${lastName}! Your registered email is ${email}.`
    );
};
