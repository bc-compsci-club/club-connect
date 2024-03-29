import React from 'react';
import Link from 'next/link';

import { TeamMember } from './components';
import teamStyles from './TeamSection.module.scss';
import aboutStyles from 'styles/pages/About.module.scss';
import clubLogo from 'assets/logo.png';
import kevinImage from 'assets/pages/about/team-members/2020-2021/kevin.jpg';
import dennisImage from 'assets/pages/about/team-members/2020-2021/dennis.jpg';
import shahzodaImage from 'assets/pages/about/team-members/2019-2020/shahzoda.jpg';
import vincentImage from 'assets/pages/about/team-members/2019-2020/vincent.jpg';
import rohmaImage from 'assets/pages/about/team-members/2019-2020/rohma.jpg';
import tylerImage from 'assets/pages/about/team-members/2019-2020/tyler.jpg';
import siamImage from 'assets/pages/about/team-members/2019-2020/siam.jpg';

import anastasiaImage from 'assets/pages/about/team-members/2021-2022/Anastasia.jpg';
import evelynImage from 'assets/pages/about/team-members/2021-2022/Evelyn.png';
import oleksandraImage from 'assets/pages/about/team-members/2021-2022/Oleksandra.jpg';
import gilmanImage from 'assets/pages/about/team-members/2021-2022/Gilman.jpg';


