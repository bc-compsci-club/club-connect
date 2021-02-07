import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { Button } from 'components/common';
import Announcement from 'components/dashboard/Announcement';
import LoadingAnnouncement from 'components/common/LoadingAnnouncement';
import {
  ensureUserIsAuthenticated,
  getUserData,
  getUserIsLoggedIn,
} from 'utils/auth';
import commonStyles from 'styles/commonStyles.module.scss';
import { API_ROOT, SITE_TITLE_BASE } from 'pages/_app';

const Announcements = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(async () => {
    if (!(await ensureUserIsAuthenticated(router, dispatch))) {
      return;
    }

    axios
      .get(`${API_ROOT}/announcements`, {
        withCredentials: true,
        params: {
          limit: 50,
        },
      })
      .then((res) => {
        setAnnouncements(res.data);
        setPageLoaded(true);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Announcements | {SITE_TITLE_BASE}</title>
      </Head>
      <div className={`${commonStyles.container} ${commonStyles.text}`}>
        <h1 className={commonStyles.centerElement}>Announcements</h1>

        <section>
          {pageLoaded ? (
            <>
              {announcements.length > 0 ? (
                <>
                  {announcements.map((data) => (
                    <Announcement data={data} key={data.id} />
                  ))}
                </>
              ) : (
                <p className={commonStyles.centerElement}>
                  There are no announcements at this time. Check back soon!
                </p>
              )}

              {getUserIsLoggedIn() && getUserData().role === 'Admin' && (
                <section
                  className={`${commonStyles.actionButton} ${commonStyles.marginTopTwoRem}`}
                >
                  <Button href="/announcements/post" asLink>
                    Post Announcement
                  </Button>
                </section>
              )}
            </>
          ) : (
            <>
              <LoadingAnnouncement />
              <LoadingAnnouncement />
              <LoadingAnnouncement />
              <LoadingAnnouncement />
              <LoadingAnnouncement />
              <LoadingAnnouncement />
              <LoadingAnnouncement />
              <LoadingAnnouncement />
              <LoadingAnnouncement />
              <LoadingAnnouncement />
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Announcements;
