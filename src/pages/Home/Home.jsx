// @flow
import React from 'react';
import Welcome from './components/Welcome';
import Description from './components/Description';

const Home = () => {
  return (
    <div className="Home">
      <Welcome />
      <Description />
    </div>
  );
};

export default Home;
