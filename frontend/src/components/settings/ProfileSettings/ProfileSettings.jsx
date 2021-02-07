import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import Button from 'components/common/Button';
import { refreshUserData } from 'utils/auth';
import {
  getMemberImage,
  toastErrorCenter,
  toastSuccessCenter,
} from 'utils/generalUtils';
import settingsSectionStyles from 'styles/pages/Settings.module.scss';
import profileSettingsStyles from './ProfileSettings.module.scss';
import formStyles from 'styles/shared/Form.module.scss';
import { API_ROOT } from 'pages/_app';
import { toast } from 'react-toastify';

const settingsEndpoint = `${API_ROOT}/accounts/settings`;
const axiosConfig = {
  params: {
    section: 'profile',
  },
  withCredentials: true,
};

const ProfileSettings = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  const [memberImageUrl, setMemberImageUrl] = useState(getMemberImage());
  const [pageReady, setPageReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(async () => {
    let res;
    try {
      res = await axios.get(settingsEndpoint, axiosConfig);
    } catch (err) {
      toastErrorCenter(
        'An error occurred while retrieving your profile settings. Please try refreshing the page.'
      );
      console.log(err);
      return;
    }

    reset({
      firstName: res.data.firstName,
      lastName: res.data.lastName,
    });

    if (res.data.memberImage) {
      setMemberImageUrl(res.data.memberImage);
    }

    setPageReady(true);
  }, []);

  const updateSettings = async (data) => {
    setSubmitting(true);

    const updatedSettings = {
      firstName: data.firstName,
      lastName: data.lastName,
    };

    const formData = new FormData();
    formData.append('formDataJson', JSON.stringify(updatedSettings));
    // Submit member image only if it exists
    if (data.memberImageFile.length > 0) {
      formData.append('memberImageFile', data.memberImageFile[0]);
      toast('Uploading profile image...', {
        position: 'top-center',
        autoClose: 10000,
      });
    }

    try {
      await axios.put(settingsEndpoint, formData, {
        ...axiosConfig,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      setSubmitting(false);
      toastErrorCenter(
        'An error occurred while updating your settings. Please try again.'
      );
      console.error(err);
      return;
    }

    // Refresh the user's data
    await refreshUserData();
    toastSuccessCenter(
      'Your profile has been updated successfully! Refreshing the page...'
    );

    // Reload the page to apply the changes
    setTimeout(() => {
      router.reload();
    }, 1000);
  };

  return (
    <section>
      <h1 className={settingsSectionStyles.settingsSectionHeading}>Profile</h1>

      <form onSubmit={handleSubmit(updateSettings)}>
        <div className={profileSettingsStyles.formInputsAndImage}>
          <div className={profileSettingsStyles.name}>
            <div className={formStyles.labeledInput}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder={!pageReady ? 'Loading...' : ''}
                disabled={submitting || !pageReady}
                ref={register}
                required
              />
            </div>

            <div className={formStyles.labeledInput}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder={!pageReady ? 'Loading...' : ''}
                disabled={submitting || !pageReady}
                ref={register}
                required
              />
            </div>

            <div className={formStyles.labeledInput}>
              <label htmlFor="memberImageFile">Change Profile Image</label>
              <input
                type="file"
                id="memberImageFile"
                name="memberImageFile"
                accept="image/png,image/jpeg"
                disabled={submitting || !pageReady}
                ref={register}
              />
            </div>
          </div>

          <div className={profileSettingsStyles.memberImageContainer}>
            <span className={profileSettingsStyles.memberImageLabel}>
              Current Profile Image
            </span>

            {pageReady ? (
              <img
                className={profileSettingsStyles.memberImage}
                src={memberImageUrl}
                alt="Member Image"
              />
            ) : (
              <Skeleton
                className={profileSettingsStyles.memberImage}
                circle={true}
              />
            )}
          </div>
        </div>

        <Button
          classNamePassed={settingsSectionStyles.submitButton}
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </section>
  );
};

export default ProfileSettings;
