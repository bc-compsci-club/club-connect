import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import queryString from 'query-string';

import RequestPasswordResetEmailForm from 'components/resetpassword/RequestPasswordResetForm';
import ResetEmailSent from 'components/resetpassword/ResetEmailSent/ResetEmailSent';
import CompleteResetPasswordForm from 'components/resetpassword/CompleteResetPasswordForm/CompleteResetPasswordForm';
import authStyles from 'styles/shared/Auth.module.scss';
import { SITE_TITLE_BASE } from 'pages/_app';

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
        <title>Reset Password | {SITE_TITLE_BASE}</title>
      </Head>

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
                    <RequestPasswordResetEmailForm
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
