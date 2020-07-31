import React from 'react';
import { Link } from 'react-router-dom';
import './Events.scss';

const Events = () => {
  return (
    <div className="Events">
      <h1>Upcoming Events</h1>
      <span>🗒</span>
      <h2>Coming soon...</h2>
      <p>
        We&apos;ve got some awesome events planned for our club members once the
        semester starts! Check back here around mid-August for more details.
        We&apos;ll be notifying our club members in our monthly newsletter once
        the events are up. Make sure to join the club before then so you
        don&apos;t miss out! See you at an event soon!
      </p>
      <Link to="/join">Join the Club</Link>
    </div>
  );
};

export default Events;
