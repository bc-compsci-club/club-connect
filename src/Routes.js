// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Join from 'pages/Join';
import WelcomeJoin from 'pages/WelcomeJoin';

const Routes = () => {
  return (
    <Switch>
      <Route path="/welcome">
        <WelcomeJoin />
      </Route>
      <Route path="/join">
        <Join />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
