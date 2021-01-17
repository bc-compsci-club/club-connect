import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from 'components/events/index/ClubEventBrowserListing/ClubEventBrowserListing.module.scss';
import emptyBanner from 'assets/logo.png';

// Represents an event on the event browser.
const ClubEventBrowserListing = (props) => {
  const { id, internalName, title, banner } = props;
  const bannerSrc = banner ? banner : emptyBanner;

  return (
    <article>
      <Link href={`/events/${id}/${internalName}`}>
        <a>
          <div className={styles.clubEventBannerWrapper}>
            <img
              className={styles.clubEventBanner}
              src={bannerSrc}
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
