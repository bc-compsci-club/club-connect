import React from 'react';
import { Element } from 'react-scroll';

import Role from './Role';
import contributeStyles from 'styles/pages/Contribute.module.scss';

const Volunteer = () => (
  <Element name="volunteer">
    <section className={contributeStyles.volunteer} id="volunteer">
      <h2 className={contributeStyles.heading}>Volunteer for the Club</h2>
      <p>
        As a club, we're tasked with plenty of duties that require a variety of
        skillsets, so even if you aren't interested in programming, you might
        still be able to help us out! Please take a look at our open roles below
        to see which roles would fit you best. Thank you for your interest in
        volunteering for us!
      </p>

      <h3 className={contributeStyles.openRolesHeading}>Open Roles:</h3>

      <UXUIDesignerRole />
      <GraphicDesignerRole />
      <VideoEditorContentCreatorRole />
      <SoftwareEngineerRole />
    </section>
  </Element>
);

const UXUIDesignerRole = () => (
  <Role title="UX/UI Designer">
    <p>
      As a UX/UI Designer, you will design and prototype user interfaces and
      interactions for club and hackathon software, including:
    </p>
    <ul>
      <li>The club's website (the one you're currently on right now!)</li>

      <li>
        The website for Hack Brooklyn, Brooklyn College's annual hackathon
      </li>

      <li>
        Upcoming open source software for the club led by us, including...
        <ul>
          <li>A digital bulletin board to post digital flyers on</li>

          <li>A custom registration portal and dashboard for Hack Brooklyn</li>

          <li>
            An unannounced, in-development project to be revealed in the coming
            months! (more details once you join us!)
          </li>
        </ul>
      </li>
    </ul>

    <p>You will be able to:</p>
    <ul>
      <li>
        Watch as your design comes to life and gets turned into real software by
        talented club members and volunteers
      </li>
      <li>
        Design software and experiences that will benefit everyone in the
        community
      </li>
      <li>
        Gain access to an exclusive Discord channel where you can network and
        collaborate with other volunteers and the E-Board
      </li>
      <li>Be one of the first to hear about new developments in the club</li>
    </ul>
  </Role>
);

const GraphicDesignerRole = () => (
  <Role title="Graphic Designer">
    <p>
      As a Graphic Designer, you will design material for use within the club
      and our hackathon, including:
    </p>
    <ul>
      <li>
        Event posters, flyers, and banners for the club and Hack Brooklyn,
        Brooklyn College's annual hackathon
      </li>

      <li>
        The design and style of "The Monthly Patch", the club's monthly
        newsletter
      </li>

      <li>
        Social media posts on the club's Facebook group, Instagram page, and the
        website.
      </li>

      <li>
        Art and designs to be used for club software, such as clip art and small
        drawings
      </li>
    </ul>

    <p>You will be able to:</p>
    <ul>
      <li>
        Have your designs displayed prominently on the club newsletter, on our
        social media, and around the campus
      </li>
      <li>
        Get the community hyped about upcoming events and activities with
        captivating designs
      </li>
      <li>
        Gain access to an exclusive Discord channel where you can network and
        collaborate with other volunteers and the E-Board
      </li>
      <li>Be the first to hear about new developments in the club</li>
    </ul>
  </Role>
);

const VideoEditorContentCreatorRole = () => (
  <Role title="Video Editor/Content Creator">
    <p>
      As a Video Editor/Content Creator, you will design and create media for
      use within the club and our hackathon, including:
    </p>
    <ul>
      <li>The club's welcome trailer showcasing the things we do as a club</li>

      <li>
        An onboarding video to help new club members get comfortable in the club
      </li>

      <li>Event recordings and replays for members to rewatch anytime</li>

      <li>
        A recap video for Hack Brooklyn, Brooklyn College's annual hackathon
      </li>
    </ul>

    <p>You will be able to:</p>
    <ul>
      <li>
        Have your videos shown prominently on our social media, the club
        website, and more
      </li>
      <li>Help new club members find their way around the club</li>
      <li>
        Enable club members to enjoy and rewatch events even after they have
        ended
      </li>
      <li>
        Excite everyone in the community about upcoming events and activities
        with awesome trailers
      </li>
      <li>
        Gain access to an exclusive Discord channel where you can network and
        collaborate with other volunteers and the E-Board
      </li>
      <li>Be the first to hear about new developments in the club</li>
    </ul>
  </Role>
);

const SoftwareEngineerRole = () => (
  <Role title="Software Engineer">
    <p>
      As a Software Engineer, you will maintain and develop the club and
      hackathon's open source software, including:
    </p>
    <ul>
      <li>The club's website (the one you're currently on right now!)</li>

      <li>
        The website for Hack Brooklyn, Brooklyn College's annual hackathon
      </li>

      <li>
        Upcoming open source software for the club led by us, including...
        <ul>
          <li>A digital bulletin board to post digital flyers on</li>

          <li>A custom registration portal and dashboard for Hack Brooklyn</li>

          <li>
            An unannounced, in-development project to be revealed in the coming
            months! (more details once you join us!)
          </li>
        </ul>
      </li>
    </ul>

    <p>You will be able to:</p>
    <ul>
      <li>
        Build open source software that will benefit hundreds of club members in
        the community, as well as other clubs and organizations at Brooklyn
        College and around the world
      </li>

      <li>
        Develop unique digital experiences for club events and activites that go
        beyond your average Zoom meetings
      </li>

      <li>
        Gain access to an exclusive Discord channel where you can network and
        collaborate with other volunteers and the E-Board
      </li>

      <li>Be one of the first to hear about new developments in the club</li>
    </ul>

    <p>
      Successful maintainers of our open source projects will have contributed
      in a significant way to one of the projects.
    </p>

    <p>
      Keep in mind that you don't need to be a volunteer to contribute to the
      club's open source projects! Anyone can submit a pull request for one of
      the projects to help improve the software for everyone to use. Take a look
      at the section below for more details on how to contribute and to get
      started!
    </p>
  </Role>
);

export default Volunteer;
