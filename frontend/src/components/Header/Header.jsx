import { useContext } from 'react';
import Link from 'next/link';
import { NavbarHamburgerMenuContext } from '../NavbarHamburgerMenu/NavbarHamburgerMenuContext';
import styles from './Header.module.scss';
import logo from 'assets/logo.png';

const Header = () => {
  const context = useContext(NavbarHamburgerMenuContext);

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
            <ul>
              <li>
                <Link href="/about">About Us</Link>
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
              <li>
                <Link href="/contact">Contact</Link>
              </li>

              <li className={styles.joinButton}>
                <Link href="/join">Join the Club</Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Navigation */}
          <button
            className={styles.navbarHamburgerMenuButton}
            onClick={context.toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              width="48px"
              height="48px"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
