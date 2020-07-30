import React from 'react';
import Activity from './Activity';
import HackathonActivity from './HackathonActivity';
import './WhatWeDo.scss';
import skillUpImage from 'assets/about/activities/skill-up.jpg';
import hackathonImage from 'assets/about/activities/hackathon.jpg';
import collaborateBuildConquerImage from 'assets/about/activities/collaborate-build-conquer.jpg';

const WhatWeDo = () => {
  return (
    <section className="about-what-we-do">
      <div className="about-what-we-do-container">
        <div className="about-what-we-do-beginning">
          <h2>What We Do</h2>
          <p>
            Here at the Computer Science Club, there’s no shortage of things to
            do and activities to take part in. Here are just some of the things
            that you’ll see us doing!
          </p>
        </div>

        <Activity
          image={skillUpImage}
          imageAlt="Students gathered in an event venue viewing a presentation from the presenter."
          title="Skill Up at an Event"
          description={`
            Join us for a wide variety of events, ranging from tech talks, workshops, challenges, and much more (not to mention free food as well!). Some of our past events included a company visit to LinkedIn, a presentation about the evolution of the latest and greatest web frameworks, and a talk about how Alan Turing, widely considered to be the forefather of computer science, broke a secret code using cryptography.
          `}
        />

        <HackathonActivity
          image={hackathonImage}
          imageAlt="Winners of a hackathon with some team members from Brooklyn College."
          title="Hack Away at a Hackathon"
          subtitle="(don't worry, not that kind of hacking!)"
          description={[
            'Many of our club members love to attend hackathons, which are weekend-long events where people interested in technology learn, build, and share their ideas and creations. Find some team members and build your next hackathon team here!',
            'Our club is proud to be home to winners from various hackathons held across the country, including some hosted by Cornell University, Stony Brook University, and Johns Hopkins University.',
            'We also have our very own hackathon as well! In collaboration with other clubs here at Brooklyn College, we are proud to host Hack Brooklyn, our very own hackathon, right here at Brooklyn College! Look forward to it this coming spring.'
          ]}
        />

        <Activity
          image={collaborateBuildConquerImage}
          imageAlt="Students collaborating together to solve a problem."
          title="Collaborate, Build, and Conquer"
          description={`
            Events aren't the only thing we do here! Our club members love to build their portfolios and work on passion projects on their spare time. Looking for a team to build a project with or want to practice your whiteboarding and interviewing skills in a mock interview with someone? Look no further!
          `}
        />
      </div>
    </section>
  );
};

export default WhatWeDo;
