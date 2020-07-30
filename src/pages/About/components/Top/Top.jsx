import React from 'react';
import { Link } from 'react-router-dom';

const Top = () => {
  return (
    <section className="about-top">
      <h1>Together, we make magic happen.</h1>
      <Link to="/join">Join the Club</Link>
    </section>
  );
};

export default Top;
