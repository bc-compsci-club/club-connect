// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import Typewriter from 'typewriter-effect';
import './Welcome.scss';
import slideshow from 'assets/home/welcome-slideshow/inspiration.jpg';

const strings = [
  'inspiration.',
  'collaboration.',
  'diversity.',
  'passion.',
  'creativity.',
  'learning.',
];

const typewriterInit = (typewriter) => {
  document.getElementById('welcome-typewriter-placeholder').remove();
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
    <section className="Welcome">
      <div className="welcome-background-container">
        <div className="welcome-container">
          <div className="welcome-content">
            <Slogan />
            <p>
              Learn something new at an event, form a team to build a project
              with, or find out more about the field! The Brooklyn College
              Computer Science Club welcomes you, regardless of your programming
              experience or major.
            </p>
            <div className="welcome-action-buttons">
              <Link className="join-button" to="/join">
                Join&nbsp;the&nbsp;Club
              </Link>
              <ScrollLink
                className="learn-more"
                to="about"
                smooth={true}
                duration={500}
              >
                Learn&nbsp;More
              </ScrollLink>
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
  // Disable Typewriter effect on Internet Explorer
  if (window.document.documentMode) {
    return (
      <h1>
        A community driven by&nbsp;
        <span
          id="welcome-typewriter-placeholder"
          style={{ fontWeight: 'bold' }}
        >
          inspiration.
        </span>
      </h1>
    );
  }

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

  if (window.innerWidth < 370) {
    // < 370px Mobile
    return (
      <h1>
        A community driven by
        <br />
        <span
          id="welcome-typewriter-placeholder"
          style={{ fontWeight: 'bold' }}
        >
          inspiration.
        </span>
        {typewriterComponent}
      </h1>
    );
  } else {
    // > 370px Mobile
    return (
      <h1>
        A community driven by&nbsp;
        <span
          id="welcome-typewriter-placeholder"
          style={{ fontWeight: 'bold' }}
        >
          inspiration.
        </span>
        {typewriterComponent}
      </h1>
    );
  }
};

export default Welcome;
