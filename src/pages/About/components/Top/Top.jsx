import React from 'react';
import { Link } from 'react-router-dom';
import './Top.scss';

const Top = () => {
  return (
    <section className="about-top">
      <div className="about-top-container">
        <h1>Together, we make magic happen.</h1>
        <Link to="/join" className="about-join-button">Join the Club</Link>
      </div>
    </section>
  );
};

export default Top;
