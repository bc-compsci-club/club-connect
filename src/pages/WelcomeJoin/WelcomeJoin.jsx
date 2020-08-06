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
        <a href="/discord">Discord</a>
        <a href="/messenger">Facebook Messenger</a>
        <a href="/facebook">Facebook Group</a>
        <a href="/instagram">Instagram</a>
      </div>
    </section>
  );
};

export default WelcomeJoin;
