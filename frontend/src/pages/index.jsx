import React from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

import {
  DescriptionSection,
  HighlightsSection,
  WelcomeSection,
} from 'components/index';
import { Ending } from 'components/common';
import { SITE_NAME_BASE } from 'pages/_app';

const pageTitle = `${SITE_NAME_BASE} – Brooklyn College's Premier
          Computer Science Community`;

const Home = (props) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <NextSeo
        title={pageTitle}
        openGraph={{
          title: pageTitle,
          url: 'https://bccompsci.club/',
        }}
      />

      <WelcomeSection width={props.width} />
      <DescriptionSection width={props.width} />
      <HighlightsSection />
      <Ending width={props.width} />
    </>
  );
};

export default Home;