const TeamSection = () => {
  return (
    <section className={teamStyles.team}>
      <h2 className={aboutStyles.heading}>Meet The Team</h2>

      {/* Executive Board Members */}
      <section className={teamStyles.positionExecutiveBoard}>
        <h3 className={teamStyles.position}>
          <strong>Executive Board Members</strong>
        </h3>
        {/* 2022 - 2023 Executive Board */}
        <div>
          <h4 className={teamStyles.term}>June 2022 - May 2023</h4>
          <div className={teamStyles.teamMemberList}>
            {/* 150 characters max for description */}
            <TeamMember image={oleksandraImage} firstName="Oleksandra" lastName="Kurbanova">
              I love algorithms and LeetCode. I spend my free time in books and open world games. 
            </TeamMember>
            <TeamMember
              image={evelynImage} firstName="Evelyn" lastName="Velez"
            >
              I enjoy coding, hiking scenic landscapes, and going on joy rides. 
            </TeamMember>
            <TeamMember
              image={gilmanImage} firstName="Gilman" lastName="Huang"
            >
              NYC Tech Talent Pipeline Residency fellow. Old man aspiring to be a video game speedrunner. 
            </TeamMember>
            <TeamMember
              image={clubLogo} firstName="xxxxx" lastName="xxxxx"
            >
              Hi! I&apos;m an Executive Board Member of the Brooklyn College
              Computer Science Club.
            </TeamMember>
          </div>
        </div>
        {/* 2021 - 2022 Executive Board */}
        <div>
          <h4 className={teamStyles.term}>June 2021 - May 2022</h4>
          <div className={teamStyles.teamMemberList}>
            {/* 150 characters max for description */}
            <TeamMember image={anastasiaImage} firstName="Anastasia" lastName="Gusenkov">
              Currently trying out UI/UX development.
              Playing D&amp;D on the weekends.
            </TeamMember>
            <TeamMember image={oleksandraImage} firstName="Oleksandra" lastName="Kurbanova">
              I love algorithms and LeetCode. I spend my free time in books and open world games. 
            </TeamMember>
            <TeamMember
              image={evelynImage} firstName="Evelyn" lastName="Velez"
            >
              I enjoy coding, hiking scenic landscapes, and going on joy rides. 
            </TeamMember>
            <TeamMember
              image={gilmanImage} firstName="Gilman" lastName="Huang"
            >
              NYC Tech Talent Pipeline Residency fellow. Old man aspiring to be a video game speedrunner. 
            </TeamMember>
          </div>
        </div>
        {/* 2020 - 2021 Executive Board */}
        <div>
          <h4 className={teamStyles.term}>June 2020 - May 2021</h4>
          <div className={teamStyles.teamMemberList}>
            {/* 150 characters max for description */}
            <TeamMember image={clubLogo} firstName="Syeda" lastName="Kazmi">
              Hi! I&apos;m an Executive Board Member of the Brooklyn College
              Computer Science Club.
            </TeamMember>
            <TeamMember image={clubLogo} firstName="Junninho" lastName="Thomas">
              Hi! I&apos;m an Executive Board Member of the Brooklyn College
              Computer Science Club.
            </TeamMember>
            <TeamMember
              image={kevinImage}
              firstName="Kevin"
              lastName="Tam"
              website="https://kevintamcs.com"
            >
              Hello! I&apos;m Kevin, a Software Engineer studying Computer
              Science here at BC. I develop innovative software to help solve
              problems and overcome challenges.
            </TeamMember>
            <TeamMember
              image={clubLogo}
              firstName="Neissa"
              lastName="Dorsinville"
            >
              Hi! I&apos;m an Executive Board Member of the Brooklyn College
              Computer Science Club.
            </TeamMember>
            <TeamMember
              image={dennisImage}
              firstName="Dennis"
              lastName="Klimenkov"
              website="https://www.linkedin.com/in/dennis-klimenkov"
            >
              Hi! I&apos;m Dennis, a Computer Science student at Brooklyn
              College. I&apos;m trying to write code that will make the world a
              better place one day!
            </TeamMember>
          </div>
        </div>

        {/* 2019 - 2020 Executive Board */}
        <div>
          <h4 className={teamStyles.term}>June 2019 - May 2020</h4>
          <div className={teamStyles.teamMemberList}>
            <TeamMember
              image={shahzodaImage}
              firstName="Shahzoda"
              lastName="Davlatova"
            >
              I&apos;m a student studying Computational Math with a minor
              Physics. My interests are reading, traveling, and long boarding.
            </TeamMember>
            <TeamMember image={vincentImage} firstName="Vincent" lastName="Xie">
              In my free time I attend hackathons and sleep. If you want to talk
              about hackathons and what they are or just want to talk tech, come
              say hi!
            </TeamMember>
            <TeamMember image={rohmaImage} firstName="Rohma" lastName="Khan">
              I&apos;m a Brooklyn College alumni interested in baking, movies
              and meditation!
            </TeamMember>
            <TeamMember image={tylerImage} firstName="Tyler" lastName="Carway">
              On top of my passion for coding I also enjoy videogames, starting
              but never finishing Netflix series, playing boardgames, and
              hanging out with my friends.
            </TeamMember>
            <TeamMember image={siamImage} firstName="Siam" lastName="Rahman">
              I love wrestling, biking, video games and WWII planes. If any one
              of you wanna talk about video games or planes I&apos;d be psyched
              to do so.
            </TeamMember>
          </div>
        </div>
      </section>

      {/* Software Engineers */}
      <section>
        <h3 className={teamStyles.position}>
          <strong>Software Engineers</strong>
        </h3>

        <div>
          <h4 className={teamStyles.term}>June 2020 - May 2021</h4>
          <div className={teamStyles.teamMemberList}>
            {/* 150 characters max for description */}
            <TeamMember
              image={kevinImage}
              firstName="Kevin"
              lastName="Tam"
              website="https://kevintamcs.com"
            >
              Hello! I&apos;m Kevin, a Software Engineer studying Computer
              Science here at BC. I develop innovative software to help solve
              problems and overcome challenges.
            </TeamMember>
            <TeamMember
              image={dennisImage}
              firstName="Dennis"
              lastName="Klimenkov"
              website="https://www.linkedin.com/in/dennis-klimenkov"
            >
              Hi! I&apos;m Dennis, a Computer Science student at Brooklyn
              College. I&apos;m trying to write code that will make the world a
              better place one day!
            </TeamMember>
            <TeamMember image={clubLogo} firstName="Junninho" lastName="Thomas">
              Hi! I&apos;m an Executive Board Member of the Brooklyn College
              Computer Science Club.
            </TeamMember>
          </div>
        </div>
      </section>

      <article className={teamStyles.join}>
        <p>
          Interested in joining the team? We&apos;re currently looking for
          volunteers to help out with the club!&nbsp;
          <Link href="/contribute">
            Click here to learn more about our open positions and to apply now.
          </Link>
        </p>
      </article>
    </section>
  );
};

export default TeamSection;
