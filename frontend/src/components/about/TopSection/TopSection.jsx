import React from 'react';
import Link from 'next/link';

import styles from './TopSection.module.scss';

const TopSection = () => {
  return (
    <section className={styles.top}>
      <div className={styles.topContainer}>
        <h1>Together, we make magic happen.</h1>
        
          <a href = "https://docs.google.com/forms/d/e/1FAIpQLScb5bZEYE9sBzT57bbepmSFy6M21yoOWg4i5zHYSicfkxTOOg/viewform?usp=sf_link" target="_blank" className={styles.joinButton}>Join the Club</a>
        
      </div>
    </section>
  );
};

export default TopSection;
