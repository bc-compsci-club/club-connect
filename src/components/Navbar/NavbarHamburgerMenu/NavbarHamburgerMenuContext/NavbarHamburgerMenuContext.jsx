// @flow
import React, { useEffect, useState } from 'react';
import { isUsingiOS, getiOSVersion } from 'utils/iOSUtils';

// make a new context
const NavbarHamburgerMenuContext = React.createContext();

// create the provider
const NavbarHamburgerMenuProvider = (props) => {
  const [menuOpenState, setMenuOpenState] = useState(false);

  // Workaround for the hamburger menu opening when the page is loaded on iOS 8 and under.
  useEffect(() => {
    if (isUsingiOS() && getiOSVersion() < 9) {
      // Disable the sliding animation
      document.getElementsByClassName(
        'bm-menu-wrap'
      )[0].style.WebkitTransitionDuration = '0';

      // Hide both the menu and the overlay
      document.getElementsByClassName('bm-menu-wrap')[0].style.WebkitTransform =
        'translate3d(100%, 0, 0)';
      document.getElementsByClassName('bm-overlay')[0].style.WebkitTransform =
        'translate3d(100%, 0, 0)';
    }
  }, []);

  return (
    <NavbarHamburgerMenuContext.Provider
      value={{
        isMenuOpen: menuOpenState,
        toggleMenu: () => setMenuOpenState(!menuOpenState),
        stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen),
      }}
    >
      {props.children}
    </NavbarHamburgerMenuContext.Provider>
  );
};

export { NavbarHamburgerMenuContext, NavbarHamburgerMenuProvider };
