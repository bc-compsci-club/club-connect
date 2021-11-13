import React from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import Alert from 'react-bootstrap/Alert';

import { SITE_NAME_BASE } from 'pages/_app';
import LearnResources from 'assets/pages/resources/learn.mdx';
import ToolsResources from 'assets/pages/resources/tools.mdx';
import resourcesStyles from 'styles/pages/Resources.module.scss';
import commonStyles from 'styles/commonStyles.module.scss';
import csHandook from '../frontend/src/assets/csHandook.pdf';

const pageTitle = `Resources – ${SITE_NAME_BASE}`;

const Resources = () => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <NextSeo
        title={pageTitle}
        openGraph={{
          title: pageTitle,
          url: 'https://bccompsci.club/resources',
        }}
      />

      <div
        className={`${commonStyles.container} ${commonStyles.text} ${resourcesStyles.resources}`}
      >
        <h1 className={commonStyles.centerElement}>Resources</h1>
        <h2 className={commonStyles.centerElement}><a href={csHandbook} download="csHandbook.pdf"> Brooklyn College CS Handbook </a></h2>
        
        <LearnResources />

        <br />

        <h1 className={commonStyles.centerElement}>Useful Tools</h1>
        <ToolsResources />

        <Alert variant="primary" className={resourcesStyles.contribute}>
          <Alert.Heading>Contribute to this list!</Alert.Heading>
          <p>
            Have any resources you want to share with us? Post them in our
            Discord community under the <code>#resources</code> channel or&nbsp;
            <Alert.Link
              href="https://github.com/bc-compsci-club/bccompsci.club"
              rel="noopener noreferrer"
              target="_blank"
            >
              submit a pull request here
            </Alert.Link>
            !
          </p>
        </Alert>
      </div>
    </>
  );
};

export default Resources;
