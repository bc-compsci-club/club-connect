import React, { useEffect, useState } from 'react';

import { getIosVersion, isIosPlatform } from 'utils/iOSUtils';
import { windowSupported } from 'utils/checkSupport';

// make a new context
const HamburgerMenuContext = React.createContext();

// create the provider
const HamburgerMenuProvider = (props) => {
  const [menuOpenState, setMenuOpenState] = useState(false);

  // Workaround for the hamburger menu opening when the page is loaded on iOS 8 and under.
  useEffect(() => {
    if (isIosPlatform() && (getIosVersion() < 9)) {
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
    <HamburgerMenuContext.Provider
      value={{
        isMenuOpen: menuOpenState,
        toggleMenu: () => setMenuOpenState(!menuOpenState),
        stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen),
      }}
    >
      {props.children}
    </HamburgerMenuContext.Provider>
  );
};

export { HamburgerMenuContext, HamburgerMenuProvider };
