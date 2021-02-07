import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './ClubEventBrowserListing.module.scss';
import defaultBanner from 'assets/banner-default.png';

const ClubEventBrowserListing = (props) => {
  const { id, internalName, title, banner } = props;

  return (
    <article>
      <Link href={`/events/${id}/${internalName}`}>
        <a>
          <div className={styles.clubEventBannerWrapper}>
            <img
              className={styles.clubEventBanner}
              src={banner ? banner : defaultBanner}
              alt={title}
              loading="lazy"
            />
          </div>
        </a>
      </Link>
    </article>
  );
};

ClubEventBrowserListing.propTypes = {
  id: PropTypes.number.isRequired,
  internalName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  banner: PropTypes.string,
};

export default ClubEventBrowserListing;
