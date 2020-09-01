import React from 'react';
import Event from './components/Event';
import '../page-styles.scss';
import './Events.scss';

const Events = () => {
  return (
    <div className="page-styles Events">
      <h1>Upcoming Events</h1>

      <h2 className="Events-banners-month">September</h2>
      <section className="Events-banners">
        <Event name="meet-the-board" id={1} />
        <Event name="donuts-and-discussion" id={2} />
        <Event name="facul-tea-time" id={3} />
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSft-lq-WJ7my5VB1WMV9c__q3WFJrsEpOq2O0mEbe9EG-WiBg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="Events-event"
        >
          <img
            src={`${process.env.PUBLIC_URL}/data/events/bloomberg-cuny-week.png`}
            alt="Event banner"
          />
        </a>
      </section>

      <h2 className="Events-banners-month">October</h2>
      <p className="Events-banners-description">Coming soon...</p>

      <span role="img" aria-label="Events Notepad/Calendar">
        🗒
      </span>
      <h2>New Event Browser coming soon...</h2>
      <p>
        A new and improved event browser will be available soon! If you want to
        help us build it (and get some experience contributing to open source as
        well!), feel free to visit the{' '}
        <a
          href="https://github.com/bc-compsci-club/bccompsci.club"
          rel="noopener noreferrer"
          target="_blank"
        >
          website&apos;s GitHub repository
        </a>{' '}
        for more details on how to contribute and to create a pull request.
      </p>
    </div>
  );
};

export default Events;
