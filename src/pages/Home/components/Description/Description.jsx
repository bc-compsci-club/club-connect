// @flow
import React from 'react';
import './Description.scss';
import image from 'assets/home/linkedin.jpg';

const Description = () => {
  return (
    <section id="about" className="Description">
      <h2>Reach New Heights</h2>
      <img src={image} alt="Collaborate" />
      <p>
        The Brooklyn College Computer Science Club is Brooklyn College’s premier
        student-led, community-first computer science community where students
        interested in technology come together to learn and grow in a safe,
        warm, and welcome environment. Our mission is to empower all students
        interested in technology to succeed and advance in their careers. With a
        multitude of fun, exciting, and beginner-friendly events designed to
        enrich and grow your understanding of in-demand skills, a community of
        like-minded students and alumni ready to tackle anything that comes
        their way, and opportunities for members to network and collaborate on
        projects and hackathons, there&apos;s something for everyone here at the
        Computer Science Club. Jumpstart your career in Software Engineering,
        Data Science, Cybersecurity, UX/UI Design, and many more (or just drop
        by to chill and make some new friends!), here at the Brooklyn College
        Computer Science Club.
      </p>
    </section>
  );
};

export default Description;
