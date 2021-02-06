import React from 'react';
import Head from 'next/head';

import {
  TeamSection,
  TopSection,
  WhatWeDoSection,
  WhoWeAreSection,
} from 'components/about';
import { Ending } from 'components/common';
import { SITE_TITLE_BASE } from 'pages/_app';

const About = (props) => {
  return (
    <>
      <Head>
        <title>About Us | {SITE_TITLE_BASE}</title>
      </Head>
      <div>
        <TopSection />
        <WhoWeAreSection />
        <WhatWeDoSection />
        <TeamSection />
        <Ending width={props.width} />
      </div>
    </>
  );
};

export default About;
