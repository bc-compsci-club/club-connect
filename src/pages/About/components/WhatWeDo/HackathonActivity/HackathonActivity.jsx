import React from 'react';
import '../Activity/Activity.scss';
import './HackathonActivity.scss';

const HackathonActivity = (props) => {
  return (
    <div className={`Activity HackathonActivity ${props.componentClass}`}>
      <div className="about-activity-text">
        {/* eslint-disable-next-line */}
        <div className="about-hackathonactivity-title-subtitle" role="text">
          <h3 className="about-activity-title about-hackathonactivity-title">
            {props.title}
          </h3>
          <h3 className="about-hackathonactivity-subtitle">{props.subtitle}</h3>
        </div>
        <p>{props.description[0]}</p>
        <p>{props.description[1]}</p>
        <p>{props.description[2]}</p>
      </div>

      {/* TODO: Make this a slideshow of hackathon images */}
      <img
        className="about-activity-image"
        src={props.image}
        alt={props.imageAlt}
      />
    </div>
  );
};

export default HackathonActivity;
