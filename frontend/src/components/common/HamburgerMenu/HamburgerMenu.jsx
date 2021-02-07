import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';

import Button from 'components/common/Button';
import { HamburgerMenuContext } from './HamburgerMenuContext';
import { getUserData, getUserIsLoggedIn, setLoggedOut } from 'utils/auth';
import { windowSupported } from 'utils/checkSupport';
import styles from './HamburgerMenu.module.scss';
import logo from 'assets/logo.png';
import closeIcon from 'assets/icons/close.svg';
import UserIcon from 'components/common/UserIcon';

const HamburgerMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const context = useContext(HamburgerMenuContext);
  const isUserLoggedIn = useSelector((state) => state.userLoggedIn);

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
              <img src={closeIcon} alt="Close menu" />
            </div>
          </div>

          <nav>
            {windowSupported() && isUserLoggedIn ? (
              <LoggedInItems context={context} />
            ) : (
              <LoggedOutItems context={context} />
            )}
          </nav>
        </div>

        {getUserIsLoggedIn() && (
          <div className={styles.divider}>
            <hr />
          </div>
        )}

        {/* Bottom part that replaces the dropdown menu */}
        <div>
          {getUserIsLoggedIn() && (
            <div className={styles.navMobileMemberData}>
              <UserIcon />
              <div className={styles.memberName}>
                <strong>
                  {getUserData().firstName} {getUserData().lastName}
                </strong>
              </div>
            </div>
          )}

          <nav className={styles.navMobileBottomList}>
            <ul className={styles.navMobileLinkList}>
              {getUserIsLoggedIn() ? (
                <>
                  {getUserData().role === 'Admin' ? (
                    <>
                      <li>
                        <Link href="/announcements/post">
                          <a
                            className={`${styles.navBottomListLink} ${styles.navMobileLink}`}
                            onClick={context.toggleMenu}
                          >
                            Post Announcement
                          </a>
                        </Link>
                      </li>

                      {/* For some reason the .bigButton class is applied to every second element */}
                      {/* Hidden list item to work around this */}
                      <li className={styles.disabled}></li>

                      <li>
                        <Link href="/events/create">
                          <a
                            className={`${styles.navBottomListLink} ${styles.navMobileLink}`}
                            onClick={context.toggleMenu}
                          >
                            Create Event
                          </a>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link href="/events/request">
                        <a
                          className={`${styles.navBottomListLink} ${styles.navMobileLink}`}
                          onClick={context.toggleMenu}
                        >
                          Request Event
                        </a>
                      </Link>
                    </li>
                  )}

                  <li className={styles.disabled}></li>

                  <li>
                    <Link href="/settings">
                      <a
                        className={`${styles.navBottomListLink} ${styles.navMobileLink}`}
                        onClick={context.toggleMenu}
                      >
                        Settings
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Button
                      classNamePassed={styles.navLogOutButton}
                      onClick={() => {
                        context.toggleMenu();
                        setLoggedOut(dispatch, router);
                      }}
                    >
                      Log Out
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">
                      <a
                        className={`${styles.navBottomListLink} ${styles.navMobileLink}`}
                        onClick={context.toggleMenu}
                      >
                        <strong>Log In</strong>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Button
                      classNamePassed={styles.navJoinButton}
                      href="/join"
                      onClick={context.toggleMenu}
                      asLink
                      big
                    >
                      Join the Club
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </Menu>
    </div>
  );
};

const LoggedInItems = (props) => {
  const { context } = props;

  return (
    <ul className={styles.navMobileLinkList}>
      <MenuLink href="/about" context={context}>
        About
      </MenuLink>
      <MenuLink href="/dashboard" context={context}>
        Dashboard
      </MenuLink>
      <MenuLink href="/announcements" context={context}>
        Announcements
      </MenuLink>
      <MenuLink href="/events" context={context}>
        Events
      </MenuLink>
      <MenuLink href="/resources" context={context}>
        Resources
      </MenuLink>
      <MenuLink href="/contribute" context={context}>
        Contribute
      </MenuLink>
    </ul>
  );
};

const LoggedOutItems = (props) => {
  const { context } = props;

  return (
    <ul className={styles.navMobileLinkList}>
      <MenuLink href="/about" context={context}>
        About
      </MenuLink>
      <MenuLink href="/events" context={context}>
        Events
      </MenuLink>
      <MenuLink href="/resources" context={context}>
        Resources
      </MenuLink>
      <MenuLink href="/contribute" context={context}>
        Contribute
      </MenuLink>
    </ul>
  );
};

const MenuLink = (props) => {
  const { href, context, children } = props;

  return (
    <li>
      <Link href={href}>
        <a className={styles.navMobileLink} onClick={context.toggleMenu}>
          {children}
        </a>
      </Link>
    </li>
  );
};

export default HamburgerMenu;
