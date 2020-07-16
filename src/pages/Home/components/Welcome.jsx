import React from 'react';
import Typewriter from 'typewriter-effect';

import slideshow from 'assets/welcome-slideshow/inspiration.jpg';
import { Container, Row, Col } from 'react-bootstrap';

const Welcome = () => {
  const strings = [
    'inspiration.',
    'collaboration.',
    'creativity.',
    'learning.',
    'diversity.',
    'passion.',
  ];

  const typewriterInit = (typewriter) => {
    const typeString = (string, pauseTime) => {
      typewriter.typeString(string).pauseFor(pauseTime).deleteAll(30);
    };

    for (const string of strings) {
      typeString(string, 2500);
      // TODO: Advance the slideshow
    }

    typewriter.start();
  };

  return (
    <section className="welcome">
      <div className="welcome-background-container">
        <Container fluid="md" className="welcome-container">
          <Row>
            <Col className="welcome-content">
              <h1>
                A community driven
                <br />
                by&nbsp;
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                    delay: 30,
                    deleteSpeed: 30,
                  }}
                  onInit={(typewriter) => typewriterInit(typewriter)}
                />
              </h1>
              <p>
                Learn something new from an industry professional at our events,
                find some team members to build a project with, or just come by
                and make some new friends! The Brooklyn College Computer Science
                Club welcomes you, regardless of your coding experience or
                major.
              </p>
              <div className="welcome-action-buttons">
                <a className="join-button" href="/join">
                  Join&nbsp;the&nbsp;Club
                </a>
                <a className="learn-more" href="#about">
                  Learn&nbsp;More
                </a>
              </div>
            </Col>

            <Col className="welcome-slideshow">
              <img className="slideshow" src={slideshow} alt="Slideshow" />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Welcome;
