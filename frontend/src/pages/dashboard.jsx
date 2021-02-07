import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

import Card from 'components/common/Card';
import Button from 'components/common/Button';
import LoadingAnnouncement from 'components/common/LoadingAnnouncement';
import LoadingClubEvent from 'components/common/LoadingClubEvent';
import Announcement from 'components/dashboard/Announcement';
import { ClubEventBrowserListing } from 'components/events/index';
import {
  ensureUserIsAuthenticated,
  getUserData,
  refreshUserData,
} from 'utils/auth';
import dashboardStyles from 'styles/pages/Dashboard.module.scss';
import commonStyles from 'styles/commonStyles.module.scss';
import { API_ROOT, SITE_TITLE_BASE } from 'pages/_app';

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [pageReady, setPageReady] = useState(false);

  const [announcements, setAnnouncements] = useState([]);
  const [announcementsLoaded, setAnnouncementsLoaded] = useState(false);

  const [clubEvents, setClubEvents] = useState([]);
  const [clubEventsLoaded, setClubEventsLoaded] = useState(false);

  useEffect(async () => {
    if (!(await ensureUserIsAuthenticated(router, dispatch))) {
      return;
    }

    await refreshUserData();
    setPageReady(true);

    // Get all separate dashboard items separately
    // Announcements
    axios
      .get(`${API_ROOT}/announcements`, {
        withCredentials: true,
        params: {
          limit: 3,
        },
      })
      .then((res) => {
        setAnnouncements(res.data);
        setAnnouncementsLoaded(true);
      });

    // Events
    axios
      .get(`${API_ROOT}/events/browser`, {
        params: {
          limit: 3,
        },
      })
      .then((res) => {
        setClubEvents(res.data.upcomingEvents);
        setClubEventsLoaded(true);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Member Dashboard | {SITE_TITLE_BASE}</title>
      </Head>

      <div className={`${commonStyles.expandedWidthContainer}`}>
        {pageReady ? (
          <div className={commonStyles.text}>
            <h1>Welcome, {getUserData().firstName}</h1>
          </div>
        ) : (
          <Skeleton
            className={dashboardStyles.welcomeHeadingLoading}
            width={'40%'}
            height={'3rem'}
          />
        )}

        <div className={dashboardStyles.dashboardGrid}>
          {/* Announcements */}
          <Card className={dashboardStyles.announcementsCard}>
            <div className={dashboardStyles.announcementsHeader}>
              <h2>Announcements</h2>

              {pageReady && getUserData().role === 'Admin' && (
                <Button
                  classNamePassed={dashboardStyles.postButton}
                  href="/announcements/post"
                  asLink
                >
                  <span>
                    <strong>+</strong> Post
                  </span>
                </Button>
              )}
            </div>

            {announcementsLoaded ? (
              <>
                {announcements.length > 0 ? (
                  <div>
                    {announcements.map((data) => (
                      <Announcement data={data} key={data.id} />
                    ))}
                  </div>
                ) : (
                  <p>There are no announcements at this time. Check back soon!</p>
                )}
              </>
            ) : (
              <div>
                <LoadingAnnouncement />
                <LoadingAnnouncement />
                <LoadingAnnouncement />
              </div>
            )}

            <Link href="/announcements">See More</Link>
          </Card>

          {/* Club Events */}
          <Card className={dashboardStyles.clubEventsCard}>
            <h2>Up Next</h2>
            {clubEventsLoaded ? (
              <>
                {clubEvents.length > 0 ? (
                  <div className={dashboardStyles.clubEventsList}>
                    {clubEvents.map((clubEvent) => (
                      <ClubEventBrowserListing
                        id={clubEvent.id}
                        internalName={clubEvent.internalName}
                        title={clubEvent.title}
                        banner={clubEvent.banner}
                        key={clubEvent.id}
                      />
                    ))}
                  </div>
                ) : (
                  <p>There are no upcoming events at this time. Check back soon!</p>
                )}
              </>
            ) : (
              <div className={dashboardStyles.clubEventsList}>
                <LoadingClubEvent />
                <LoadingClubEvent />
                <LoadingClubEvent />
              </div>
            )}

            <Link href="/events">See More</Link>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
