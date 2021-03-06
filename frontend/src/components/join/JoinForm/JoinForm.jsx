import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

import { Button } from 'components/common';
import { toastErrorCenterImportant } from 'utils/generalUtils';
import { API_ROOT } from 'pages/_app';
import joinFormStyles from './JoinForm.module.scss';
import authStyles from 'styles/shared/Auth.module.scss';
import formStyles from 'styles/shared/Form.module.scss';

const JoinForm = (props) => {
  const { setMemberJoined } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    const memberData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    try {
      await axios.post(`${API_ROOT}/join`, memberData);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toastErrorCenterImportant(
          'The email address you provided is already in use. If this is your email address, please contact us at contact@bccompsci.club for further assistance.'
        );
      } else {
        toastErrorCenterImportant(
          'An error occurred while registering you for the club. Please try again. If the error continues, please send us an email at contact@bccompsci.club so we can manually register you.'
        );
      }

      setFormSubmitting(false);
      return;
    }

    setMemberJoined(true);
    setFormSubmitting(false);
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
