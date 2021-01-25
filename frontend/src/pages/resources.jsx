import React from 'react';
import Head from 'next/head';
import Alert from 'react-bootstrap/Alert';

import commonStyles from 'styles/commonStyles.module.scss';
import resourcesStyles from 'styles/pages/Resources.module.scss';
import LearnResources from 'assets/resources/learn.mdx';
import ToolsResources from 'assets/resources/tools.mdx';
import { SITE_TITLE_BASE } from 'pages/_app';

const Resources = () => {
  return (
    <>
      <Head>
        <title>Resources | {SITE_TITLE_BASE}</title>
      </Head>
      <div className={`${commonStyles.styles} ${resourcesStyles.resources}`}>
        <h1 className={commonStyles.centerElement}>Resources</h1>
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
