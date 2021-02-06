import React from 'react';
import Head from 'next/head';

import {
  DescriptionSection,
  HighlightsSection,
  WelcomeSection,
} from 'components/index';
import { Ending } from 'components/common';

const Home = (props) => {
  return (
    <>
      <Head>
        <title>
          Brooklyn College Computer Science Club - Brooklyn College's Premier
          Computer Science Community
        </title>

        <meta
          property="og:title"
          content="Brooklyn College Computer Science Club"
          key="title"
        />
        <meta
          name="description"
          content="The official website for the Brooklyn College Computer Science Club."
          key="description"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bccompsci.club" />
        <meta
          property="og:image"
          content="https://bccompsci.club/inspiration.jpg"
        />
      </Head>

      <WelcomeSection width={props.width} />
      <DescriptionSection width={props.width} />
      <HighlightsSection />
      <Ending width={props.width} />
    </>
  );
};

export default Home;
