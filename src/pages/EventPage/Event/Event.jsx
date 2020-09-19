import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import dayjs from 'dayjs';
import Modal from 'react-modal';
import {
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  LineShareButton,
  LineIcon,
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';
import AddToCalendarHOC, { SHARE_SITES } from 'react-add-to-calendar-hoc';
import './Event.scss';
import shareIcon from 'assets/icons/share.svg';
import addToCalendarIcon from 'assets/icons/add-to-calendar.svg';

// Checks for iOS
const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

// For Outlook.com and Office 365 web calendar links
const getRandomKey = () => {
  let n = Math.floor(Math.random() * 999999999999).toString();
  return new Date().getTime().toString() + '_' + n;
};

// Create Outlook.com web calendar links for Outlook.com and Office 365
const createMicrosoftWebLink = (link) => {
  let finalLink = link;
  finalLink +=
    '&startdt=' + dayjs(event.startDatetime).format('YYYY-MM-DDTHH:mm:ssZ');
  finalLink +=
    '&enddt=' + dayjs(event.endDatetime).format('YYYY-MM-DDTHH:mm:ssZ');
  finalLink += '&subject=' + encodeURIComponent(event.title);
  finalLink += '&location=' + encodeURIComponent(event.location);
  finalLink += '&body=' + encodeURIComponent(event.description);
  finalLink += '&allday=false';
  finalLink += '&uid=' + getRandomKey();
  finalLink += '&path=/calendar/view/Month';

  return finalLink;
};

// Event data to be filled later
const event = {
  title: null,
  description: null,
  startDatetime: null,
  endDatetime: null,
  duration: null,
  location: null,
  timezone: null,
};

const eventShareData = {
  eventUrl: 'https://bccompsci.club/events',
  shareTitle: 'Join me at an event!',
  shareDescription:
    'Join me at an event by the Brooklyn College Computer Science Club!',
};

const Event = (props) => {
  let location = useLocation();

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

  // Temporary solution for routing to the external meeting link
  useEffect(() => {
    const pathArray = window.location.pathname.split('/');
    if (pathArray[4] === 'join') {
      if (props.eventData.meetingLink !== null) {
        window.location.replace(props.eventData.meetingLink);
      }
    }
  }, [props.eventData.meetingLink]);

  if (!props.isLoading) {
    const dataDirectory = `/data/events/${props.eventData.id}-${props.eventData.name}`;

    const image = `${dataDirectory}/${props.eventData.banner}`;
    const presenterImage = `${dataDirectory}/${props.eventData.presenterImage}`;

    // TODO: Allow events from any time zone other than Brooklyn College's Time Zone
    event.title = props.eventData.title;
    event.description = `${props.eventData.shortDescription}\n\n${props.eventData.longDescription}\n\nMore Details: https://bccompsci.club/events/${props.eventData.id}/${props.eventData.name}\nJoin the Event: https://bccompsci.club/events/${props.eventData.id}/${props.eventData.name}/join`;
    event.startDatetime = dayjs(
      props.eventData.date + ' ' + props.eventData.startTime + ' EDT'
    ).format('YYYYMMDDTHHmmss');
    event.endDatetime = dayjs(
      props.eventData.date + ' ' + props.eventData.endTime + ' EDT'
    ).format('YYYYMMDDTHHmmss');
    event.duration = 2;
    event.location = `https://bccompsci.club/events/${props.eventData.id}/${props.eventData.name}/join`;
    event.timezone = 'America/New_York';

    const CalendarModal = AddToCalendarHOC(
      AddToCalendarButton,
      AddToCalendarModal
    );

    eventShareData.eventUrl = `https://bccompsci.club/events/${props.eventData.id}/${props.eventData.name}`;
    eventShareData.shareTitle = `Join me at ${props.eventData.title}!`;
    eventShareData.shareDescription = `Join me at ${props.eventData.title}, an event by ${props.eventData.presenter}! Register here:`;

    return (
      <section className="Event">
        <div className="event-banner-and-information">
          <div className="event-banner-container">
            <img className="event-banner" src={image} alt="Event banner" />
          </div>

          <div className="event-information">
            <h1 className="event-title">{props.eventData.title}</h1>
            <div className="event-presenter">
              <img
                className="event-presenter-image"
                src={presenterImage}
                alt={props.eventData.presenter}
              />
              <p className="event-presenter-name">
                Presented by
                <br />
                {props.eventData.presenter}
              </p>
            </div>
            <div className="event-time">
              <TimeSvg />
              <p>
                {props.eventData.date}
                <br />
                {props.eventData.startTime} - {props.eventData.endTime}
              </p>
            </div>
            <div className="event-location">
              <LocationSvg />
              <p>{props.eventData.location}</p>
            </div>
            <div className="event-link">
              {props.eventData.meetingLink === null ? (
                <Link
                  to={location.pathname}
                  onClick={() =>
                    alert(
                      'Check back here a day before the event starts for the meeting link!'
                    )
                  }
                >
                  {props.eventData.buttonText}
                </Link>
              ) : (
                <a
                  href={props.eventData.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.eventData.buttonText}
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="event-descriptions-and-actions">
          <div className="event-descriptions">
            <p className="event-short-description">
              {props.eventData.shortDescription}
            </p>
            <p className="event-long-description">
              {props.eventData.longDescription}
            </p>
          </div>
          <div className="event-actions">
            <div className="event-add-to-calendar">
              <CalendarModal
                className="event-add-to-calendar-modal"
                event={event}
                items={
                  isiOS
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
              />
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div className="EventLoading">
        <LoadingPlaceholder {...props} />
      </div>
    );
  }
};

const LoadingPlaceholder = () => {
  if (window.innerWidth < 700) {
    return (
      <ContentLoader
        className="ContentLoader"
        speed={2}
        width={320}
        height={700}
        viewBox="0 0 320 700"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="51" y="226" rx="3" ry="3" width="88" height="6" />
        <rect x="51" y="244" rx="3" ry="3" width="120" height="6" />
        <circle cx="23" cy="238" r="20" />
        <rect x="0" y="0" rx="0" ry="0" width="320" height="193" />
        <rect x="51" y="293" rx="3" ry="3" width="120" height="6" />
        <rect x="51" y="311" rx="3" ry="3" width="120" height="6" />
        <circle cx="23" cy="305" r="20" />
        <rect x="51" y="359" rx="3" ry="3" width="120" height="6" />
        <circle cx="23" cy="362" r="20" />
        <rect x="0" y="412" rx="3" ry="3" width="320" height="6" />
        <rect x="0" y="427" rx="3" ry="3" width="320" height="6" />
        <rect x="0" y="444" rx="3" ry="3" width="240" height="6" />
        <rect x="0" y="476" rx="3" ry="3" width="320" height="6" />
        <rect x="0" y="486" rx="3" ry="3" width="320" height="6" />
        <rect x="0" y="496" rx="3" ry="3" width="320" height="6" />
        <rect x="0" y="506" rx="3" ry="3" width="320" height="6" />
        <rect x="0" y="516" rx="3" ry="3" width="320" height="6" />
        <rect x="0" y="526" rx="3" ry="3" width="320" height="6" />
        <rect x="0" y="536" rx="3" ry="3" width="320" height="6" />
        <rect x="0" y="546" rx="3" ry="3" width="200" height="6" />
      </ContentLoader>
    );
  } else {
    return (
      <ContentLoader
        className="ContentLoader"
        speed={2}
        width={768}
        height={512}
        viewBox="0 0 768 512"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="10" y="225" rx="3" ry="3" width="380" height="11" />
        <circle cx="457" cy="65" r="20" />
        <rect x="2" y="3" rx="0" ry="0" width="401" height="199" />
        <rect x="433" y="9" rx="0" ry="0" width="166" height="18" />
        <rect x="489" y="55" rx="0" ry="0" width="111" height="16" />
        <rect x="441" y="143" rx="0" ry="0" width="143" height="16" />
        <rect x="443" y="173" rx="0" ry="0" width="143" height="16" />
        <rect x="9" y="264" rx="0" ry="0" width="388" height="15" />
        <rect x="10" y="293" rx="0" ry="0" width="388" height="15" />
        <rect x="12" y="323" rx="0" ry="0" width="388" height="15" />
      </ContentLoader>
    );
  }
};

const TimeSvg = () => {
  return (
    <svg
      width="70"
      height="71"
      viewBox="0 0 70 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M0 35.5683C0 29.2226 1.57124 23.3551 4.71373 17.9658C7.85621 12.5766 12.1145 8.31826 17.4886 5.19096C22.8627 2.06365 28.7074 0.5 35.0228 0.5C39.7593 0.5 44.2832 1.42605 48.5947 3.27814C52.9061 5.13023 56.6255 7.61993 59.7528 10.7472C62.8801 13.8745 65.3698 17.6015 67.2219 21.9281C69.074 26.2547 70 30.8015 70 35.5683C70 40.3048 69.074 44.8364 67.2219 49.163C65.3698 53.4896 62.8801 57.209 59.7528 60.3211C56.6255 63.4332 52.9061 65.9077 48.5947 67.7446C44.2832 69.5815 39.7593 70.5 35.0228 70.5C30.2559 70.5 25.7092 69.574 21.3826 67.7219C17.056 65.8698 13.329 63.3801 10.2017 60.2528C7.07439 57.1255 4.59228 53.4137 2.75537 49.1174C0.918456 44.8212 0 40.3048 0 35.5683ZM7.69681 35.5683C7.69681 42.9463 10.3839 49.3527 15.758 54.7876C21.1321 60.1617 27.5537 62.8487 35.0228 62.8487C39.9414 62.8487 44.4958 61.6267 48.6857 59.1825C52.8757 56.7383 56.2004 53.4213 58.6597 49.2313C61.1191 45.0413 62.3487 40.487 62.3487 35.5683C62.3487 30.6496 61.1191 26.0877 58.6597 21.8826C56.2004 17.6774 52.8757 14.3527 48.6857 11.9086C44.4958 9.46443 39.9414 8.24235 35.0228 8.24235C30.1041 8.24235 25.5498 9.46443 21.3598 11.9086C17.1698 14.3527 13.8452 17.6774 11.3858 21.8826C8.92648 26.0877 7.69681 30.6496 7.69681 35.5683ZM32.3357 35.5683V14.8461C32.3357 14.1174 32.5862 13.5026 33.0872 13.0016C33.5882 12.5007 34.203 12.2502 34.9317 12.2502C35.6604 12.2502 36.2752 12.5007 36.7762 13.0016C37.2772 13.5026 37.5277 14.1174 37.5277 14.8461V33.9743L48.6857 40.487C49.293 40.8513 49.6877 41.3751 49.8699 42.0582C50.052 42.7414 49.961 43.3866 49.5966 43.9938C49.1108 44.8743 48.3669 45.3146 47.365 45.3146C46.8488 45.3146 46.4086 45.1931 46.0442 44.9502L34.1574 38.0277C33.6413 37.8758 33.2086 37.5722 32.8595 37.1168C32.5103 36.6614 32.3357 36.1452 32.3357 35.5683Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="70"
            height="70"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const LocationSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="black"
      width="128px"
      height="128px"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
};

const AddToCalendarButton = ({ children, onClick }) => {
  // Open add to calendar modal if "addtocalendar" is after the event name in the URL
  useEffect(() => {
    const pathArray = window.location.pathname.split('/');
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

const AddToCalendarModal = ({ children, isOpen, onRequestClose }) => {
  Modal.setAppElement('#root');

  let outlookLink = createMicrosoftWebLink(
    'https://outlook.live.com/owa/?rru=addevent'
  );
  let office365Link = createMicrosoftWebLink(
    'https://outlook.office.com/owa/?rru=addevent'
  );

  return (
    <Modal
      className="AddToCalendarModal"
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
      <button onClick={onRequestClose}>Close</button>
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
        title: eventShareData.shareTitle,
        text: eventShareData.shareDescription,
        url: eventShareData.eventUrl,
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

const ShareModal = ({ shareModalIsOpen, onRequestClose }) => {
  Modal.setAppElement('#root');
  return (
    <Modal
      className="ShareModal"
      isOpen={shareModalIsOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={200}
    >
      <h2>Share This Event</h2>
      <input type="text" value={eventShareData.eventUrl} readOnly />
      <div className="event-share-platforms">
        <FacebookShareButton
          url={eventShareData.eventUrl}
          quote={eventShareData.shareDescription}
          hashtag={'#bccompsciclub'}
          disabled
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton
          url={eventShareData.eventUrl}
          title={eventShareData.shareDescription}
          hashtags={['bccompsciclub']}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <LinkedinShareButton
          url={eventShareData.eventUrl}
          title={eventShareData.shareTitle}
          summary={eventShareData.shareDescription}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <FacebookMessengerShareButton url={eventShareData.eventUrl} disabled>
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>

        <WhatsappShareButton
          url={eventShareData.eventUrl}
          title={eventShareData.shareDescription}
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <TelegramShareButton
          url={eventShareData.eventUrl}
          title={eventShareData.shareDescription}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>

        <LineShareButton
          url={eventShareData.eventUrl}
          title={eventShareData.shareDescription}
        >
          <LineIcon size={32} round />
        </LineShareButton>

        <EmailShareButton
          url={eventShareData.eventUrl}
          subject={eventShareData.shareTitle}
          body={`${eventShareData.shareDescription}\n\n`}
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
      <button onClick={onRequestClose}>Close</button>
      <p>
        Sharing to Facebook and Facebook Messenger are currently unavailable.
        Sorry about that!
      </p>
    </Modal>
  );
};

export default Event;
