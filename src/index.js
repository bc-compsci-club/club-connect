// @flow
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React  from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from 'Routes';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import ScrollToTop from 'components/ScrollToTop';
import NavbarHamburgerMenu from './components/Navbar/NavbarHamburgerMenu';
import { NavbarHamburgerMenuProvider } from './components/Navbar/NavbarHamburgerMenu/NavbarHamburgerMenuContext';
import './index.scss';
import 'typeface-nunito';
import 'typeface-raleway';

const page = (
  <React.StrictMode>
    <Router>
      <ScrollToTop />

      <NavbarHamburgerMenuProvider>
        <NavbarHamburgerMenu />
        <header>
          <Navbar />
        </header>
      </NavbarHamburgerMenuProvider>

      <main>
        <Routes />
      </main>

      <footer>
        <Footer />
      </footer>
    </Router>
  </React.StrictMode>
);

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(page, rootElement);
} else {
  ReactDOM.render(page, rootElement);
}
