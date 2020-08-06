// @flow
import React from 'react';
import './Description.scss';
import image from 'assets/home/linkedin.jpg';

const Description = () => {
  return (
    <section className="Description">
      <h2 className="description-heading">Reach New Heights</h2>

      <OpeningParagraph />
      <img
        className="description-image"
        src={image}
        alt="Club members visiting LinkedIn during a club company visit."
      />

      <div className="description-mission">
        <h3 className="description-mission-heading">Our Mission:</h3>
        <p className="description-mission-content">
          To help students interested in technology to meet other
          like&#8209;minded students and to help advance their careers.
        </p>
      </div>

      <div className="description-main-content">
        <p>
          The Computer Science Club offers a multitude of fun, exciting, and
          beginner-friendly events designed to enrich and grow your
          understanding of in-demand skills, a community of like-minded students
          and alumni ready to tackle anything that comes their way, and plenty
          of opportunities for members to network and collaborate on projects
          and hackathons.
        </p>

        <p>
          Whether you&apos;re looking to jumpstart your career in Software
          Engineering, Data Science, Cybersecurity, UX/UI Design, and many other
          related fields, or just want to drop by to chill and make some new
          friends, there&apos;s something for everyone here at the Brooklyn
          College Computer Science Club.
        </p>
      </div>
    </section>
  );
};

const OpeningParagraph = () => {
  if (window.innerWidth <= 700) {
    return (
      <p className="description-opening-paragraph">
        The Brooklyn College Computer Science Club is a community that enables
        students interested in technology to learn and grow together.
      </p>
    );
  } else {
    return (
      <p className="description-opening-paragraph">
        The Brooklyn College Computer Science Club is a community that
        <br />
        enables students interested in technology to learn and grow together.
      </p>
    );
  }
};

export default Description;
