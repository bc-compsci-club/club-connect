import React, { useState } from 'react';
import Head from 'next/head';

import { JoinForm, JoinSuccess } from 'components/join';
import { SITE_NAME_BASE } from 'pages/_app';
import { NextSeo } from 'next-seo';

const pageTitle = `Join the Club – ${SITE_NAME_BASE}`;

const Join = () => {
  const [memberJoined, setMemberJoined] = useState(false);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <NextSeo
        title={pageTitle}
        openGraph={{
          title: pageTitle,
          url: 'https://bccompsci.club/join',
        }}
      />

      {!memberJoined ? (
        <JoinForm setMemberJoined={setMemberJoined} />
      ) : (
        <JoinSuccess />
      )}
    </>
  );
};

export default Join;
