import React from 'react';
import { Link } from 'react-router-dom';
import './Event.scss';

const Event = (props) => {
  return (
    <div className="Events-event">
      <Link to={`/events/${props.id}/${props.name}`}>
        <img
          src={`${process.env.PUBLIC_URL}/data/events/${props.id}-${props.name}/${props.name}-banner.png`}
          alt="Event Banner"
        />
      </Link>
    </div>
  );
};

export default Event;
