import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { ClubEvent } from 'components/events/[...id]';
import { API_ROOT } from 'pages/_app';

const EventPage = (props) => {
  const { clubEventData } = props;

  return (
    <div className="EventPage">
      <ClubEvent clubEventData={clubEventData} />
    </div>
  );
};

/* Temp fix - cannot export getServerSideProps from a Page when running 'next export' during deployment */
// export const getServerSideProps = async (context) => {
//   const clubEventId = context.params.id[0];
//   const clubEvent = await axios.get(`${API_ROOT}/events/${clubEventId}`);

//   if (!clubEvent.data) {
//     return { notFound: true };
//   } else {
//     return { props: { clubEventData: clubEvent.data } };
//   }
// };

EventPage.propTypes = {
  clubEventData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    internalName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    banner: PropTypes.string,
    presenter: PropTypes.string,
    presenterImage: PropTypes.string,
    startDateTime: PropTypes.instanceOf(Date),
    endDateTime: PropTypes.instanceOf(Date),
    eventLocation: PropTypes.string,
    shortDescription: PropTypes.string,
    longDescription: PropTypes.string,
    externalLink: PropTypes.string,
    externalLinkButtonText: PropTypes.string,
  }),
};

export default EventPage;
