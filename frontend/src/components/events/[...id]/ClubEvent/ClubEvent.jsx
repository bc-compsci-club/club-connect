import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import dayjs from 'dayjs';
import Modal from 'react-modal';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import AddToCalendarHOC, { SHARE_SITES } from 'react-add-to-calendar-hoc';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

import { getUserData, getUserIsLoggedIn } from 'utils/auth';
import { isIosUserAgent } from 'utils/iOSUtils';
import { createMicrosoftWebLink } from 'utils/calendarUtils';
import { toastErrorCenter, toastSuccessCenter } from 'utils/generalUtils';
import { API_ROOT, SITE_NAME_BASE } from 'pages/_app';
import clubEventStyles from './ClubEvent.module.scss';
import defaultBanner from 'assets/banner-default.png';
import defaultPresenterImage from 'assets/icons/profile.svg';
import shareIcon from 'assets/icons/share.svg';
import addToCalendarIcon from 'assets/icons/add-to-calendar.svg';
import clockIcon from 'assets/icons/clock.svg';
import locationPinIcon from 'assets/icons/location-pin.svg';

let modalCalendarData = {};

const ClubEvent = (props) => {
  const {
    id,
    internalName,
    title,
    banner,
    presenter,
    presenterImage,
    startDateTime,
    endDateTime,
    eventLocation,
    shortDescription,
    longDescription,
    externalLink,
    externalLinkButtonText,
  } = props.clubEventData;

  const calendarData = {
    title: title,
    description: `${shortDescription}\n\n${longDescription}\n\nMore Details: https://bccompsci.club/events/${id}/${internalName}\nJoin the Event: https://bccompsci.club/events/${id}/${internalName}/join`,
    startDatetime: dayjs(startDateTime).format('YYYYMMDDTHHmmss'),
    endDatetime: dayjs(endDateTime).format('YYYYMMDDTHHmmss'),
    duration: Math.abs(dayjs(startDateTime).diff(endDateTime, 'h')),
    eventLocation: `https://bccompsci.club/events/${id}/${internalName}/join`,
    timezone: 'America/New_York',
  };

  const shareData = {
    eventUrl: `https://bccompsci.club/events/${id}/${internalName}`,
    shareTitle: `Join me at ${title}!`,
    shareDescription: `Join me at ${title}, an event presented by ${presenter} and hosted by the Brooklyn College Computer Science Club! Register here:`,
  };

  const router = useRouter();

  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

  useEffect(async () => {
    const pathArray = router.asPath.split('/');

    // Redirect to meeting link if /join is after the event name
    if (pathArray[4] === 'join' && externalLink) {
      location.replace(externalLink);
      return;
    }

    // Set the event's internal name in the URL if the internal name doesn't match the one in the URL
    if (pathArray[3] !== internalName) {
      await router.push(`/events/${id}/${internalName}`);
      return;
    }

    modalCalendarData = calendarData; // Temporary solution until Redux is added
  }, []);

  const CalendarModal = AddToCalendarHOC(
    AddToCalendarButton,
    AddToCalendarModal
  );

  const toggleShareModal = () => {
    setShareModalIsOpen(!shareModalIsOpen);
  };

  const closeShareModal = () => {
    setShareModalIsOpen(false);
  };

  return (
    <>
      <NextSeo
        title={`${title} – ${SITE_NAME_BASE}`}
        description={
          shortDescription
            ? shortDescription
            : `${title} is an event hosted by the Brooklyn College Computer Science Club.`
        }
        openGraph={{
          site_name: SITE_NAME_BASE,
          title: title,
          description: shortDescription
            ? shortDescription
            : `${title} is an event hosted by the Brooklyn College Computer Science Club.`,
          images: [{ url: banner ? banner : defaultBanner }],
          type: 'events.event',
          url: `https://bccompsci.club/events/${id}/${internalName}`,
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

      <section className={clubEventStyles.event}>
        <div className={clubEventStyles.bannerAndInformation}>
          <div className={clubEventStyles.bannerContainer}>
            <img
              className={clubEventStyles.clubEventBanner}
              src={banner ? banner : defaultBanner}
              alt={title}
            />
          </div>

          <div className={clubEventStyles.information}>
            <h1 className={clubEventStyles.title}>{title}</h1>
            <div className={clubEventStyles.presenter}>
              <img
                className={clubEventStyles.presenterImageContainer}
                src={presenterImage ? presenterImage : defaultPresenterImage}
                alt={presenter}
              />
              <p>
                Presented by
                <br />
                {presenter ? presenter : 'Unspecified'}
              </p>
            </div>
            <div className={clubEventStyles.time}>
              <img src={clockIcon} alt="Event time" />
              <p>
                {dayjs(startDateTime).format('MMMM D, YYYY')}
                <br />
                {dayjs(startDateTime).format('h:mm A')} -{' '}
                {dayjs(endDateTime).format('h:mm A')}
              </p>
            </div>
            <div className={clubEventStyles.location}>
              <img src={locationPinIcon} alt="Location" />
              <p>{eventLocation ? eventLocation : 'Unspecified'}</p>
            </div>
            <div className={clubEventStyles.link}>
              {externalLink ? (
                <a
                  href={externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {externalLinkButtonText
                    ? externalLinkButtonText
                    : 'More Details'}
                </a>
              ) : (
                <a
                  href="javascript:void(0)"
                  onClick={() =>
                    alert('Coming soon! Check back shortly for updates.')
                  }
                >
                  {externalLinkButtonText
                    ? externalLinkButtonText
                    : 'More Details'}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className={clubEventStyles.descriptionsAndActions}>
          <div className={clubEventStyles.descriptions}>
            <p className={clubEventStyles.shortDescription}>
              {shortDescription}
            </p>
            <p className="event-long-description">{longDescription}</p>
          </div>
          <div className={clubEventStyles.actions}>
            <div className="event-add-to-calendar">
              <CalendarModal
                className="event-add-to-calendar-modal"
                event={calendarData}
                items={
                  isIosUserAgent
                    ? [SHARE_SITES.GOOGLE, SHARE_SITES.ICAL, SHARE_SITES.YAHOO]
                    : [
                        SHARE_SITES.GOOGLE,
                        SHARE_SITES.ICAL,
                        SHARE_SITES.YAHOO,
                        SHARE_SITES.OUTLOOK,
                      ]
                }
              />
            </div>

            <div className="event-share">
              <ShareButton
                toggleShareModal={toggleShareModal}
                shareData={shareData}
              />
              <ShareModal
                onRequestClose={closeShareModal}
                shareModalIsOpen={shareModalIsOpen}
                shareData={shareData}
              />
            </div>

            {getUserIsLoggedIn() && getUserData().role === 'Admin' && (
              <>
                <button onClick={() => router.push(`/events/edit?id=${id}`)}>
                  <EditRoundedIcon
                    style={{
                      color: '#4d5eff',
                    }}
                  />
                  <span>Edit Event</span>
                </button>

                <button
                  style={{ backgroundColor: '#ffcfcf' }}
                  onClick={async () => {
                    const confirmDeleteEvent = confirm(
                      'Are you sure you want to delete this event?'
                    );

                    if (confirmDeleteEvent) {
                      try {
                        await axios.delete(`${API_ROOT}/events/${id}`, {
                          withCredentials: true,
                        });
                      } catch (err) {
                        toastErrorCenter(
                          'An error occurred while deleting the event.'
                        );
                        console.error(err);
                        return;
                      }

                      toastSuccessCenter(
                        'The event has been successfully deleted.'
                      );
                      router.push('/events');
                    }
                  }}
                >
                  <DeleteForeverRoundedIcon style={{ color: '#ff4d4d' }} />
                  <span>Delete Event</span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const AddToCalendarButton = (props) => {
  const { children, onClick } = props;

  const router = useRouter();

  // Open add to calendar modal if "addtocalendar" is after the event name in the URL
  useEffect(() => {
    const pathArray = router.asPath.split('/');
    if (pathArray[4] === 'addtocalendar') {
      document.getElementById('AddToCalendarButton').click();
    }
  }, []);

  return (
    <button id="AddToCalendarButton" onClick={onClick}>
      <img src={addToCalendarIcon} alt="Add to Calendar" />
      {children}
    </button>
  );
};

const AddToCalendarModal = (props) => {
  const { isOpen, onRequestClose, children } = props;

  Modal.setAppElement('#__next');

  let outlookLink = createMicrosoftWebLink(
    'https://outlook.live.com/owa/?rru=addevent',
    modalCalendarData
  );
  let office365Link = createMicrosoftWebLink(
    'https://outlook.office.com/owa/?rru=addevent',
    modalCalendarData
  );

  return (
    <Modal
      className={clubEventStyles.AddToCalendarModal}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={200}
    >
      <h2>Add to Calendar</h2>
      <p>
        If you're using Apple Calendar or need an .ics file, pick the
        <strong> &quot;iCal&quot;</strong> option.
      </p>
      <div>
        {children}
        <a href={outlookLink} target="_blank" rel="noopener noreferrer">
          Outlook.com Web
        </a>
        <a href={office365Link} target="_blank" rel="noopener noreferrer">
          Office 365
        </a>
      </div>
      <button className={clubEventStyles.closeButton} onClick={onRequestClose}>
        Close
      </button>
    </Modal>
  );
};

const ShareButton = (props) => {
  const { toggleShareModal, shareData } = props;

  const handleClick = () => {
    if (navigator.share) {
      navigator.share({
        title: shareData.shareTitle,
        text: shareData.shareDescription,
        url: shareData.eventUrl,
      });
    } else {
      toggleShareModal();
    }
  };

  return (
    <button onClick={handleClick}>
      <img src={shareIcon} alt="Share This Event" />
      <span>Share This Event</span>
    </button>
  );
};

const ShareModal = (props) => {
  const { onRequestClose, shareModalIsOpen, shareData } = props;

  Modal.setAppElement('#__next');

  return (
    <Modal
      className={clubEventStyles.ShareModal}
      isOpen={shareModalIsOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={200}
    >
      <h2>Share This Event</h2>
      <input type="text" value={shareData.eventUrl} readOnly />
      <div className={clubEventStyles.sharePlatforms}>
        <FacebookShareButton
          url={shareData.eventUrl}
          quote={shareData.shareDescription}
          hashtag={'#bccompsciclub'}
          disabled
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareData.eventUrl}
          title={shareData.shareDescription}
          hashtags={['bccompsciclub']}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <LinkedinShareButton
          url={shareData.eventUrl}
          title={shareData.shareTitle}
          summary={shareData.shareDescription}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <FacebookMessengerShareButton url={shareData.eventUrl} disabled>
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>

        <WhatsappShareButton
          url={shareData.eventUrl}
          title={shareData.shareDescription}
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <TelegramShareButton
          url={shareData.eventUrl}
          title={shareData.shareDescription}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>

        <LineShareButton
          url={shareData.eventUrl}
          title={shareData.shareDescription}
        >
          <LineIcon size={32} round />
        </LineShareButton>

        <EmailShareButton
          url={shareData.eventUrl}
          subject={shareData.shareTitle}
          body={`${shareData.shareDescription}\n\n`}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
      <button className={clubEventStyles.closeButton} onClick={onRequestClose}>
        Close
      </button>
      <p>
        Sharing to Facebook and Facebook Messenger are currently unavailable.
        Sorry about that!
      </p>
    </Modal>
  );
};

export default ClubEvent;
