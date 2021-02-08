import React from 'react';
import { Element } from 'react-scroll';

import contributeStyles from 'styles/pages/Contribute.module.scss';

const HostEvent = () => (
  <Element name="host-event">
    <section>
      <h2 className={contributeStyles.heading}>
        Host a Workshop or Event with the Club
      </h2>
      <p>
        Events are one of the best parts about being in the club, where
        knowledgeable people in the community can share their knowledge with
        everyone else to benefit the community as a whole. If you have
        experience with a topic, consider hosting an event with the club! You'll
        be able to help fellow club members learn something new, and you'll get
        to practice your public speaking skills! Reach out to us by email
        at&nbsp;
        <a href="mailto:contact@bccompsci.club">contact@bccompsci.club</a>
        &nbsp;for more information and to get started.
      </p>
    </section>
  </Element>
);

export default HostEvent;
