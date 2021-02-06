import React from 'react';
import Link from 'next/link';

import joinSuccessStyles from 'components/join/JoinSuccess/JoinSuccess.module.scss';
import commonStyles from 'styles/commonStyles.module.scss';

const WelcomeJoin = () => {
  return (
    <div className={joinSuccessStyles.joinSuccess}>
      <section>
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

        <p className={joinSuccessStyles.text}>
          Welcome to the Brooklyn College Computer Science Club! It’s great to
          have you here with us. You can join the community using the social
          media links below. Check your email for these links, too!
        </p>
      </section>

      <section className={joinSuccessStyles.links}>
        <a
          href="https://bccompsci.club/discord"
          rel="noopener noreferrer"
          target="_blank"
        >
          Discord
        </a>
        <a
          href="https://bccompsci.club/messenger"
          rel="noopener noreferrer"
          target="_blank"
        >
          Facebook Messenger
        </a>
        <a
          href="https://bccompsci.club/facebook"
          rel="noopener noreferrer"
          target="_blank"
        >
          Facebook Group
        </a>
        <a
          href="https://bccompsci.club/instagram"
          rel="noopener noreferrer"
          target="_blank"
        >
          Instagram
        </a>
      </section>

      <section className={joinSuccessStyles.nextSteps}>
        <h3 className={commonStyles.centerElement}>Next Steps</h3>
        <p className={joinSuccessStyles.text}>
          <Link href="/join/activate">Activate your account</Link> to gain
          access to everything the club has to offer, such as hearing the latest
          announcements, opportunities exclusively for Brooklyn College members,
          club event requesting, and more.
        </p>
      </section>
    </div>
  );
};

export default WelcomeJoin;
