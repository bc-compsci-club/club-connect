import React from 'react';

import styles from './UserIcon.module.scss';
import { getMemberImage } from 'utils/generalUtils';

const UserIcon = () => {
  return <img className={styles.memberImage} src={getMemberImage()} alt="User" />;
};

export default UserIcon;
