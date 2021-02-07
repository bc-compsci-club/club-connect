import React from 'react';

import styles from './Activity.module.scss';

const Activity = (props) => {
  return (
    <div className={`${styles.activity} ${props.componentClass}`}>
      <div className={styles.titleAndDescription}>
        <h3 className={styles.title}>{props.title}</h3>
        <p className={styles.description}>{props.description}</p>
      </div>
      <img className={styles.image} src={props.image} alt={props.imageAlt} />
    </div>
  );
};

export default Activity;
