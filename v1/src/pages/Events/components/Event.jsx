import React from 'react';
import { Link } from 'react-router-dom';
import './Event.scss';

const Event = (props) => {
  return (
    <article className="Events-event">
      <Link to={`/events/${props.id}/${props.name}`}>
        <img
          src={`${process.env.PUBLIC_URL}/data/events/${props.id}-${props.name}/banner.png`}
          alt={props.title}
        />
      </Link>
    </article>
  );
};

export default Event;
