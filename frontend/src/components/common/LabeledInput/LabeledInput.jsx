import React from 'react';

import styles from './LabeledInput.module.scss';

const LabeledInput = (props) => {
  const { labelText, name, ref, className, ...otherProps } = props;

  let passedClassName = '';
  if (className !== undefined) {
    passedClassName = ` ${className}`;
  }

  return (
    <div className={passedClassName}>
      <label htmlFor={name}>{labelText}</label>
      <input
        className={styles.labeledInput}
        name={name}
        id={name}
        ref={ref}
        {...otherProps}
      />
    </div>
  );
};

export default LabeledInput;
