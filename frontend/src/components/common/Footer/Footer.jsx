import React from 'react';

import styles from './Footer.module.scss';

const Footer = (props) => {
  const { width } = props;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {width < 700 ? (
          // < 700px (Vertical phones and small horizontal phones)
          <>
            <p>© 2021 Brooklyn College Computer Science Club</p>
            <p>0317 Ingersoll Hall, Brooklyn College</p>
            <p>
              <a href="mailto:contact@bccompsci.club">
                Email: contact@bccompsci.club
              </a>
            </p>
          </>
        ) : (
          // > 700px (Desktops, laptops, tablets, and large horizontal phones)
          <>
            <p>© 2021 Brooklyn College Computer Science Club</p>
            <p>
              0317 Ingersoll Hall, Brooklyn College •{' '}
              <a href="mailto:contact@bccompsci.club">
                Email: contact@bccompsci.club
              </a>
            </p>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
