import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import queryString from 'query-string';

import {
  CompleteResetPasswordForm,
  RequestPasswordResetForm,
  ResetEmailSent,
} from 'components/resetpassword';
import { SITE_NAME_BASE } from 'pages/_app';
import authStyles from 'styles/shared/Auth.module.scss';

const pageTitle = `Reset Password – ${SITE_NAME_BASE}`;

const ResetPassword = () => {
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [passwordResetKey, setPasswordResetKey] = useState(null);

  useEffect(() => {
    const parsedQueryString = queryString.parse(location.search);

    if (parsedQueryString.key) {
      setPasswordResetKey(parsedQueryString.key);
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
          url: 'https://bccompsci.club/resetpassword',
        }}
      />

      <div>
        <section className={`${authStyles.auth} ${authStyles.authBackground}`}>
          <div className={authStyles.flexContainer}>
            <div className={authStyles.container}>
              <h1>Reset Password</h1>
              {passwordResetKey ? (
                <CompleteResetPasswordForm
                  passwordResetKey={passwordResetKey}
                />
              ) : (
                <>
                  {resetEmailSent ? (
                    <ResetEmailSent />
                  ) : (
                    <RequestPasswordResetForm
                      setResetEmailSent={setResetEmailSent}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ResetPassword;
