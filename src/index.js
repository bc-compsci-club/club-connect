// @flow
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-nunito';
import 'typeface-raleway';

import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import ScrollToTop from 'components/ScrollToTop';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'Routes';

import NavbarHamburgerMenu from './components/Navbar/NavbarHamburgerMenu';
import { NavbarHamburgerMenuProvider } from './components/Navbar/NavbarHamburgerMenu/NavbarHamburgerMenuContext';

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
