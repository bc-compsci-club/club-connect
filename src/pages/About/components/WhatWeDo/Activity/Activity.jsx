import React from 'react';
import './Activity.scss';

const Activity = (props) => {
  return (
    <div className="about-activity">
      <div className="about-activity-text">
        <h3 className="about-activity-title">{props.title}</h3>
        <p className="about-activity-description">{props.description}</p>
      </div>
      <img
        className="about-activity-image"
        src={props.image}
        alt={props.imageAlt}
      />
    </div>
  );
};

export default Activity;
