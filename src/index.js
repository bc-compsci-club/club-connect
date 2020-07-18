import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Routes from 'Routes';

import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import Join from 'pages/Join';

import './index.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'typeface-nunito';
import 'typeface-raleway';

// Page structure goes here!
const page = (
  <React.StrictMode>
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes />
      </main>
    </Router>
  </React.StrictMode>
);

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(page, rootElement);
} else {
  ReactDOM.render(page, rootElement);
}
