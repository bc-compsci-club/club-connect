// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import './Ending.scss';

const Ending = () => {
  return (
    <section className="Ending">
      <div className="ending-container">
        <Header />
        <Link to="/join">Join the Club</Link>
      </div>
    </section>
  );
};

const Header = () => {
  if (window.innerHeight > window.innerWidth) {
    // Phone
    return (
      <h2>
        Unlock your full potential at the Brooklyn College Computer Science
        Club.
      </h2>
    );
  } else {
    // Desktop
    return (
      <h2>
        Unlock your full potential at the
        <br />
        Brooklyn College Computer Science Club.
      </h2>
    );
  }
};

export default Ending;