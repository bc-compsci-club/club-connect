import React from 'react';
import './WelcomeJoin.scss';

const WelcomeJoin = () => {
  return (
    <section className="WelcomeJoin">
      <span
        className="welcomejoin-emoji"
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
      <p className="welcomejoin-description">
        Welcome to the Brooklyn College Computer Science Club! It’s great to
        have you here with us! You can join the community using the social media
        links below. Check your email for these links, too!
      </p>
      <div className="welcomejoin-links">
        <a href="https://discord.gg/GxYBcx8">Discord</a>
        <a href="https://messenger.com">Facebook Messenger</a>
        <a href="https://facebook.com">Facebook Group</a>
        <a href="https://instagram.com">Instagram</a>
      </div>
    </section>
  );
};

export default WelcomeJoin;
