import ContentLoader from 'react-content-loader';
import React from 'react';
import './Event.scss';

const Event = (props) => {
  console.log('rendering event');

  if (!props.isLoading) {
    const dataDirectory = `/data/events/${props.eventData.dataLocation}`;

    const image = `${dataDirectory}/${props.eventData.banner}`;
    const presenterImage = `${dataDirectory}/${props.eventData.presenterImage}`;

    return (
      <section className="Event">
        <div className="event-banner-container">
          <img className="event-banner" src={image} alt="Event banner" />
        </div>
        <div className="event-main-container">
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
            <svg
              width="70"
              height="71"
              viewBox="0 0 70 71"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0)">
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
            <p>
              {props.eventData.date}
              <br />
              {props.eventData.startTime} - {props.eventData.endTime}
            </p>
          </div>
          <div className="event-location">
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
            <p>{props.eventData.location}</p>
          </div>
          <p className="event-short-description">{props.eventData.shortDescription}</p>
          <p className="event-long-description">{props.eventData.longDescription}</p>
        </div>
      </section>
    );
  } else {
    return (
      <div className="EventLoading">
        <h2>Loading...</h2>
        <ContentLoader
          speed={2}
          width={768}
          height={512}
          viewBox="0 0 768 512"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
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
      </div>
    );
  }
};

export default Event;
