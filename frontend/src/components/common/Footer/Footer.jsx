import React from 'react';

import styles from './Footer.module.scss';

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      {props.width < 700 ? (
        // < 700px (Vertical phones and small horizontal phones)
        <div className={styles.footerContainer}>
          <p>© 2021 Brooklyn College Computer Science Club</p>
          <p>0317 Ingersoll Hall, Brooklyn College</p>
          <p>
            <a href="mailto:contact@bccompsci.club">
              Email: contact@bccompsci.club
            </a>
          </p>
        </div>
      ) : (
        // > 700px (Desktops, laptops, tablets, and large horizontal phones)
        <div className={styles.footerContainer}>
          <p>© 2021 Brooklyn College Computer Science Club</p>
          <p>
            0317 Ingersoll Hall, Brooklyn College •{' '}
            <a href="mailto:contact@bccompsci.club">
              Email: contact@bccompsci.club
            </a>
          </p>
        </div>
      )}
    </footer>
  );
};

export default Footer;
