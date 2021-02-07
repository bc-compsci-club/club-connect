import React from 'react';
import Head from 'next/head';
import axios from 'axios';

import { ClubEventBrowserListing } from 'components/events/index';
import Button from 'components/common/Button';
import { getUserData, getUserIsLoggedIn } from 'utils/auth';
import eventBrowserStyles from 'styles/pages/Events.module.scss';
import commonStyles from 'styles/commonStyles.module.scss';
import { API_ROOT, SITE_TITLE_BASE } from 'pages/_app';

const EventBrowser = (props) => {
  const { events } = props;

  return (
    <>
      <Head>
        <title>Events | {SITE_TITLE_BASE}</title>
      </Head>
      <div
        className={`${commonStyles.container} ${commonStyles.text} ${eventBrowserStyles.eventBrowser}`}
      >
        <section className={eventBrowserStyles.category}>
          <h1 className={commonStyles.centerElement}>Upcoming Events</h1>

          {events.upcomingEvents.length > 0 ? (
            <div className={eventBrowserStyles.banners}>
              {events.upcomingEvents.map((event) => createEvent(event))}
            </div>
          ) : (
            <p className={eventBrowserStyles.noEvents}>
              There are no upcoming events at this time. Check back soon!
            </p>
          )}
        </section>

        <section className={eventBrowserStyles.category}>
          <h2 className={commonStyles.centerElement}>Past Events</h2>

          {events.pastEvents.length > 0 ? (
            <div className={eventBrowserStyles.banners}>
              {events.pastEvents.map((event) => createEvent(event))}
            </div>
          ) : (
            <p className={eventBrowserStyles.noEvents}>
              There are no past events at this time.
            </p>
          )}
        </section>

        {getUserIsLoggedIn() && (
          <section className={commonStyles.actionButton}>
            {getUserData().role === 'Admin' ? (
              <Button href="/events/create" asLink>
                Create New Event
              </Button>
            ) : (
              <Button href="/events/request" asLink>
                Submit Event Request
              </Button>
            )}
          </section>
        )}
      </div>
    </>
  );
};

const createEvent = (eventData) => {
  return (
    <ClubEventBrowserListing
      id={eventData.id}
      internalName={eventData.internalName}
      title={eventData.title}
      banner={eventData.banner}
      key={eventData.id}
    />
  );
};

// Incremental Static Regeneration
export const getStaticProps = async () => {
  let res;
  try {
    res = await axios.get(`${API_ROOT}/events/browser`);
  } catch (err) {
    return {
      props: {
        events: {
          upcomingEvents: [],
          pastEvents: [],
        },
      },
      revalidate: 1,
    };
  }

  if (res.data) {
    return { props: { events: res.data }, revalidate: 1 };
  }
};

export default EventBrowser;
