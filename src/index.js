// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import GA from 'components/GA';

import Routes from 'Routes';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import ScrollToTop from 'components/ScrollToTop';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-nunito';
import 'typeface-raleway';

// ReactGA.initialize('UA-173191894-1');
// ReactGA.pageview(window.location.pathname + window.location.search);

const page = (
  <React.StrictMode>
    <Router basename="/">
      <GA>
        <ScrollToTop />
        <header>
          <Navbar />
        </header>
        <main>
          <Routes />
        </main>
        <footer>
          <Footer />
        </footer>
      </GA>
    </Router>
  </React.StrictMode>
);

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(page, rootElement);
} else {
  ReactDOM.render(page, rootElement);
}
