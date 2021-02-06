import React from 'react';
import Skeleton from 'react-loading-skeleton';

import loadingClubEventStyles from 'components/common/LoadingClubEvent/LoadingClubEvent.module.scss';
import clubEventStyles from 'components/events/index/ClubEventBrowserListing/ClubEventBrowserListing.module.scss';

const LoadingClubEvent = () => {
  return (
    <article className={clubEventStyles.clubEventBannerWrapper}>
      <Skeleton
        className={`${loadingClubEventStyles.bannerLoading} ${clubEventStyles.clubEventBanner}`}
        height={'100%'}
      />
    </article>
  );
};

export default LoadingClubEvent;
