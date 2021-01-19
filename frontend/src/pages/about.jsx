import React from 'react';
import Head from 'next/head';

import {
  TopSection,
  WhoWeAreSection,
  WhatWeDoSection,
  TeamSection,
} from 'components/about';
import { Ending } from 'components/common';
import styles from 'styles/pages/About.module.scss';
import { SITE_TITLE_BASE } from 'pages/_app';

const About = (props) => {
  return (
    <>
      <Head>
        <title>About | {SITE_TITLE_BASE}</title>
      </Head>
      <div className={styles.about}>
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
