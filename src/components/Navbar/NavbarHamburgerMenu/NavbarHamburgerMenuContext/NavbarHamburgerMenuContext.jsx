// @flow
import React, { useEffect, useState } from 'react';

// make a new context
const NavbarHamburgerMenuContext = React.createContext();

// Checks if the device is an iOS device.
const isUsingiOS = () => {
  return /iP(hone|od touch|ad)/.test(navigator.platform);
};

// Gets the iOS version. Returns null if the device isn't an iOS device.
const getiOSVersion = () => {
  if (/iP(hone|od touch|ad)/.test(navigator.platform)) {
    const version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    return parseInt(version[1], 10);
  }

  return null;
};

// create the provider
const NavbarHamburgerMenuProvider = (props) => {
  const [menuOpenState, setMenuOpenState] = useState(false);

  // Workaround for the hamburger menu opening when the page is loaded on iOS 8 and under.
  useEffect(() => {
    if (isUsingiOS() && getiOSVersion() < 9) {
      // Disable the sliding animation
      document.getElementsByClassName('bm-menu-wrap')[0].style.WebkitTransitionDuration = '0';

      // Hide both the menu and the overlay
      document.getElementsByClassName('bm-menu-wrap')[0].style.WebkitTransform = 'translate3d(100%, 0, 0)';
      document.getElementsByClassName('bm-overlay')[0].style.WebkitTransform = 'translate3d(100%, 0, 0)';
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
