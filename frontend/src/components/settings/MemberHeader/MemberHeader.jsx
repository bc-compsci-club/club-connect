import React from 'react';

import { getMemberImage } from 'utils/generalUtils';
import memberHeaderStyles from './MemberHeader.module.scss';

const MemberHeader = (props) => {
  const { userData } = props;

  return (
    <section className={memberHeaderStyles.memberHeader}>
      <img
        className={memberHeaderStyles.memberImage}
        src={getMemberImage()}
        alt="Image of user"
      />
      <div className={memberHeaderStyles.nameAndRole}>
        <h2 className={memberHeaderStyles.name}>
          {userData.firstName} {userData.lastName}
        </h2>

        <h3 className={memberHeaderStyles.role}>
          {userData.role === 'Admin' && 'Administrator'}
          {userData.role === 'BrooklynCollegeMember' &&
            'Brooklyn College Club Member'}
          {userData.role === 'Member' && 'Club Member'}
        </h3>
      </div>
    </section>
  );
};

export default MemberHeader;
