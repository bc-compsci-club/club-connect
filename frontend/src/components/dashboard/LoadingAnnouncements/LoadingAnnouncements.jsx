import React from 'react';

import LoadingAnnouncement from 'components/common/LoadingAnnouncement';

// Represents an event on the event browser.
const LoadingAnnouncements = () => {
  return (
    <div>
      <LoadingAnnouncement />
      <LoadingAnnouncement />
      <LoadingAnnouncement />
    </div>
  );
};

export default LoadingAnnouncements;
