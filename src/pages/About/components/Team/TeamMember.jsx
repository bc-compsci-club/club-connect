import React from 'react';
import './Team.scss';

const TeamMember = (props) => {
  return (
    <article className="about-team-teammember">
      <a
        className="about-team-teammember-link"
        href={props.website}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div className="about-team-teammember-container">
          <img
            className="teammember-image"
            src={props.image}
            alt={props.name}
          />
          <h3 className="teammember-name">
            {props.firstName}
            <br />
            {props.lastName}
          </h3>
          <p className="teammember-description">{props.children}</p>
        </div>
      </a>
    </article>
  );
};

export default TeamMember;
