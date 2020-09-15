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
        <Event name="facul-tea-time" id={3} />
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
