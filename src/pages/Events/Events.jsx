import React from 'react';
import './Events.scss';

const Events = () => {
  return (
    <div className="Events">
      <h1>Upcoming Events</h1>
      <span role="img"
            aria-label="Events Notepad/Calendar">🗒</span>
      <h2>Coming soon...</h2>
      <p>
        We&apos;ve got some awesome events planned for our club members once the
        semester starts! Check back here around mid-August for more details.
        We&apos;ll be notifying our club members in our monthly newsletter once
        the events are up. Make sure to join the club before then so you
        don&apos;t miss out! See you soon at an event!
      </p>
    </div>
  );
};

export default Events;
