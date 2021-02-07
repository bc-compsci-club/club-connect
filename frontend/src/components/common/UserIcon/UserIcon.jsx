import React from 'react';

import { getMemberImage } from 'utils/generalUtils';
import styles from './UserIcon.module.scss';

const UserIcon = () => {
  return <img className={styles.memberImage} src={getMemberImage()} alt="User" />;
};

export default UserIcon;
