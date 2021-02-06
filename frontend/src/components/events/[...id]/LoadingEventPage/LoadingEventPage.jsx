import React from 'react';
import Skeleton from 'react-loading-skeleton';

import eventPageStyles from 'components/events/[...id]/ClubEvent/ClubEvent.module.scss';
import loadingEventPageStyles from './LoadingEventPage.module.scss';
import clockIcon from 'assets/icons/clock.svg';
import locationPinIcon from 'assets/icons/location-pin.svg';

const LoadingEventPage = () => {
  return (
    <div>
      <section className={eventPageStyles.event}>
        <div className={eventPageStyles.bannerAndInformation}>
          <div className={eventPageStyles.bannerContainer}>
            <img
              className={eventPageStyles.clubEventBanner}
              src="https://i.imgur.com/M0ckBGj.png"
              alt="Loading event..."
            />
          </div>

          <div className={eventPageStyles.information}>
            <h1 className={eventPageStyles.title}>
              <Skeleton width={'100%'} />
              <Skeleton width={'75%'} />
            </h1>
            <div className={eventPageStyles.presenter}>
              <Skeleton width={'3rem'} height={'3rem'} circle />

              <p className={loadingEventPageStyles.presenterData}>
                <Skeleton width={'42.5%'} />
                <Skeleton width={'80%'} />
              </p>
            </div>
            <div className={eventPageStyles.time}>
              <img src={clockIcon} alt="Event time" />
              <p className={loadingEventPageStyles.presenterData}>
                <Skeleton width={'80%'} />
                <br />
                <Skeleton width={'65%'} />
              </p>
            </div>
            <div className={eventPageStyles.location}>
              <img src={locationPinIcon} alt="Location" />
              <p className={loadingEventPageStyles.presenterData}>
                <Skeleton width={'50%'} />
              </p>
            </div>
            <div className={eventPageStyles.link}>
              <Skeleton
                className={loadingEventPageStyles.roundLoadingButton}
                height={'4.25rem'}
              />
            </div>
          </div>
        </div>
        <div className={eventPageStyles.descriptionsAndActions}>
          <div
            className={`${loadingEventPageStyles.descriptionLoading} ${eventPageStyles.descriptions}`}
          >
            <p
              className={`${loadingEventPageStyles.shortDescriptionLoading} ${eventPageStyles.shortDescription}`}
            >
              <Skeleton width={'85%'} height={'1.75rem'} />
            </p>
            <p className="event-long-description">
              <Skeleton width={'100%'} height={'1.25rem'} />
              <Skeleton width={'95%'} height={'1.25rem'} />
              <Skeleton width={'95%'} height={'1.25rem'} />
              <Skeleton width={'100%'} height={'1.25rem'} />
              <Skeleton width={'95%'} height={'1.25rem'} />
              <Skeleton width={'100%'} height={'1.25rem'} />
              <Skeleton width={'85%'} height={'1.25rem'} />
            </p>
          </div>
          <div
            className={`${loadingEventPageStyles.actionsLoading} ${eventPageStyles.actions}`}
          >
            <Skeleton
              className={loadingEventPageStyles.roundLoadingButton}
              width={'95%'}
              height={'3.5rem'}
            />
            <Skeleton
              className={loadingEventPageStyles.roundLoadingButton}
              width={'95%'}
              height={'3.5rem'}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoadingEventPage;
