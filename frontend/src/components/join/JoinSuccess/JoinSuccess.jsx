import React from 'react';
import Link from 'next/link';

import { Button } from 'components/common';
import joinSuccessStyles from './JoinSuccess.module.scss';

const WelcomeJoin = () => {
  return (
    <article className={joinSuccessStyles.joinSuccess}>
      {/* Welcome */}
      <section className={joinSuccessStyles.welcomeSection}>
        <span
          className={joinSuccessStyles.emoji}
          role="img"
          aria-label="Welcome Confetti"
        >
          🎉
        </span>

        <h1 className={joinSuccessStyles.welcomeHeading}>
          You&apos;re in!
          <br />
          Welcome aboard!
        </h1>

        <div className={joinSuccessStyles.text}>
          <p>
            Welcome to the Brooklyn College Computer Science Club! We're excited
            that you've decided to join us! As a member of the club, you will
            have access to many opportunities that will allow you to learn new
            skills, collaborate on projects, take part in mock interviews,
            network with others, and much more.
          </p>

          <p>
            Ready to begin? Follow the steps below to start the onboarding
            process. These steps have also been sent to your email address in
            case you want to refer to them later!
          </p>
        </div>
      </section>

      {/* Activate Account */}
      <section className={joinSuccessStyles.onboardingStep}>
        <h2 className={joinSuccessStyles.heading}>
          Step 1. Activate your Account
        </h2>

        <div className={joinSuccessStyles.text}>
          <p>
            Right here on the club portal, you'll be able to get the latest news
            and updates about the club! To access these member-only updates,
            you'll need to finish the registration process by verifying your
            email.
          </p>

          <p>
            <Link href="/join/activate">
              <a target="_blank">Activate your account</a>
            </Link>{' '}
            to gain access to everything the club has to offer, such as the
            latest announcements, opportunities exclusively for Brooklyn College
            members, the ability to request to present at a club event, and
            more.
          </p>
        </div>

        <div className={joinSuccessStyles.buttonContainer}>
          <Button href="/join/activate" target="_blank" big asLink>
            Activate Your Account
          </Button>
        </div>
      </section>

      {/* Community */}
      <section className={joinSuccessStyles.onboardingStep}>
        <h2 className={joinSuccessStyles.heading}>
          Step 2. Join the Community
        </h2>

        <div className={joinSuccessStyles.text}>
          <p>
            Now that you're a member of the club, take your first steps and join
            our group chats and social media pages! As a community, we have a
            few ways which we use to communicate with each other. Join as many
            or as few of them as you'd like! We'll detail each of these
            platforms below and their primary uses below.
          </p>

          {/* Discord */}
          <section className={joinSuccessStyles.communitySection}>
            <h3>Discord</h3>

            <div className={joinSuccessStyles.communityText}>
              <p>
                The best way to be a part of the community is to join the club's
                Discord community! Discord is a free text, voice, and video chat
                app that allows members of the community to talk with each other
                in multiple channels, keeping each conversation on topic unlike
                traditional instant messaging apps.
              </p>

              <p>
                We have separate text channels where members can request help
                with their code, find others to team up with, get advice about
                their careers, and much more. If you've ever used Slack before,
                you can think of Discord as a casual version of Slack! Discord
                can be accessed through your computer, web browser, or mobile
                device.
              </p>

              <p>
                Not sure how to use Discord and/or never used it before? Don't
                worry, Discord has you covered! You can find a beginner's guide
                published by them{' '}
                <a
                  href="https://support.discord.com/hc/en-us/articles/360045138571-Beginner-s-Guide-to-Discord"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  here.
                </a>
              </p>
            </div>

            <div className={joinSuccessStyles.discordContainer}>
              <div className={joinSuccessStyles.discordInstructions}>
                <div className={joinSuccessStyles.discordText}>
                  <p>
                    Once you join, feel free to introduce yourself to everyone
                    in the <strong>#introductions</strong> channel! Here are
                    some things you may want to include in your introduction:
                  </p>
                </div>

                <ul className={joinSuccessStyles.list}>
                  <li>Your current year in college</li>
                  <li>Your major/concentration</li>
                  <li>Something that you developed/built recently</li>
                  <li>Your hobbies and interests</li>
                  <li>A book/movie/piece of literature that inspired you</li>
                  <li>A fun fact about yourself</li>
                </ul>

                <div className={joinSuccessStyles.discordButton}>
                  <Button
                    href="https://discord.com/invite/FwM8e53s"
                    rel="noopener noreferrer"
                    target="_blank"
                    style={{
                      backgroundColor: '#7289da',
                    }}
                    big
                    asLink
                  >
                    Join Discord
                  </Button>
                </div>
              </div>

              <iframe
                className={joinSuccessStyles.discordWidget}
                src="https://discord.com/widget?id=380815741705912320&theme=light"
                allowTransparency="true"
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                loading="lazy"
              />
            </div>
          </section>

          <section className={joinSuccessStyles.communitySection}>
            <h3>Facebook Messenger</h3>

            <div className={joinSuccessStyles.communityText}>
              <p>
                In addition to our Discord community, we also have a Facebook
                Messenger group chat! The Messenger group chat is perfect for
                quick questions and updates about the club and our events, with
                the occasional discussion.
              </p>
            </div>

            <div className={joinSuccessStyles.buttonContainer}>
              <Button
                href="https://bccompsci.club/messenger"
                rel="noopener noreferrer"
                target="_blank"
                style={{
                  backgroundColor: '#3399ff',
                }}
                big
                asLink
              >
                Get Messenger Invite
              </Button>
            </div>
          </section>

          <section className={joinSuccessStyles.communitySection}>
            <h3>Facebook Group</h3>

            <div className={joinSuccessStyles.communityText}>
              <p>
                Our Facebook group is perfect if you want to stay informed about
                the latest updates about the club. Professors in the department
                are also willing to answer any questions you may have in the
                Facebook Group!
              </p>
            </div>

            <div className={joinSuccessStyles.buttonContainer}>
              <Button
                href="https://bccompsci.club/facebook"
                rel="noopener noreferrer"
                target="_blank"
                style={{
                  backgroundColor: '#3366ff',
                }}
                big
                asLink
              >
                Join Facebook Group
              </Button>
            </div>
          </section>

          <section className={joinSuccessStyles.communitySection}>
            <h3>Instagram</h3>
            <div className={joinSuccessStyles.communityText}>
              <p>
                Our Instagram page is where we post news and updates about the
                club, as well as upcoming events! Be sure to follow us to stay
                updated about the club!
              </p>
            </div>

            <div className={joinSuccessStyles.buttonContainer}>
              <Button
                href="https://bccompsci.club/instagram"
                rel="noopener noreferrer"
                target="_blank"
                style={{
                  backgroundColor: '#ff3399',
                }}
                big
                asLink
              >
                Follow us on Instagram
              </Button>
            </div>
          </section>
        </div>
      </section>

      <section className={joinSuccessStyles.exploreSection}>
        <h2 className={joinSuccessStyles.heading}>Step 3. Explore!</h2>

        <div className={joinSuccessStyles.text}>
          <p>
            Now that you're settled in, feel free to check out the rest of the
            club! Here are some suggestions on activities that you can do:
          </p>
        </div>

        <ul className={joinSuccessStyles.list}>
          <li>
            Check out some of our upcoming club events at our&nbsp;
            <Link href="/events">
              <a target="_blank">events page</a>
            </Link>
          </li>
          <li>
            Find awesome resources for your next project or interview at
            our&nbsp;
            <Link href="/resources">
              <a target="_blank">resources page</a>
            </Link>
          </li>
          <li>
            Volunteer for the club and help to improve the club for everyone at
            our&nbsp;
            <Link href="/contribute">
              <a target="_blank">contribution page</a>
            </Link>
          </li>
          <li>
            Start a discussion with the&nbsp;
            <Link href="https://bccompsci.club/discord">
              <a target="_blank">Discord community</a>
            </Link>{' '}
            in the&nbsp;
            <strong>#general</strong> channel
          </li>
          <li>
            Get help with your code or assignment in the&nbsp;
            <strong>#programming-help</strong> channel
          </li>
          <li>
            Get advice about your professional or academic career in the&nbsp;
            <strong>#advice-career-academic</strong> channel
          </li>
          <li>
            Find a team to build a project with, practice mock interviewing and
            whiteboarding with, or anything else in the&nbsp;
            <strong>#find-a-team</strong> channel
          </li>
          <li>
            Find a team to participate in a hackathon with, discover hackathon
            projects built by club members, and discuss the latest hackathons in
            the&nbsp;<strong>#hackathons</strong> channel
          </li>
        </ul>
      </section>
    </article>
  );
};

export default WelcomeJoin;
