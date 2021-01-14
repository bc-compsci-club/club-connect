import {
  TopSection,
  WhoWeAreSection,
  WhatWeDoSection,
  TeamSection,
} from 'components/about';
import { Ending } from 'components/common';
import styles from 'styles/pages/About.module.scss';

const About = (props) => {
  return (
    <div className={styles.about}>
      <TopSection />
      <WhoWeAreSection />
      <WhatWeDoSection />
      <TeamSection />
      <Ending width={props.width} />
    </div>
  );
};

export default About;
