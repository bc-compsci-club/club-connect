// @flow
import React, { useState } from 'react';
import './Join.scss';

const Join = () => {
  const [submitValue, setSubmitValue] = useState('Join!');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  /*   const disableForm = () => {
    // Style submit button
    document.getElementById('form-join-submit').disabled = true;
    document.getElementById('form-join-submit').style.backgroundColor =
    '#808cff';
    document.getElementById('form-join-submit').style.boxShadow = 'none';
    setSubmitValue('Joining...');

    // Disable inputs
    document.getElementById('first-name').disabled = true;
    document.getElementById('last-name').disabled = true;
    document.getElementById('email').disabled = true;

    // Visual disabled input indicator
    document.getElementById('first-name').style.color = '#4b4b4b';
    document.getElementById('last-name').style.color = '#4b4b4b';
    document.getElementById('email').style.color = '#4b4b4b';
  }; */

  return (
    <section className="Join">
      <div className="join-flex-container">
        <div className="join-container">
          <h1>Join the Club</h1>
          <form
            name="join"
            id="join-form"
            method="POST"
            action="https://us-east4-bc-cs-club-website.cloudfunctions.net/handleJoin"
            // onSubmit={disableForm}
          >
            <div className="form-name-row">
              <div className="form-first-name">
                <label htmlFor="first-name">First Name*</label>
                <input
                  className="form-join-field"
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="form-last-name">
                <label htmlFor="last-name">Last Name*</label>
                <input
                  className="form-join-field"
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-email">
              <label htmlFor="email">Email Address*</label>
              <input
                className="form-join-field"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <br />
            <div>
              <input id="form-join-submit" type="submit" value={submitValue} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Join;
