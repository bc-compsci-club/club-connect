import React from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

import {
  TeamSection,
  TopSection,
  WhatWeDoSection,
  WhoWeAreSection,
} from 'components/about';
import { Ending } from 'components/common';
import { SITE_NAME_BASE } from 'pages/_app';

const pageTitle = `About Us – ${SITE_NAME_BASE}`;

const About = (props) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <NextSeo
        title={pageTitle}
        openGraph={{
          title: pageTitle,
          url: 'https://bccompsci.club/about',
        }}
      />

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
