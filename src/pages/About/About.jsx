import React from 'react';
import Top from './components/Top';
import WhoWeAre from './components/WhoWeAre';
import WhatWeDo from './components/WhatWeDo';
import './About.scss';

const About = () => {
  return (
    <div className="About">
      <Top />
      <WhoWeAre />
      <WhatWeDo />
    </div>
  );
};

export default About;
