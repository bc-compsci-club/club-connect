// @flow
import About from 'pages/About';
import ComingSoon from 'pages/ComingSoon';
import Home from 'pages/Home';
import Join from 'pages/Join';
import WelcomeJoin from 'pages/WelcomeJoin';
import React from 'react';
import {Route, Switch} from 'react-router-dom';

const Routes = () => {
  return (<Switch><Route path = "/coming-soon"><ComingSoon />
          </Route>
      <Route path="/welcome ">
           < WelcomeJoin /></Route>
      <Route path="/join ">
                            < Join /></Route>
      <Route path="/about ">
                                      < About />
          </Route>
      <Route exact path="/">
           < Home /></Route>
    </Switch>);
};

export default Routes;
