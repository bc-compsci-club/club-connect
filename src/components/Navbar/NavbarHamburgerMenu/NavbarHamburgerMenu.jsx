import React, { useContext } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { NavbarHamburgerMenuContext } from './NavbarHamburgerMenuContext';
import './NavbarHamburgerMenu.scss';
import { Link } from 'react-router-dom';
import logo from 'assets/logo.png';

const NavbarHamburgerMenu = () => {
  const context = useContext(NavbarHamburgerMenuContext);

  return (
    <div className="NavbarHamburgerMenu">
      <Menu
        className="navbar-mobile-menu"
        isOpen={context.isMenuOpen}
        onStateChange={(state) => context.stateChangeHandler(state)}
        right
        width={330}
      >
        <div className="nav-mobile-top-group">
          <div className="nav-mobile-logo-and-close-menu">
            <div className="nav-mobile-logo">
              <Link to="/" onClick={context.toggleMenu}>
                <img src={logo} alt="Brooklyn College Computer Science Club" />
                <p>
                  Brooklyn College <br /> Computer Science Club
                </p>
              </Link>
            </div>

            <div className="nav-mobile-close-menu" onClick={context.toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                width="48px"
                height="48px"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
              </svg>
            </div>
          </div>

          <ul className="nav-mobile-links">
            <li>
              <Link to="/about" onClick={context.toggleMenu}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/events" onClick={context.toggleMenu}>
                Events
              </Link>
            </li>
            <li>
              <Link to="/resources" onClick={context.toggleMenu}>
                Resources
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={context.toggleMenu}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <Link
          className="nav-mobile-join-button"
          to="/join"
          onClick={context.toggleMenu}
        >
          Join the Club
        </Link>
      </Menu>
    </div>
  );
};

export default NavbarHamburgerMenu;
