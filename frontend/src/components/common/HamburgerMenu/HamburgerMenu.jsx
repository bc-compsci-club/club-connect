import React, { useContext } from 'react';
import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';

import { HamburgerMenuContext } from './HamburgerMenuContext';
import styles from './HamburgerMenu.module.scss';
import logo from 'assets/logo.png';

const HamburgerMenu = () => {
  const context = useContext(HamburgerMenuContext);

  return (
    <div className={styles.hamburgerMenu}>
      <Menu
        className="navbar-mobile-menu"
        isOpen={context.isMenuOpen}
        onStateChange={(state) => context.stateChangeHandler(state)}
        right
        width={330}
      >
        <div className={styles.navMobileTopGroup}>
          <div className={styles.navMobileLogoAndCloseMenu}>
            <div className={styles.navMobileLogo}>
              <Link href="/">
                <a onClick={context.toggleMenu}>
                  <img
                    src={logo}
                    alt="Brooklyn College Computer Science Club"
                  />
                  <p>
                    Brooklyn College <br /> Computer Science Club
                  </p>
                </a>
              </Link>
            </div>

            <div
              className={styles.navMobileCloseMenu}
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
                <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
              </svg>
            </div>
          </div>

          <ul className={styles.navMobileLinks}>
            <li>
              <Link href="/about">
                <a onClick={context.toggleMenu}>About Us</a>
              </Link>
            </li>
            <li>
              <Link href="/events">
                <a onClick={context.toggleMenu}>Events</a>
              </Link>
            </li>
            <li>
              <Link href="/resources">
                <a onClick={context.toggleMenu}>Resources</a>
              </Link>
            </li>
            <li>
              <Link href="/contribute">
                <a onClick={context.toggleMenu}>Contribute</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a onClick={context.toggleMenu}>Contact</a>
              </Link>
            </li>
          </ul>
        </div>

        <Link href="/join">
          <a
            className={styles.navMobileJoinButton}
            onClick={context.toggleMenu}
          >
            Join the Club
          </a>
        </Link>
      </Menu>
    </div>
  );
};

export default HamburgerMenu;
