import React, { useState } from 'react';
import Head from 'next/head';

import { JoinForm, JoinSuccess } from 'components/join';
import { SITE_TITLE_BASE } from 'pages/_app';

const Join = () => {
  const [memberJoined, setMemberJoined] = useState(false);

  return (
    <>
      <Head>
        <title>Join the Club | {SITE_TITLE_BASE}</title>
      </Head>

      {!memberJoined ? (
        <JoinForm setMemberJoined={setMemberJoined} />
      ) : (
        <JoinSuccess />
      )}
    </>
  );
};

export default Join;
