import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

import EventEditor from 'components/common/EventEditor/EventEditor';
import commonStyles from 'styles/commonStyles.module.scss';
import formStyles from 'styles/shared/Form.module.scss';
import { API_ROOT, SITE_TITLE_BASE } from 'pages/_app';
import { ensureUserIsAuthenticated } from 'utils/auth';

const RequestEvent = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [submitting, setSubmitting] = useState(false);
  useEffect(async () => {
    ensureUserIsAuthenticated(router, dispatch);
  }, []);

  const submitEventRequest = async (formData) => {
    setSubmitting(true);

    try {
      await axios.post(`${API_ROOT}/events/request`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
    } catch (err) {
      setSubmitting(false);
      toast.error(
        'There was an error while submitting your event request. Please try again.'
      );
      console.error(err);
      return;
    }

    setSubmitting(false);
    toast.success(
      'Your event request has been sent! We will get back to you shortly with further details.',
      { position: 'top-center' }
    );
    router.push('/events');
  };

  return (
    <>
      <Head>
        <title>New Event Request | {SITE_TITLE_BASE}</title>
      </Head>

      <div
        className={`${commonStyles.container} ${commonStyles.text} ${formStyles.formPage}`}
      >
        <h1 className={commonStyles.centerElement}>New Event Request</h1>

        <EventEditor
          formType="request"
          submitFunction={submitEventRequest}
          submitting={submitting}
        />
      </div>
    </>
  );
};

export default RequestEvent;
