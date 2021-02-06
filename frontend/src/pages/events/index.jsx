import React from 'react';
import Head from 'next/head';
import axios from 'axios';

import { ClubEventBrowserListing } from 'components/events/index';
import Button from 'components/common/Button';
import { getUserData, getUserIsLoggedIn } from 'utils/auth';
import { windowSupported } from 'utils/checkSupport';
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

          <div className={eventBrowserStyles.banners}>
            {events.upcomingEvents.map((event) => createEvent(event))}
          </div>
        </section>

        <section className={eventBrowserStyles.category}>
          <h2 className={commonStyles.centerElement}>Past Events</h2>

          <div className={eventBrowserStyles.banners}>
            {events.pastEvents.map((event) => createEvent(event))}
          </div>
        </section>
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

export const getStaticProps = async () => {
  const clubEvents = await axios.get(`${API_ROOT}/events/browser`);

  if (!clubEvents.data) {
    return { notFound: true };
  } else {
    return { props: { events: clubEvents.data }, revalidate: 1 };
  }
};

// export const getServerSideProps = async () => {
//   const events = await axios.get(`${API_ROOT}/events/browser`);
//
//   if (!events.data) {
//     return { notFound: true };
//   } else {
//     return { props: { events: events.data } };
//   }
// };

export default EventBrowser;
