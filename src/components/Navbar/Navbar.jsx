import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './Navbar.scss';

const Navigation = () => {
  return (
    <Navbar bg="light">
      <Navbar.Brand href="#home">
        <img src="../../assets/logo.png" alt="" height="30px" />
        Brooklyn College Computer Science Club
      </Navbar.Brand>

      <Nav>
        <Nav.Link href="/events">Events</Nav.Link>
        <Nav.Link href="/resources">Resources</Nav.Link>
        <Nav.Link href="/about">About Us</Nav.Link>
        <Nav.Link href="/contact">Contact</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
