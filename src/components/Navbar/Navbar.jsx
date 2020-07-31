// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import logo from 'assets/logo.png';

const Navigation = () => {
  return (
    <nav className="navbar-main">
      {/* TODO: Refactor class name to Navbar */}
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="Brooklyn College Computer Science Club" />
          <p>
            Brooklyn College <br /> Computer Science Club
          </p>
        </Link>
      </div>

      <div className="nav-elements">
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/coming-soon">Resources</Link>
          </li>
          <li>
            {/* Temporary email contact until contact page is ready */}
            {/* <Link to="/contact">Contact</Link> */}
            <a href="mailto:bc.cis.club@gmail.com">Contact</a>
          </li>

          <li className="join-button">
            <Link to="/join">Join the Club</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
