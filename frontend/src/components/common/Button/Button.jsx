import React from 'react';
import Link from 'next/link';

import styles from './Button.module.scss';

const Button = (props) => {
  const { asLink, href, classNamePassed, children } = props;

  let combinedClassName = `${styles.button}`;
  if (classNamePassed !== undefined) {
    combinedClassName += ` ${classNamePassed}`;
  }

  if (asLink) {
    return (
      <Link href={href}>
        <a className={combinedClassName} {...props}>
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <button className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
};

export default Button;
