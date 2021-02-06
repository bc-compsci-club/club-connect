import React from 'react';
import { useRouter } from 'next/router';

import styles from './ResetEmailSent.module.scss';
import authStyles from 'styles/shared/Auth.module.scss';

const ResetEmailSent = () => {
  const router = useRouter();

  return (
    <div>
      <p className={styles.resetPasswordText}>
        If an account exists with the email you entered, check your email for a
        link to finish resetting your password.
      </p>

      <button
        onClick={() => router.push('/login')}
        className={authStyles.buttonPrimary}
      >
        Return to Log In
      </button>
    </div>
  );
};

export default ResetEmailSent;
