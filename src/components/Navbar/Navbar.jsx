import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import logo from '../../assets/logo.png';

import './Navbar.scss';

const Navigation = () => {
  return (
    <nav className="navbar-main">
      <div className="nav-logo">
        <a href="/">
          <img src={logo} alt="Brooklyn College Computer Science Club" />
          Computer Science Club
        </a>
      </div>

      <div className="nav-elements">
        <ul>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/events">Events</a>
          </li>
          <li>
            <a href="/resources">Resources</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>

          <li className="join-button">
            <a href="/join">Join the Club</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
