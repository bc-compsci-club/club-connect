import Top from 'components/about/Top';
import WhoWeAre from 'components/about/WhoWeAre';
import WhatWeDo from 'components/about/WhatWeDo';
import Team from 'components/about/Team';
import Ending from 'components/common/Ending';
import styles from 'styles/pages/About.module.scss';

const About = (props) => {
  return (
    <div className={styles.about}>
      <Top />
      <WhoWeAre />
      <WhatWeDo />
      <Team />
      <Ending width={props.width} />
    </div>
  );
};

export default About;
