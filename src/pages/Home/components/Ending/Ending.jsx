// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import './Ending.scss';

const Ending = () => {
  return (
    <section className="Ending">
      <div className="ending-container">
        <h2>
          Unlock your full potential at the Brooklyn College Computer Science
          Club.
        </h2>
        <Link to="/join">Join the Club</Link>
      </div>
    </section>
  );
};

export default Ending;
