import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import styles from 'components/dashboard/Announcement/Announcement.module.scss';

dayjs.extend(relativeTime);

// Represents an event on the event browser.
const Announcement = (props) => {
  const { data } = props;

  const lastUpdatedDateTime = dayjs(data.updatedAt).fromNow();

  return (
    <>
      <article className={styles.announcement}>
        <Link href={`/announcements/${data.id}/${data.internalName}`}>
          <a className={styles.link}>
            <h3 className={styles.title}>{data.title}</h3>
            <h4 className={styles.postDate}>{lastUpdatedDateTime}</h4>
            <p className={styles.text}>{data.headline}</p>
          </a>
        </Link>
      </article>
      <hr />
    </>
  );
};

export default Announcement;
