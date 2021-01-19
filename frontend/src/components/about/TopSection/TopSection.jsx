import React from 'react';
import Link from 'next/link';

import styles from './TopSection.module.scss';

const TopSection = () => {
  return (
    <section className={styles.top}>
      <div className={styles.topContainer}>
        <h1>Together, we make magic happen.</h1>
        <Link href="/join">
          <a className={styles.joinButton}>Join the Club</a>
        </Link>
      </div>
    </section>
  );
};

export default TopSection;
