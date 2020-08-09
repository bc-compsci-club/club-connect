import React, { useEffect, useState } from 'react';
import Top from './components/Top';
import WhoWeAre from './components/WhoWeAre';
import WhatWeDo from './components/WhatWeDo';
import Ending from '../../components/Ending';
import './About.scss';

const About = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  return (
    <div className="About">
      <article>
        <Top />
        <WhoWeAre />
        <WhatWeDo />
        {/* TODO: Add Meet the Team section */}
        <Ending width={width} />
      </article>
    </div>
  );
};

export default About;
