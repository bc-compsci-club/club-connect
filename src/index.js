import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from 'components/Navbar';
import Home from 'pages/Home';

import './index.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'typeface-nunito';
import 'typeface-raleway';

// Page structure goes here!
const page = (
  <React.StrictMode>
    <header>
      <Navbar />
    </header>
    <main>
      <Home />
    </main>
  </React.StrictMode>
);

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(page, rootElement);
} else {
  ReactDOM.render(page, rootElement);
}
