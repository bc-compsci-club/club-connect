// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
import About from 'pages/About';
import Events from 'pages/Events';
import Resources from 'pages/Resources';
import Join from 'pages/Join';
import WelcomeJoin from 'pages/WelcomeJoin';
import EventPage from 'pages/EventPage';
import Contribute from 'pages/Contribute';
import Contact from 'pages/Contact';

const Routes = () => {
  return (
    <Switch>
      <Route path="/welcome">
        <WelcomeJoin />
      </Route>
      <Route path="/join">
        <Join />
      </Route>
      <Route path="/resources">
        <Resources />
      </Route>
      <Route path="/events/:id">
        <EventPage />
      </Route>
      <Route path="/events">
        <Events />
      </Route>
      <Route path="/contribute">
        <Contribute />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
