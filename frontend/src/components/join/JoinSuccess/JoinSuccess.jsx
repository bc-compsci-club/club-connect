import React from 'react';

import joinSuccessStyles from 'components/join/JoinSuccess/JoinSuccess.module.scss';

const WelcomeJoin = () => {
  return (
    <section className={joinSuccessStyles.joinSuccess}>
      <span
        className={joinSuccessStyles.emoji}
        role="img"
        aria-label="Welcome Confetti"
      >
        🎉
      </span>
      <h1>
        You&apos;re in!
        <br />
        Welcome aboard!
      </h1>
      <p className={joinSuccessStyles.description}>
        Welcome to the Brooklyn College Computer Science Club! It’s great to
        have you here with us. You can join the community using the social media
        links below. Check your email for these links, too!
      </p>
      <div className={joinSuccessStyles.links}>
        <a href="https://bccompsci.club/discord">Discord</a>
        <a href="https://bccompsci.club/messenger">Facebook Messenger</a>
        <a href="https://bccompsci.club/facebook">Facebook Group</a>
        <a href="https://bccompsci.club/instagram">Instagram</a>
      </div>
    </section>
  );
};

export default WelcomeJoin;
