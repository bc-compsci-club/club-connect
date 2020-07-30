import React from 'react';
import './Activity.scss';

const Activity = (props) => {
  return (
    <div className="about-activity">
      <img src={props.image} alt={props.imageAlt} />
      <div className="about-activity-text">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default Activity;
