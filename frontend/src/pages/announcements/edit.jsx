import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import { toast } from 'react-toastify';

import Button from 'components/common/Button';
import { ensureUserIsAuthenticated, getUserData } from 'utils/auth';
import { toastErrorCenter, toastSuccessCenter } from 'utils/generalUtils';
import commonStyles from 'styles/commonStyles.module.scss';
import formStyles from 'styles/shared/Form.module.scss';
import { API_ROOT, SITE_NAME_BASE } from 'pages/_app';

// TODO: Modularize announcement editor like the EventEditor component
const EditAnnouncement = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, reset } = useForm();
  const useCustomInternalName = watch('useCustomInternalName');

  const [submitting, setSubmitting] = useState(false);
  const [formReady, setFormReady] = useState(false);
  const [announcementId, setAnnouncementId] = useState(null);

  useEffect(async () => {
    if (!(await ensureUserIsAuthenticated(router, dispatch))) {
      return;
    }

    if (getUserData().role !== 'Admin') {
      toast.warn("You don't have permission to view this page.");
      await router.push('/');
      return;
    }

    const parsedQueryString = queryString.parse(location.search);
    if (!parsedQueryString.id) {
      toastErrorCenter('No announcement ID was specified for editing.');
      await router.push('/announcements');
      return;
    }

    // Get the announcement data to edit
    let res;
    try {
      res = await axios.get(
        `${API_ROOT}/announcements/${parsedQueryString.id}`,
        { withCredentials: true }
      );
    } catch (err) {
      toastErrorCenter('An error occurred while getting the event data.');
      await router.push(`/announcements/${parsedQueryString.id}`);
      return;
    }

    // Load event data into the form
    reset(res.data);
    setAnnouncementId(parsedQueryString.id);
    setFormReady(true);
  }, []);

  const updateAnnouncement = async (submittedData) => {
    setSubmitting(true);

    try {
      await axios.put(
        `${API_ROOT}/announcements/${announcementId}`,
        submittedData,
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      setSubmitting(false);
      toastErrorCenter(
        'There was an error while updating the announcement. Please try again.'
      );
      console.error(err);
      return;
    }

    setSubmitting(false);
    toastSuccessCenter('Announcement successfully updated!');
    router.push(`/announcements/${announcementId}`);
  };

  return (
    <>
      <Head>
        <title>Edit Announcement – {SITE_NAME_BASE}</title>
      </Head>

      <div
        className={`${commonStyles.container} ${commonStyles.text} ${formStyles.formPage}`}
      >
        <h1 className={commonStyles.centerElement}>Edit Announcement</h1>

        <form onSubmit={handleSubmit(updateAnnouncement)}>
          <div className={formStyles.labeledInput}>
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              disabled={!formReady || submitting}
              placeholder={!formReady ? 'Loading' : ''}
              ref={register}
              required
            />
          </div>

          <div className={formStyles.labeledInput}>
            <label htmlFor="headline">Headline*</label>
            <input
              type="text"
              id="headline"
              name="headline"
              disabled={!formReady || submitting}
              ref={register}
            />
          </div>

          <div className={formStyles.labeledInput}>
            <label htmlFor="body">Body*</label>
            <textarea
              rows="10"
              id="body"
              name="body"
              disabled={!formReady || submitting}
              ref={register}
            />
          </div>

          <div className={formStyles.labeledInput}>
            <label htmlFor="role">Visible To*</label>
            <select
              name="role"
              id="role"
              disabled={!formReady || submitting}
              ref={register}
            >
              <option value="Member">All Members</option>
              <option value="BrooklynCollegeMember">
                Brooklyn College Members Only
              </option>
            </select>
          </div>

          <div
            className={`${formStyles.customInternalName} ${formStyles.checkbox} ${formStyles.checkboxCentered}`}
          >
            <input
              type="checkbox"
              name="useCustomInternalName"
              id="useCustomInternalName"
              disabled={!formReady || submitting}
              ref={register}
            />
            <label htmlFor="useCustomInternalName">
              Use Custom Internal Name
            </label>
          </div>

          {useCustomInternalName && (
            <div className={formStyles.labeledInput}>
              <label htmlFor="internalName">
                Internal Name (must-be-lowercase-kebab-case-like-this)*
              </label>
              <input
                type="text"
                id="internalName"
                name="internalName"
                pattern="^([a-z][a-z0-9]*)(-[a-z0-9]+)*$"
                disabled={!formReady || submitting}
                ref={register}
                required={useCustomInternalName}
              />
            </div>
          )}

          <Button
            classNamePassed={formStyles.formButton}
            type="submit"
            disabled={!formReady || submitting}
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditAnnouncement;
