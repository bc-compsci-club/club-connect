import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from 'components/common/Button';
import { ensureUserIsAuthenticated, getUserData } from 'utils/auth';
import commonStyles from 'styles/commonStyles.module.scss';
import formStyles from 'styles/shared/Form.module.scss';
import { API_ROOT, SITE_TITLE_BASE } from 'pages/_app';
import { toastErrorCenter, toastSuccessCenter } from 'utils/generalUtils';

const PostAnnouncement = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch } = useForm();
  const useCustomInternalName = watch('useCustomInternalName');

  const [submitting, setSubmitting] = useState(false);

  useEffect(async () => {
    if (!(await ensureUserIsAuthenticated(router, dispatch))) {
      return;
    }

    if (getUserData().role !== 'Admin') {
      toast.warn("You don't have permission to view this page.");
      router.push('/');
    }
  }, []);

  const postAnnouncement = async (submittedData) => {
    setSubmitting(true);

    let res;
    try {
      res = await axios.post(`${API_ROOT}/announcements`, submittedData, {
        withCredentials: true,
      });
    } catch (err) {
      setSubmitting(false);
      toastErrorCenter(
        'There was an error while posting the announcement. Please try again.'
      );
      console.error(err);
      return;
    }

    setSubmitting(false);
    toastSuccessCenter('Announcement successfully posted!');

    if (res.status === 201) {
      router.push(res.headers.location);
    } else {
      router.push('/announcements');
    }
  };

  return (
    <>
      <Head>
        <title>Post Announcement | {SITE_TITLE_BASE}</title>
      </Head>

      <div
        className={`${commonStyles.container} ${commonStyles.text} ${formStyles.formPage}`}
      >
        <h1 className={commonStyles.centerElement}>Post Announcement</h1>

        <form onSubmit={handleSubmit(postAnnouncement)}>
          <div className={formStyles.labeledInput}>
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              disabled={submitting}
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
              disabled={submitting}
              ref={register}
            />
          </div>

          <div className={formStyles.labeledInput}>
            <label htmlFor="body">Body*</label>
            <textarea
              rows="10"
              id="body"
              name="body"
              disabled={submitting}
              ref={register}
            />
          </div>

          <div className={formStyles.labeledInput}>
            <label htmlFor="role">Visible To*</label>
            <select name="role" id="role" disabled={submitting} ref={register}>
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
              disabled={submitting}
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
                disabled={submitting}
                ref={register}
                required={useCustomInternalName}
              />
            </div>
          )}

          <Button
            classNamePassed={formStyles.submitButton}
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Posting...' : 'Post'}
          </Button>
        </form>
      </div>
    </>
  );
};

export default PostAnnouncement;
