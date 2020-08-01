import React, { useState } from 'react';

// make a new context
const NavbarHamburgerMenuContext = React.createContext();

// create the provider
const NavbarHamburgerMenuProvider = (props) => {
  const [menuOpenState, setMenuOpenState] = useState(false);

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
