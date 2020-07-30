import React from 'react';
import Top from './components/Top';
import WhoWeAre from './components/WhoWeAre';
import WhatWeDo from './components/WhatWeDo';
import Ending from '../../components/Ending';
import './About.scss';

const About = () => {
  return (
    <div className="About">
      <article>
        <Top />
        <WhoWeAre />
        <WhatWeDo />
        {/* TODO: Add Meet the Team section */}
        <Ending />
      </article>
    </div>
  );
};

export default About;
