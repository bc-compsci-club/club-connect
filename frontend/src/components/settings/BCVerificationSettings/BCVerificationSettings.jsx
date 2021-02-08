import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import { Button } from 'components/common';
import { getUserData } from 'utils/auth';
import {
  isBrooklynCollegeEmail,
  toastErrorCenter,
  toastErrorCenterImportant,
  toastSuccessCenter,
} from 'utils/generalUtils';
import { API_ROOT } from 'pages/_app';
import bcVerificationStyles from './BCVerificationSettings.module.scss';
import settingsSectionStyles from 'styles/pages/Settings.module.scss';
import formStyles from 'styles/shared/Form.module.scss';

const BCVerificationSettings = () => {
  const { register, handleSubmit } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [bcEmail, setBCEmail] = useState('Loading...');

  useEffect(async () => {
    let res;
    try {
      res = await axios.get(`${API_ROOT}/accounts/settings`, {
        params: {
          section: 'account',
        },
        withCredentials: true,
      });
    } catch (err) {
      toastErrorCenter('Unable to retrieve account settings.');
      console.error(err);
      return;
    }

    setBCEmail(res.data.brooklynCollegeEmail);
  }, []);

  const requestVerificationEmail = async (data) => {
    setSubmitting(true);

    if (!isBrooklynCollegeEmail(data.brooklynCollegeEmail)) {
      toastErrorCenter('Please enter a valid Brooklyn College email address.');
      setSubmitting(false);
      return;
    }

    // Email is from Brooklyn College, proceed to send confirmation email
    const verificationBody = {
      brooklynCollegeEmail: data.brooklynCollegeEmail,
    };

    try {
      await axios.post(
        `${API_ROOT}/accounts/verify/bc/request`,
        verificationBody,
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toastErrorCenterImportant(
          'The email address you provided is already in use. If this is your email address, please contact us at contact@bccompsci.club for further assistance.'
        );
      } else {
        toastErrorCenterImportant(
          'An error occurred while trying to verify your Brooklyn College email address. Please try again. If the error continues, please send us an email at contact@bccompsci.club so we can manually verify you.'
        );
      }

      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    toastSuccessCenter(
      'Verification email sent! Please check your Brooklyn College email and click the link in the verification email to continue.'
    );
  };

  return (
    <section>
      <h1 className={settingsSectionStyles.settingsSectionHeading}>
        BC Verification
      </h1>

      {getUserData().role === 'BrooklynCollegeMember' ||
      getUserData().role === 'Admin' ? (
        <>
          <div className={bcVerificationStyles.verificationStatus}>
            <CheckRoundedIcon style={{ color: 'green' }} />
            <span>
              <strong>Verified</strong>
            </span>
          </div>

          <p>
            Your account is verified! If you need to change your Brooklyn
            College email, please contact us at&nbsp;
            <a href="mailto:contact@bccompsci.club">contact@bccompsci.club</a>.
          </p>

          {getUserData().role === 'BrooklynCollegeMember' && (
            <div>
              <span>
                <strong>Current BC Email: </strong>
              </span>
              <a href={`mailto:${bcEmail}`}>{bcEmail}</a>
            </div>
          )}
        </>
      ) : (
        <>
          <div className={bcVerificationStyles.verificationStatus}>
            <CloseRoundedIcon style={{ color: 'red' }} />
            <span>
              <strong>Not Verified</strong>
            </span>
          </div>

          <p className={bcVerificationStyles.description}>
            Are you a Brooklyn College student, alumni, or faculty member?
            Verify your Brooklyn College email to gain access to exclusive
            opportunities for Brooklyn College club members and to get the&nbsp;
            <strong>BC Verified</strong> Discord role!
          </p>

          <form onSubmit={handleSubmit(requestVerificationEmail)}>
            <div className={settingsSectionStyles.formInputs}>
              <div className={formStyles.labeledInput}>
                <label htmlFor="brooklynCollegeEmail">
                  Brooklyn College Email Address
                </label>
                <input
                  type="email"
                  id="brooklynCollegeEmail"
                  name="brooklynCollegeEmail"
                  disabled={submitting}
                  ref={register}
                  required
                />
              </div>
            </div>

            <Button
              classNamePassed={settingsSectionStyles.submitButton}
              type="submit"
            >
              Send Verification Email
            </Button>
          </form>
        </>
      )}
    </section>
  );
};

export default BCVerificationSettings;
