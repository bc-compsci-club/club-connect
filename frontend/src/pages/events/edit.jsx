import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import queryString from 'query-string';

import EventEditor from 'components/common/EventEditor/EventEditor';
import { ensureUserIsAuthenticated } from 'utils/auth';
import { toastErrorCenter } from 'utils/generalUtils';
import commonStyles from 'styles/commonStyles.module.scss';
import formStyles from 'styles/shared/Form.module.scss';
import { API_ROOT, SITE_TITLE_BASE } from 'pages/_app';

const EditEvent = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [submitting, setSubmitting] = useState(false);

  useEffect(async () => {
    if (!(await ensureUserIsAuthenticated(router, dispatch))) {
      return;
    }
  }, []);

  const updateEvent = async (formData) => {
    setSubmitting(true);

    const parsedQueryString = queryString.parse(location.search);
    if (!parsedQueryString.id) {
      toastErrorCenter('An error occurred while updating the event.');
      return;
    }

    const eventId = parsedQueryString.id;

    try {
      await axios.put(`${API_ROOT}/events/${eventId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
    } catch (err) {
      setSubmitting(false);
      toast.error(
        'There was an error while updating the event. Please try again.',
        { position: 'top-center' }
      );
      console.error(err);
      return;
    }

    toast.success('Event successfully updated!', { position: 'top-center' });
    setSubmitting(false);
    router.push(`/events/${eventId}`);
  };

  return (
    <>
      <Head>
        <title>Create New Event | {SITE_TITLE_BASE}</title>
      </Head>

      <div
        className={`${commonStyles.container} ${commonStyles.text} ${formStyles.formPage}`}
      >
        <h1 className={commonStyles.centerElement}>Edit Event</h1>

        <EventEditor
          formType="edit"
          submitFunction={updateEvent}
          submitting={submitting}
        />
      </div>
    </>
  );
};

export default EditEvent;
