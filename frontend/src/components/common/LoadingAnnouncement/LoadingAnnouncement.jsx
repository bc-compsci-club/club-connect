import React from 'react';
import Skeleton from 'react-loading-skeleton';

import styles from './LoadingAnnouncement.module.scss';

const LoadingAnnouncement = () => {
  return (
    <>
      <article className={styles.announcement}>
        <Skeleton width={'75%'} height={'1.3rem'} />
        <Skeleton
          className={styles.postDateTimeLoading}
          width={'20%'}
          height={'1.1rem'}
        />

        <div className={styles.bodyLoading}>
          <Skeleton width={'95%'} height={'1rem'} />
          <Skeleton width={'80%'} height={'1rem'} />
        </div>
      </article>
      <hr />
    </>
  );
};

export default LoadingAnnouncement;
