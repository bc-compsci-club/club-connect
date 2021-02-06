import React from 'react';

import cardStyles from './Card.module.scss';

const Card = (props) => {
  const { className, children } = props;
  const cardClassName = className
    ? `${cardStyles.card} ${className}`
    : cardStyles.card;
  return <div className={cardClassName}>{children}</div>;
};

export default Card;
