import React from 'react';
import Link from 'next/link';

import styles from 'components/dashboard/UpcomingClubEvent/UpcomingClubEvent.module.scss';
import bannerSrc from 'assets/backgrounds/auth.jpg';

// Represents an event on the event browser.
const UpcomingClubEvent = () => {
  return (
    <article className={styles.upcomingClubEvent}>
      <Link href={`/events`}>
        <a className={styles.clubEventContainer}>
          <img className={styles.banner} src={bannerSrc} alt="event" />
        </a>
      </Link>
    </article>
  );
};

export default UpcomingClubEvent;
