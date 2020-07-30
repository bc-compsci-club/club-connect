import React from 'react';
import { Link } from 'react-router-dom';
import './Top.scss';
// import mobileHeader from 'assets/about/about-header-mobile.jpg';

const Top = () => {
  return (
    <section className="about-top">
      {/*<img src={mobileHeader} alt="Header"/>*/}
      <div className="about-top-container">
        <h1>Together, we make magic happen.</h1>
        <Link to="/join" className="about-join-button">Join the Club</Link>
      </div>
    </section>
  );
};

export default Top;
