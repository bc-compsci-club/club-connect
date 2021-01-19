import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import Modal from 'react-modal';
// import ContentLoader from 'react-content-loader';
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

import { isIosUserAgent } from 'utils/iOSUtils';
import { createMicrosoftWebLink } from 'utils/calendarUtils';
import clubEventStyles from './ClubEvent.module.scss';
import shareIcon from 'assets/icons/share.svg';
import addToCalendarIcon from 'assets/icons/add-to-calendar.svg';
import clockIcon from 'assets/icons/clock.svg';
import locationPinIcon from 'assets/icons/location-pin.svg';
import { SITE_TITLE_BASE } from 'pages/_app';

const shareData = {
  eventUrl: 'https://bccompsci.club/events',
  shareTitle: 'Join me at an event!',
  shareDescription:
    'Join me at an event by the Brooklyn College Computer Science Club!',
};

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
    meetingLink,
    buttonText,
  } = props.clubEventData;

  const router = useRouter();
  const location = router.asPath;
  console.log(location);

  // Data for calendar and share sheet
  const [calendarData, setCalendarData] = useState({
    title: null,
    description: null,
    startDatetime: null,
    endDatetime: null,
    duration: null,
    eventLocation: null,
    timezone: null,
  });
  const [shareData, setShareData] = useState({
    eventUrl: 'https://bccompsci.club/events',
    shareTitle: 'Join me at an event!',
    shareDescription:
      'Join me at an event by the Brooklyn College Computer Science Club!',
  });

  // Share sheet modal for unsupported devices
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

  // Opens the share sheet modal.
  const openShareModal = () => {
    setShareModalIsOpen(true);
  };

  // Closes the share sheet modal.
  const closeShareModal = () => {
    setShareModalIsOpen(false);
  };

  // Toggles the share sheet modal.
  const toggleShareModal = () => {
    setShareModalIsOpen(!shareModalIsOpen);
  };

  useEffect(() => {
    const pathArray = router.asPath.split('/');

    // Add the event's internal name to the URL if the name isn't already in the URL
    if (pathArray[3] === undefined) {
      router.push(`/events/${id}/${internalName}`);
    }

    // Redirect to meeting link if /join is after the event name
    if (pathArray[4] === 'join') {
      if (meetingLink !== null) {
        console.log('Redirecting to meeting link...');
        window.location.replace(meetingLink);
      }
    }

    setCalendarData({
      title: title,
      description: `${shortDescription}\n\n${longDescription}\n\nMore Details: https://bccompsci.club/events/${id}/${internalName}\nJoin the Event: https://bccompsci.club/events/${id}/${internalName}/join`,
      startDatetime: dayjs(startDateTime).format('YYYYMMDDTHHmmss'),
      endDatetime: dayjs(endDateTime).format('YYYYMMDDTHHmmss'),
      duration: Math.abs(dayjs(startDateTime).diff(endDateTime, 'h')),
      eventLocation: `https://bccompsci.club/events/${id}/${internalName}/join`,
      timezone: 'America/New_York',
    });

    modalCalendarData = calendarData; // Temporary solution until Redux is added

    setShareData({
      eventUrl: `https://bccompsci.club/events/${id}/${internalName}`,
      shareTitle: `Join me at ${title}!`,
      shareDescription: `Join me at ${title}, an event by ${presenter}! Register here:`,
    });
  }, []);

  const CalendarModal = AddToCalendarHOC(
    AddToCalendarButton,
    AddToCalendarModal
  );

  return (
    <>
      <Head>
        <title>
          {title} | {SITE_TITLE_BASE}
        </title>

        <meta
          property="og:title"
          content={`${title} | ${SITE_TITLE_BASE}`}
          key="title"
        />
        <meta name="description" content={shortDescription} key="description" />
        <meta property="og:type" content="events.event" />
        <meta
          property="og:url"
          content={`https://bccompsci.club/events/${id}/${internalName}`}
        />
        <meta property="og:image" content={banner} />
      </Head>
      <section className={clubEventStyles.event}>
        <div className={clubEventStyles.bannerAndInformation}>
          <div className={clubEventStyles.bannerContainer}>
            <img
              className={clubEventStyles.clubEventBanner}
              src={banner}
              alt={title}
            />
          </div>

          <div className={clubEventStyles.information}>
            <h1 className={clubEventStyles.title}>{title}</h1>
            <div className={clubEventStyles.presenter}>
              <img
                className={clubEventStyles.presenterImage}
                src={presenterImage}
                alt={presenter}
              />
              <p>
                Presented by
                <br />
                {presenter}
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
              <p>{eventLocation}</p>
            </div>
            <div className={clubEventStyles.link}>
              {meetingLink === null ? (
                <Link
                  href={eventLocation.pathname}
                  onClick={() =>
                    alert(
                      'Check back here a day before the event starts for the meeting link!'
                    )
                  }
                >
                  {buttonText}
                </Link>
              ) : (
                <a href={meetingLink} target="_blank" rel="noopener noreferrer">
                  {buttonText}
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
                shareModalIsOpen={shareModalIsOpen}
                openShareModal={openShareModal}
                closeShareModal={closeShareModal}
                toggleShareModal={toggleShareModal}
              />
              <ShareModal
                shareModalIsOpen={shareModalIsOpen}
                onRequestClose={closeShareModal}
                shareData={shareData}
              />
            </div>
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
    <button
      id="AddToCalendarButton"
      className="AddToCalendarButton"
      onClick={onClick}
    >
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

const ShareButton = ({
  shareModalIsOpen,
  openShareModal,
  closeShareModal,
  toggleShareModal,
}) => {
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
    <button className="event-share-button" onClick={handleClick}>
      <img src={shareIcon} alt="Share This Event" />
      <p>Share This Event</p>
    </button>
  );
};

const ShareModal = (props) => {
  const { shareModalIsOpen, onRequestClose, shareData } = props;

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
