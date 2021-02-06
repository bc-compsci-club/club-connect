import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Button } from 'components/common';
import joinFormStyles from './JoinForm.module.scss';
import authStyles from 'styles/shared/Auth.module.scss';
import formStyles from 'styles/shared/Form.module.scss';
import { API_ROOT } from 'pages/_app';

const OLD_JOIN_ENDPOINT =
  'https://us-east1-bc-cs-club-website.cloudfunctions.net/handleJoin';

const JoinForm = (props) => {
  const { setMemberJoined } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    const memberData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    axios
      .post(`${API_ROOT}/join`, memberData)
      .then((res) => {
        setMemberJoined(true);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error(
            'The email address you provided is already in use. If this is your email address, please contact us at contact@bccompsci.club for further assistance.',
            {
              position: 'top-center',
              autoClose: 15000,
              closeOnClick: false,
              draggable: false,
            }
          );
        } else {
          processError(err);
        }
      })
      .finally(() => {
        setFormSubmitting(false);
      });
  };

  const processError = (err) => {
    setMemberJoined(false);

    if (err) console.error(err);
    toast.error(
      'An error occurred while registering you for the club. Please try again. If the error continues, please send us an email at contact@bccompsci.club so we can manually register you.',
      {
        position: 'top-center',
        autoClose: 15000,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  return (
    <section className={`${joinFormStyles.joinBackground} ${authStyles.auth}`}>
      <div className={authStyles.flexContainer}>
        <div className={authStyles.container}>
          <h1>Join the Club</h1>
          <form name="join" id="join-form" onSubmit={handleSubmit}>
            <div className={authStyles.twoColumnField}>
              <div className={authStyles.leftField}>
                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={formSubmitting}
                  required
                />
              </div>

              <div className={authStyles.rightField}>
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={formSubmitting}
                  required
                />
              </div>
            </div>

            <div className={authStyles.fullWidthField}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={formSubmitting}
                required
              />
            </div>

            <Button
              classNamePassed={formStyles.cardSubmitButton}
              type="submit"
              disabled={formSubmitting}
              big
            >
              Join!
            </Button>
          </form>

          <div className={authStyles.alternateAction}>
            <p>
              <strong>
                Need to activate your account instead?{' '}
                <Link href="/join/activate">Click Here.</Link>
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinForm;
