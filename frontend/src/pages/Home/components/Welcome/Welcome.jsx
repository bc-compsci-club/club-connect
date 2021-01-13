import Link from 'next/link';
import Typewriter from 'typewriter-effect';

import { windowSupported } from 'utils/windowSupported';
import slideshow from 'assets/home/welcome-slideshow/inspiration.jpg';
import styles from './Welcome.module.scss';

const Welcome = (props) => {
  return (
    <section className={styles.welcome}>
      <div className={styles.welcomeBackgroundContainer}>
        <div className={styles.welcomeContainer}>
          <div className={styles.welcomeContent}>
            <Slogan width={props.width} />
            <p className={styles.welcomeDescription}>
              Learn something new at an event, form a team to build a project
              with, or find out more about the field! The Brooklyn College
              Computer Science Club welcomes you, regardless of your programming
              experience or major.
            </p>
            <div className={styles.welcomeActionButtons}>
              <Link href="/join">
                <a className={styles.joinButton}>Join&nbsp;the&nbsp;Club</a>
              </Link>
              <Link href="/about">
                <a className={styles.learnMore}>Learn More</a>
              </Link>
            </div>
          </div>

          <div className={styles.welcomeSlideshow}>
            <img src={slideshow} alt="Members of the Computer Science Club at the SBUHacks hackathon." />
          </div>
        </div>
      </div>
    </section>
  );
};

const Slogan = (props) => {
  if (windowSupported() && window.document.documentMode) {
    console.log('Internet Explorer detected, disabling typewriter effect.');
    return (
      // eslint-disable-next-line
      <span className={styles.slogan} role="text">
        <h1 className={styles.sloganBeginning}>
          A community driven by&nbsp;
          <span id="welcome-typewriter-placeholder">inspiration.</span>
        </h1>
      </span>
    );
  } else {
    return (
      // eslint-disable-next-line
      <span className={styles.slogan} role="text">
        <SloganBeginning width={props.width}>
          <TypewriterWelcome />
        </SloganBeginning>
      </span>
    );
  }
};

const SloganBeginning = (props) => {
  // <= 370 (small phones)
  if (props.width <= 370) {
    return (
      <h1 className={styles.sloganBeginning}>
        A community driven by&nbsp;{props.children}
      </h1>
    );
    // <= 600px (larger phones)
  } else if (props.width <= 600) {
    return (
      <h1 className={styles.sloganBeginning}>
        A community driven
        <br />
        by&nbsp;
        {props.children}
      </h1>
    );
    // <= 910px (tablets and landscape phones)
  } else if (props.width <= 910) {
    return (
      <h1 className={styles.sloganBeginning}>
        A community driven by
        <br />
        {props.children}
      </h1>
    );
  } else {
    // > 910px (larger tablets and laptops)
    return (
      <h1 className={styles.sloganBeginning}>
        A community driven
        <br />
        by&nbsp;
        {props.children}
      </h1>
    );
  }
};

const TypewriterWelcome = () => {
  // Strings for the typewriter effect to cycle through
  const strings = [
    'inspiration.',
    'collaboration.',
    'diversity.',
    'passion.',
    'creativity.',
    'learning.',
  ];

  const typewriterInit = (typewriter) => {
    document.getElementById('welcome-typewriter-placeholder').remove();
    const typeString = (string, pauseTime) => {
      typewriter.typeString(string).pauseFor(pauseTime).deleteAll(30);
    };

    for (const string of strings) {
      typeString(string, 2500);
      // TODO: Slideshow with club images
    }

    typewriter.start();
  };

  return (
    <>
      <span id="welcome-typewriter-placeholder">inspiration.</span>
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
          delay: 30,
          deleteSpeed: 30,
        }}
        onInit={(typewriter) => typewriterInit(typewriter)}
      />
    </>
  );
};

export default Welcome;
