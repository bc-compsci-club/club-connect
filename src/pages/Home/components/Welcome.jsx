import React from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

import slideshow from 'assets/welcome-slideshow/inspiration.jpg';

const strings = [
  'inspiration.',
  'collaboration.',
  'diversity.',
  'passion.',
  'creativity.',
  'learning.',
];

const typewriterInit = (typewriter) => {
  const typeString = (string, pauseTime) => {
    typewriter.typeString(string).pauseFor(pauseTime).deleteAll(30);
  };

  for (const string of strings) {
    typeString(string, 2500);
    // TODO: Slideshow with club images
  }

  typewriter.start();
};

const Welcome = () => {
  return (
    <section className="welcome">
      <div className="welcome-background-container">
        <div className="welcome-container">
          <div className="welcome-content">
            <Slogan />
            <p>
              Learn something new at an event, find a team to build a project
              with, or just come by and make some new friends! The Brooklyn
              College Computer Science Club welcomes you, regardless of your
              programming experience or major.
            </p>
            <div className="welcome-action-buttons">
              <Link className="join-button" to="/join">
                Join&nbsp;the&nbsp;Club
              </Link>
              <Link className="learn-more" to="#about">
                Learn&nbsp;More
              </Link>
            </div>
          </div>

          <div className="welcome-slideshow">
            <img className="slideshow" src={slideshow} alt="Slideshow" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Slogan = () => {
  const typewriterComponent = (
    <Typewriter
      options={{
        autoStart: true,
        loop: true,
        delay: 30,
        deleteSpeed: 30,
      }}
      onInit={(typewriter) => typewriterInit(typewriter)}
    />
  );

  if (window.innerHeight > window.innerWidth) {
    return (
      <h1>
        A community driven by&nbsp;
        {typewriterComponent}
      </h1>
    );
  } else {
    return (
      <h1>
        A community driven by&nbsp;
        {typewriterComponent}
      </h1>
    );
  }
};

export default Welcome;
