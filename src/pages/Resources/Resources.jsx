// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import './Resources.scss';

const Resources = () => {
  return (
    <div className="Resources">
      <h1>Resources</h1>
      <span role="img" aria-label="Resources Book Stack">
        📚
      </span>
      <h2>Coming soon...</h2>

      <p>
        Very soon, you&apos;ll be able to view a list of useful resources
        available to you as a club member and as a student that can help you
        with your projects, interviews, designs, and many more, all right here
        at the Resources page! While you wait, the helpful community has
        recommended lots of resources over on the Discord community! Visit the{' '}
        <span className="resources-bold">#resources</span> channel on the
        Discord community to get started. Not a member of the Discord community
        yet? Join the club today to gain access!
      </p>

      <p>
        The Resources page is a community effort, where everyone can suggest and
        recommend resources for everyone to enjoy. Want to help out the
        community and recommend a resource? Tell us all about it in the{' '}
        <span className="resources-bold">#resources</span> channel on the
        Discord community!
      </p>
    </div>
  );
};

export default Resources;
