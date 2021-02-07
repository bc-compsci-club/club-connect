import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { NextSeo } from 'next-seo';
import queryString from 'query-string';

import { Button } from 'components/common';
import { getUserIsLoggedIn, setLoggedIn } from 'utils/auth';
import { toastErrorCenter } from 'utils/generalUtils';
import { API_ROOT, SITE_NAME_BASE } from 'pages/_app';
import loginFormStyles from 'styles/pages/Login.module.scss';
import authStyles from 'styles/shared/Auth.module.scss';
import formStyles from 'styles/shared/Form.module.scss';

const pageTitle = `Log In – ${SITE_NAME_BASE}`;

const LogIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(async () => {
    // Redirect to dashboard if logged in already
    if (getUserIsLoggedIn()) {
      await router.push('/dashboard');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    // Log the user in and retrieve JWT
    const authenticationCredentials = {
      email: email,
      password: password,
    };

    try {
      await axios.post(
        `${API_ROOT}/accounts/login`,
        authenticationCredentials,
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      // err.response might be undefined
      const errStatus = err.response && err.response.status;
      console.log(err.response);
      if (errStatus === 401) {
        toastErrorCenter(
          'Your email or password is incorrect. Please check your credentials and try again.'
        );
      } else if (errStatus === 429) {
        toastErrorCenter(
          'You have entered an incorrect email or password too many times. Please try again in an hour.'
        );
      } else {
        toastErrorCenter(
          'An error occurred while trying to log you in. Please try again.'
        );
      }

      setFormSubmitting(false);
      console.error(err);
      return;
    }

    // Set application state and localStorage to be logged in
    await setLoggedIn(dispatch);
    setFormSubmitting(false);

    // Redirect to the appropriate page
    const parsedQueryString = queryString.parse(location.search);
    if (parsedQueryString.returnToPage) {
      router.push(parsedQueryString.returnToPage);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <NextSeo
        title={pageTitle}
        openGraph={{
          title: pageTitle,
          url: 'https://bccompsci.club/login',
        }}
      />

      <div>
        <section className={`${authStyles.auth} ${authStyles.authBackground}`}>
          <div className={authStyles.flexContainer}>
            <div className={authStyles.container}>
              <h1>Member Log In</h1>
              <form name="join" id="join-form" onSubmit={handleSubmit}>
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

                <div className={authStyles.fullWidthField}>
                  <label htmlFor="password">Password</label>
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

                <div className={loginFormStyles.resetPassword}>
                  <Link href="/resetpassword">Forgot password?</Link>
                </div>

                <Button
                  classNamePassed={formStyles.cardSubmitButton}
                  type="submit"
                  disabled={formSubmitting}
                  big
                >
                  Log In
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
          </div>
        </section>
      </div>
    </>
  );
};

export default LogIn;
