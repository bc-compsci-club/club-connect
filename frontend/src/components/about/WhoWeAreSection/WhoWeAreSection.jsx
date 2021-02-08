import React from 'react';

import whoWeAreStyles from './WhoWeAreSection.module.scss';
import aboutStyles from 'styles/pages/About.module.scss';

const WhoWeAreSection = () => {
  return (
    <section className={whoWeAreStyles.whoWeAre}>
      <h2 className={aboutStyles.heading}>Who We Are</h2>

      <div className={aboutStyles.paragraphGroup}>
        <p>
          The Brooklyn College Computer Science Club is Brooklyn College’s
          premier student-led, community-first computer science community where
          students interested in technology come together to learn and grow in a
          safe, warm, and welcoming environment. Together as a community, we
          share our knowledge and offer advice to each other, form teams to
          build projects and attend hackathons with, discuss the latest trends
          and technologies, and more!
        </p>

        <p>
          The best and most innovative software engineers, data scientists, and
          UX/UI designers all started from somewhere! We welcome members of all
          skill levels and fields, ranging from complete beginner developers to
          the most seasoned designers. Our welcoming community is here to help
          you if you’re new to the world of computer science! Whether you need
          help with an assignment, want some advice about your career, or simply
          want to learn more about the field, our friendly community members can
          help point you in the right direction.
        </p>

        <p>
          No matter what your current programming experience is or whether
          you’re planning on majoring in computer science or not, there’s a
          place for you here at the Brooklyn College Computer Science Club.
        </p>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
