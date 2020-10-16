// @flow
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Alert from 'react-bootstrap/Alert';
import learnDocs from './docs/learn.md';
import toolsDocs from './docs/tools.md';
import axios from 'axios';
import '../page-styles.scss';
import './Resources.scss';

const Resources = () => {
  const [learnMarkdown, setLearnMarkdown] = useState('');
  const [toolsMarkdown, setToolsMarkdown] = useState('');

  useEffect(() => {
    axios.get(learnDocs).then((res) => {
      setLearnMarkdown(res.data);
      console.log('Updated Raw Markdown');
    });
  }, [learnMarkdown]);

  useEffect(() => {
    axios.get(toolsDocs).then((res) => {
      setToolsMarkdown(res.data);
      console.log('Updated Raw Markdown');
    });
  }, [learnMarkdown]);

  return (
    <div className="page-styles Resources">
      <h1>Resources</h1>

      <ReactMarkdown source={learnMarkdown} />
      <br />
      <ReactMarkdown source={toolsMarkdown} />

      <Alert variant="primary" className="Resources-contribute">
        <Alert.Heading>Contribute to this list!</Alert.Heading>
        <p>
          Have any resources you want to share with us? Post them in our Discord
          community under the <code>#resources</code> channel or&nbsp;
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
  );
};

export default Resources;
