import React from 'react';
import './Events.scss';
import { Link } from 'react-router-dom';

const Events = () => {
  return (
    <div className="Events">
      <h1>Upcoming Events</h1>
      <ul className="events-list">
        <li>
          <Link to="/events/1/meet-the-board">
            Meet the Board: September 10
          </Link>
        </li>
        <li>
          <Link to="/events/2/donuts-and-discussion">
            Donuts and Discussion: September 16
          </Link>
        </li>
        <li>
          <Link to="/events/3/facul-tea-time">
            Facul-Tea Time: September 22
          </Link>
        </li>
      </ul>
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
          rel="noopener"
        >
          website's GitHub repository
        </a>{' '}
        for more details on how to contribute and to create a pull request.
      </p>
    </div>
  );
};

export default Events;
