import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

import authStyles from 'styles/shared/Auth.module.scss';
import { API_ROOT } from 'pages/_app';

const RequestPasswordResetForm = (props) => {
  const { setResetEmailSent } = props;

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    const resetPasswordData = {
      email: email,
    };

    try {
      await axios.post(
        `${API_ROOT}/accounts/resetPassword/request`,
        resetPasswordData
      );
      setResetEmailSent(true);
    } catch (err) {
      toast.error(
        'An error occurred while resetting your password. Please try again. If the error continues, please send us an email at contact@bccompsci.club.',
        {
          position: 'top-center',
          autoClose: 15000,
          closeOnClick: false,
          draggable: false,
        }
      );
    }

    setFormSubmitting(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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

        <button
          className={authStyles.buttonPrimary}
          type="submit"
          disabled={formSubmitting}
        >
          {formSubmitting ? 'Sending Email...' : 'Send Reset Email'}
        </button>
      </form>

      <button
        onClick={() => router.push('/login')}
        className={authStyles.buttonSecondary}
        disabled={formSubmitting}
      >
        Cancel
      </button>
    </>
  );
};

export default RequestPasswordResetForm;
