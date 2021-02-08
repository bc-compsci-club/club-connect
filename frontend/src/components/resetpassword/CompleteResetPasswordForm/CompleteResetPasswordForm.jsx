import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getUserIsLoggedIn } from 'utils/auth';
import { API_ROOT } from 'pages/_app';
import authStyles from 'styles/shared/Auth.module.scss';
import { toastErrorCenter } from 'utils/generalUtils';

const CompleteResetPasswordForm = (props) => {
  const { passwordResetKey } = props;

  const router = useRouter();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    if (getUserIsLoggedIn()) {
      router.prefetch('/');
    } else {
      router.prefetch('/login');
    }
  }, []);

  const handleSubmit = (e) => {
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

    axios
      .post(`${API_ROOT}/accounts/resetPassword`, {
        key: passwordResetKey,
        password: password,
      })
      .then(async (res) => {
        toast.success(
          `Password successfully reset! You may now log in to your account using your new password.`,
          {
            position: 'top-center',
          }
        );

        if (getUserIsLoggedIn()) {
          router.push('/');
        } else {
          router.push('/login');
        }
      })
      .catch((err) => {
        processError(err);
      })
      .finally(() => {
        setFormSubmitting(false);
      });
  };

  const processError = (err) => {
    if (err) console.error(err);
    toast.error(
      'An error occurred while resetting your password. Please try again or request another password reset email. If the error continues to happen, please contact us at contact@bccompsci.club.',
      {
        position: 'top-center',
      }
    );
  };

  return (
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

      <button
        className={authStyles.buttonPrimary}
        type="submit"
        disabled={formSubmitting}
      >
        {formSubmitting ? 'Resetting...' : 'Reset'}
      </button>
    </form>
  );
};

export default CompleteResetPasswordForm;
