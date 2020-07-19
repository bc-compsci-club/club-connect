// @flow
import React from 'react';
import './Description.scss';
import image from 'assets/linkedin.png';

const Description = () => {
  return (
    <section className="Description">
      <h2>Reach New Heights</h2>
      <img src={image} alt="Collaborate" />
      <p>
        At the Brooklyn College Computer Science Club, we promote Computer
        Science and hacker culture at Brooklyn College. Our goal is to cultivate
        maker creativity among the students on campus. We’re currently
        organizing technical workshops for all kinds of people, from beginner to
        advanced. During club hours, you will be able to swing by and talk about
        tech, ask for help with a CS program, and meet like-minded people.
        We&apos;re ecstatic and looking forward to running fun and informative
        events throughout the year!
      </p>
    </section>
  );
};

export default Description;
