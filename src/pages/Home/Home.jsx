// @flow
import React from 'react';
import Welcome from './components/Welcome';
import Description from './components/Description';
import Highlights from './components/Highlights';

const Home = () => {
  return (
    <div className="Home">
      <Welcome />
      <Description />
      <Highlights />
    </div>
  );
};

export default Home;
