// @flow
import About from 'pages/About';
import Events from 'pages/Events';
import Home from 'pages/Home';
import Join from 'pages/Join';
import Resources from 'pages/Resources';
import WelcomeJoin from 'pages/WelcomeJoin';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <Switch>
      <Route path="/welcome">
        <WelcomeJoin />
      </Route>
      <Route path="/join ">
        <Join />
      </Route>
      <Route path="/resources ">
        <Resources />
      </Route>
      <Route path="/events ">
        <Events />
      </Route>
      <Route path="/about ">
        <About />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
