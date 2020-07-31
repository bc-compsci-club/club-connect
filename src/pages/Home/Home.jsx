// @flow
import React from 'react';
import Welcome from './components/Welcome';
import Description from './components/Description';
import Highlights from './components/Highlights';
import Ending from '../../components/Ending';

const Home = () => {
  return (
    <div className="Home">
      <article>
        <Welcome />
        <Description />
        <Highlights />
        <Ending />
      </article>
    </div>
  );
};

export default Home;
