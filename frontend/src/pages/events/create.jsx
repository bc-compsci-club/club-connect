import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

import { EventEditor } from 'components/common';
import { ensureUserIsAuthenticated, getUserData } from 'utils/auth';
import { API_ROOT, SITE_NAME_BASE } from 'pages/_app';
import formStyles from 'styles/shared/Form.module.scss';
import commonStyles from 'styles/commonStyles.module.scss';

const CreateEvent = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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

  const createEvent = async (formData) => {
    setSubmitting(true);

    let res;
    try {
      res = await axios.post(`${API_ROOT}/events`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
    } catch (err) {
      setSubmitting(false);
      toast.error(
        'There was an error while creating the event. Please try again.',
        { position: 'top-center' }
      );
      console.error(err);
      return;
    }

    toast.success('Event successfully created!', { position: 'top-center' });
    setSubmitting(false);
    if (res.status === 201) {
      router.push(res.headers.location);
    } else {
      router.push('/events');
    }
  };

  return (
    <>
      <Head>
        <title>Create New Event – {SITE_NAME_BASE}</title>
      </Head>

      <div
        className={`${commonStyles.container} ${commonStyles.text} ${formStyles.formPage}`}
      >
        <h1 className={commonStyles.centerElement}>Create New Event</h1>

        <EventEditor
          formType="create"
          submitFunction={createEvent}
          submitting={submitting}
        />
      </div>
    </>
  );
};

export default CreateEvent;
