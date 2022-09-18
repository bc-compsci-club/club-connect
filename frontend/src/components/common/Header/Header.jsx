import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { HamburgerMenuContext } from 'components/common/HamburgerMenu/HamburgerMenuContext';
import { UserIcon, UserDropdownMenu } from 'components/common';
import { windowSupported } from 'utils/checkSupport';
import styles from './Header.module.scss';
import logo from 'assets/logo.png';
import hamburgerMenuIcon from 'assets/icons/hamburger-menu.svg';
import dropdownArrowIcon from 'assets/icons/dropdown-arrow.svg';

const Header = () => {
  const context = useContext(HamburgerMenuContext);
  const isUserLoggedIn = useSelector((state) => state.userLoggedIn);

  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  return (
    <header>
      <nav className={styles.navbarMain}>
        <div className={styles.navbarMainItems}>
          <div className={styles.navLogo}>
            <Link href="/">
              <a>
                <img src={logo} alt="Logo" />
                {/* eslint-disable-next-line */}
                <p role="text">
                  Brooklyn College <br /> Computer Science Club
                </p>
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.navbarMainLinks}>
            {windowSupported() && isUserLoggedIn ? (
              <>
                <LoggedInItems
                  dropdownMenuOpen={dropdownMenuOpen}
                  setDropdownMenuOpen={setDropdownMenuOpen}
                />

                {dropdownMenuOpen && (
                  <UserDropdownMenu setDropdownMenuOpen={setDropdownMenuOpen} />
                )}
              </>
            ) : (
              <LoggedOutItems />
            )}
          </nav>

          {/* Mobile Navigation */}
          <button
            className={styles.navbarHamburgerMenuButton}
            onClick={context.toggleMenu}
          >
            <img src={hamburgerMenuIcon} alt="Open menu" />
          </button>
        </div>
      </nav>
    </header>
  );
};

const LoggedInItems = (props) => {
  const { dropdownMenuOpen, setDropdownMenuOpen } = props;

  return (
    <ul>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link href="/announcements">Announcements</Link>
      </li>
      <li>
        <Link href="/events">Events</Link>
      </li>
      <li>
        <Link href="/resources">Resources</Link>
      </li>
      <li>
        <Link href="/contribute">Contribute</Link>
      </li>
      <li className={styles.userIcon}>
        <button
          onClick={() => {
            setDropdownMenuOpen(!dropdownMenuOpen);
          }}
        >
          <UserIcon />
          <img
            className={styles.dropdownArrow}
            src={dropdownArrowIcon}
            alt="Toggle dropdown menu"
          />
        </button>
      </li>
    </ul>
  );
};

const LoggedOutItems = () => {
  return (
    <ul>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/events">Events</Link>
      </li>
      <li>
        <Link href="/resources">Resources</Link>
      </li>
      <li>
        <Link href="/contribute">Contribute</Link>
      </li>
      {/* <li>
        <Link href="/login">
          <a>
            <strong>Log In</strong>
          </a>
        </Link>
      </li> */}
      <li className={styles.joinButton}>
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLScb5bZEYE9sBzT57bbepmSFy6M21yoOWg4i5zHYSicfkxTOOg/viewform?usp=sf_link"
          target="_blank"
        >
          Join the Club
        </Link>
      </li>
    </ul>
  );
};
export default Header;
