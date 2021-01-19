import axios from 'axios';

import { ClubEventBrowserListing } from 'components/events/index';
import commonStyles from 'styles/commonStyles.module.scss';
import eventsStyles from 'styles/pages/Events.module.scss';
import { API_ROOT } from 'pages/_app';

const EventBrowser = (props) => {
  const { events } = props;

  return (
    <div className={`${commonStyles.styles} ${eventsStyles.events}`}>
      <section>
        <h1>Upcoming Events</h1>

        <div className={eventsStyles.banners}>
          {events.upcomingEvents.map((event) => createEvent(event))}
        </div>
      </section>

      <section>
        <h2>Past Events</h2>

        <div className={eventsStyles.banners}>
          {events.pastEvents.map((event) => createEvent(event))}
        </div>
      </section>
    </div>
  );
};

const createEvent = (eventData) => {
  return (
    <ClubEventBrowserListing
      id={eventData.id}
      internalName={eventData.internalName}
      title={eventData.title}
      banner={eventData.banner}
      key={eventData.id}
    />
  );
};

export const getStaticProps = async () => {
  const clubEvents = await axios.get(`${API_ROOT}/events/browser`);

  if (!clubEvents.data) {
    return { notFound: true };
  } else {
    return { props: { events: clubEvents.data }, revalidate: 1 };
  }
};

// export const getServerSideProps = async () => {
//   const events = await axios.get(`${API_ROOT}/events/browser`);
//
//   if (!events.data) {
//     return { notFound: true };
//   } else {
//     return { props: { events: events.data } };
//   }
// };

export default EventBrowser;
