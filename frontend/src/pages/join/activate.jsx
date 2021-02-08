import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import queryString from 'query-string';
import { toast } from 'react-toastify';

import { Button } from 'components/common';
import { getUserIsLoggedIn, setLoggedIn } from 'utils/auth';
import { toastErrorCenter, toastSuccessCenter } from 'utils/generalUtils';
import { API_ROOT, SITE_NAME_BASE } from 'pages/_app';
import authStyles from 'styles/shared/Auth.module.scss';
import formStyles from 'styles/shared/Form.module.scss';

const pageTitle = `Activate Your Account – ${SITE_NAME_BASE}`;

const ActivateAccount = () => {
  const router = useRouter();

  const [activationKey, setActivationKey] = useState(null);

  useEffect(() => {
    // Logged in users can activate accounts, but we won't automatically log them in
    if (getUserIsLoggedIn()) {
      router.prefetch('/');
    } else {
      router.prefetch('/dashboard');
    }

    const parsedQueryString = queryString.parse(location.search);

    if (parsedQueryString.key) {
      setActivationKey(parsedQueryString.key);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <NextSeo
        title={pageTitle}
        openGraph={{
          title: pageTitle,
          url: 'https://bccompsci.club/join/activate',
        }}
      />

      <div>
        <section className={`${authStyles.auth} ${authStyles.authBackground}`}>
          <div className={authStyles.flexContainer}>
            {activationKey ? (
              <CompleteAccountActivationForm activationKey={activationKey} />
            ) : (
              <RequestActivationForm />
            )}
            }
          </div>
        </section>
      </div>
    </>
  );
};

const CompleteAccountActivationForm = (props) => {
  const { activationKey } = props;

  const router = useRouter();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    if (password !== passwordConfirmation) {
      toast.error('Your password and confirmation do not match.');
      setFormSubmitting(false);
      return;
    }

    if (password.length < 12) {
      toastErrorCenter('Your password must be at least 12 characters long.');
      setFormSubmitting(false);
      return;
    }

    try {
      await axios.post(
        `${API_ROOT}/accounts/activate`,
        {
          key: activationKey,
          password: password,
        },
        { withCredentials: true }
      );
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toastErrorCenter(
          'The activation link is invalid. Please try clicking on the activation link in your email again or request another activation email.'
        );
      } else {
        toastErrorCenter(
          'An error occurred while activating your account. Please try again or request another activation email. If the error continues to happen, please contact us at contact@bccompsci.club.'
        );
      }

      setFormSubmitting(false);
      return;
    }

    setFormSubmitting(false);
    if (getUserIsLoggedIn()) {
      toastSuccessCenter(
        'Account activated successfully. Please log out of this account and log in to the newly activated account to access it.'
      );
      router.push('/');
    } else {
      toastSuccessCenter('Account activated successfully. Welcome!');
      await setLoggedIn(dispatch);
      router.push('/dashboard');
    }
  };

  return (
    <div className={authStyles.container}>
      <h1>Activate Your Account</h1>
      <form name="join" id="join-form" onSubmit={handleSubmit}>
        <div className={authStyles.fullWidthField}>
          <label htmlFor="email">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={formSubmitting}
            required
          />
        </div>

        <div className={authStyles.fullWidthField}>
          <label htmlFor="email">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
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
          {formSubmitting ? 'Activating Account...' : 'Activate!'}
        </Button>
      </form>
    </div>
  );
};

const RequestActivationForm = () => {
  const [email, setEmail] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      await axios.post(`${API_ROOT}/accounts/activate/request`, {
        email: email,
      });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toastErrorCenter(
          'No joined member with this email exists, or the account may have already been activated. Please join the club before activating your account or log in if you already have an account.'
        );
      } else {
        toastErrorCenter(
          'An error occurred while activating your account. Please try again. If the error continues to happen, please contact us at contact@bccompsci.club.'
        );
      }

      setFormSubmitting(false);
      return;
    }

    setFormSubmitting(false);
    toastSuccessCenter(
      'An activation email has been sent if there is a member associated with the email! Check your email for a link to complete account activation.'
    );
  };

  return (
    <div className={authStyles.container}>
      <h1>Activate Your Account</h1>
      <form name="join" id="join-form" onSubmit={handleSubmit}>
        <div className={authStyles.fullWidthField}>
          <label htmlFor="email">Email Address You Joined With</label>
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
          {formSubmitting ? 'Sending...' : 'Send Activation Email'}
        </Button>
      </form>

      <div className={authStyles.alternateAction}>
        <p>
          <strong>
            Not a member yet? <Link href="/join">Join Now.</Link>
          </strong>
        </p>
      </div>
    </div>
  );
};

export default ActivateAccount;
