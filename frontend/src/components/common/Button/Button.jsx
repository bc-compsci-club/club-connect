import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const Button = (props) => {
  const {
    asLink,
    href,
    big,
    variant,
    classNamePassed,
    children,
    ...otherProps
  } = props;

  let resultClassName = big ? `${styles.buttonBig}` : `${styles.button}`;

  // Set button variant
  // Button defaults to primary
  console.log(variant);
  if (variant === 'secondary') {
    resultClassName += ` ${styles.buttonSecondary}`;
  } else if (variant === 'danger') {
    resultClassName += ` ${styles.buttonDanger}`;
  }

  // Append classNamePassed to className
  if (classNamePassed !== undefined) {
    resultClassName += ` ${classNamePassed}`;
  }

  if (asLink) {
    return (
      <Link href={href}>
        <a className={resultClassName} {...otherProps}>
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <button className={resultClassName} {...otherProps}>
        {children}
      </button>
    );
  }
};

Button.propTypes = {
  asLink: PropTypes.bool,
  href: PropTypes.string,
  big: PropTypes.bool,
  variant: PropTypes.string,
  classNamePassed: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
