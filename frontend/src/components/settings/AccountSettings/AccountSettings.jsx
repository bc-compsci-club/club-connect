import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import Button from 'components/common/Button';
import formStyles from 'styles/shared/Form.module.scss';
import settingsSectionStyles from 'styles/pages/Settings.module.scss';
import accountSettingsStyles from './AccountSettings.module.scss';
import { API_ROOT } from 'pages/_app';

const settingsEndpoint = `${API_ROOT}/accounts/settings`;
const axiosConfig = {
  params: {
    section: 'account',
  },
  withCredentials: true,
};

const AccountSettings = () => {
  const { register, handleSubmit, watch, reset } = useForm();

  const shouldChangePassword = watch('shouldChangePassword');

  const [bcEmailExists, setBcEmailExists] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  // const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(settingsEndpoint, axiosConfig).then((res) => {
      if (res.data.brooklynCollegeEmail) {
        setBcEmailExists(true);
      }

      reset({
        email: res.data.email,
        brooklynCollegeEmail: res.data.brooklynCollegeEmail,
      });

      setPageReady(true);
    });
  }, []);

  const updateSettings = (data) => {
    // TODO: Add account settings updating
  };

  return (
    <section>
      <h1 className={settingsSectionStyles.settingsSectionHeading}>Account</h1>

      <div>
        <p>
          <strong>Coming soon...</strong>
        </p>

        <p>These settings are currently read-only for now.</p>

        <p>
          To change your password, click <Link href="/resetpassword">here</Link>
          .
        </p>

        <p>
          To change your email or delete your account, please contact us at{' '}
          <a href="mailto:contact@bccompsci.club">contact@bccompsci.club</a>.
        </p>
      </div>

      <hr />

      <form onSubmit={handleSubmit(updateSettings)}>
        <div className={settingsSectionStyles.formInputs}>
          <div className={formStyles.labeledInput}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={!pageReady ? 'Loading...' : ''}
              // disabled={submitting || !pageReady}
              disabled
              ref={register}
              required
            />
          </div>

          {/* For display only */}
          <div className={formStyles.labeledInput}>
            <label htmlFor="brooklynCollegeEmail">
              Brooklyn College Email Address
            </label>
            <input
              type="email"
              id="brooklynCollegeEmail"
              name="brooklynCollegeEmail"
              placeholder={
                !pageReady
                  ? 'Loading...'
                  : !bcEmailExists
                  ? 'Verify at "BC Verification"'
                  : ''
              }
              ref={register}
              disabled
              required
            />
          </div>

          <div className={formStyles.labeledInput}>
            <label htmlFor="currentPassword">Re-Enter Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              // disabled={submitting}
              disabled
              ref={register}
              required
            />
          </div>

          <div className={formStyles.checkbox}>
            <input
              type="checkbox"
              id="shouldChangePassword"
              name="shouldChangePassword"
              // disabled={submitting}
              disabled
              ref={register}
            />
            <label htmlFor="shouldChangePassword">Change Password?</label>
          </div>

          {shouldChangePassword && (
            <div className={accountSettingsStyles.changePasswordFields}>
              <div className={formStyles.labeledInput}>
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  disabled={submitting}
                  ref={register}
                  required={shouldChangePassword}
                />
              </div>

              <div className={formStyles.labeledInput}>
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  disabled={submitting}
                  ref={register}
                  required={shouldChangePassword}
                />
              </div>
            </div>
          )}
        </div>

        <Button
          classNamePassed={settingsSectionStyles.submitButton}
          type="submit"
          disabled
        >
          Save Changes
        </Button>
      </form>
    </section>
  );
};

export default AccountSettings;
