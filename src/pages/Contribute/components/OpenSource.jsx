import React from 'react';
import { Element } from 'react-scroll';
import Alert from 'react-bootstrap/Alert';

const OpenSource = () => (
  <Element name="open-source">
    <section className="contribute-open-source-software" id="open-source">
      <h2 className="contribute-heading">
        Contribute to the Club's Open Source Software
      </h2>

      <p>
        Most of the club's software is open source on our&nbsp;
        <a href="https://github.com/bc-compsci-club">GitHub Organization</a>!
        We're currently looking for contributors interested in helping us out
        with some of our software, such as new features and bug fixes for the
        club's website.
      </p>

      <h3>Here's how you can help:</h3>
      <ol className="contribute-open-source-steps">
        <div className="contribute-open-source-first">
          <h4>First, claim the issue that you want to work on.</h4>
          <li>
            Pick a project you want to contribute to and visit it's GitHub
            repository.
          </li>

          <Alert variant="primary">
            Our open source projects can be found on our&nbsp;
            <Alert.Link href="https://github.com/bc-compsci-club">
              GitHub Organization
            </Alert.Link>
            .
          </Alert>

          <li>
            Go to the Issues tab and choose an open issue you want to help with.
          </li>
          <li>
            Leave a comment in the issue stating you would like to work on it.
          </li>
          <Alert variant="info">
            If an issue is already being worked on, consider reaching out to the
            person or group working on it and ask if you can help! Multiple
            contributors can receive credit when you co-author commits.
          </Alert>
        </div>
        <div>
          <h4>
            Once you've been assigned the issue by a maintainer, you can fork
            the project repository and stat working on it!
          </h4>
          <li>Fork the project's repository to your own GitHub account.</li>
          <li>Clone the forked repository to your computer.</li>
          <li>
            Create a branch in your forked repository on your computer for your
            changes.
          </li>
          <li>Make your changes and commit them to your new branch</li>
          <Alert variant="success">
            Be sure to leave comments about your progress and status on the
            issue every few days while you're working on it! It's okay to ask
            for help or for clarification about the issue!
          </Alert>
        </div>
        <div>
          <h4>
            Finally, once you're done, push your local changes to your fork on
            GitHub and open a pull request!
          </h4>
          <li>Push your changes to your fork on GitHub.</li>
          <li>Open a pull request for your changes.</li>
        </div>
      </ol>
      <p>
        After you submit your pull request, a maintainer will review your code.
        If all goes well and your pull request is accepted, your changes will be
        merged into the main branch!
      </p>
      <a
        href="https://opensource.guide/how-to-contribute/#opening-a-pull-request"
        target="_blank"
        rel="noopener noreferrer"
      >
        Need more help? Here's a nice tutorial on how to contribute to an open
        source project!
      </a>
    </section>
  </Element>
);

export default OpenSource;
