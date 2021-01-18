import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import joinFormStyles from './JoinForm.module.scss';

const JOIN_ENDPOINT =
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

    axios
      .post(JOIN_ENDPOINT)
      .then((res) => {
        if (res.status === 200) {
          setMemberJoined(true);
          setFormSubmitting(false);
        } else {
          processError();
        }
      })
      .catch((err) => {
        console.error(err);
        processError();
      });
  };

  const processError = () => {
    setMemberJoined(false);
    setFormSubmitting(false);
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
    <section className={joinFormStyles.join}>
      <div className={joinFormStyles.flexContainer}>
        <div className={joinFormStyles.container}>
          <h1>Join the Club</h1>
          <form name="join" id="join-form" onSubmit={handleSubmit}>
            <div className={joinFormStyles.nameRow}>
              <div className={joinFormStyles.firstName}>
                <label htmlFor="first-name">First Name*</label>
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

              <div className={joinFormStyles.lastName}>
                <label htmlFor="last-name">Last Name*</label>
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

            <div className={joinFormStyles.email}>
              <label htmlFor="email">Email Address*</label>
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

            <button type="submit" disabled={formSubmitting}>
              Join!
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinForm;
