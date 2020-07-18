// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'pages/Home';
import Join from 'pages/Join';

const Routes = () => {
  return (
      <Switch>
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
