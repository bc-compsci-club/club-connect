import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Event from './components/Event';
import '../page-styles.scss';
import './Events.scss';
import { useEffect } from 'react';
import { useState } from 'react';

const Events = () => {
  const [eventsAreDownloaded, setEventsAreDownloaded] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState({});
  const [pastEvents, setPastEvents] = useState([]);

  const createEvent = (eventData) => {
    return (
      <Event
        title={eventData.title}
        name={eventData.name}
        id={eventData.id}
        key={eventData.id}
      />
    );
  };

  useEffect(() => {
    axios.get('/data/events/events-list-categorized.json').then((res) => {
      setUpcomingEvents(res.data.upcomingEvents);
      setPastEvents(res.data.pastEvents);
      setEventsAreDownloaded(true);
    });
  }, []);

  return (
    <div className="page-styles Events">
      <Helmet>
        <title>Events - Brooklyn College Computer Science Club</title>
        <meta name="description" content="A list of events curated by the Computer Science Club." />
      </Helmet>
      {/* Fix footer flashing in while events are loading */}
      {!eventsAreDownloaded && (
        <div className="Events-loading-placeholder"></div>
      )}

      <section className="Events-upcoming">
        <h1>Upcoming Events</h1>

        {/* TODO: Dynamically generate per month */}
        <h2 className="Events-banners-month">September</h2>
        <section className="Events-banners">
          {eventsAreDownloaded &&
            upcomingEvents.september.events.map((event) => createEvent(event))}
        </section>

        <h2 className="Events-banners-month">October</h2>
        <section className="Events-banners">
          {eventsAreDownloaded &&
            upcomingEvents.october.events.map((event) => createEvent(event))}
        </section>
      </section>

      <section className="Events-past">
        <h2>Past Events</h2>

        <section className="Events-banners">
          {eventsAreDownloaded && pastEvents.map((event) => createEvent(event))}
        </section>
      </section>
    </div>
  );
};

export default Events;
