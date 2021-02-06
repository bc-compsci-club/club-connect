import React from 'react';

import styles from 'components/common/LabeledInput/LabeledInput.module.scss';

const LabeledInput = (props) => {
  const { labelText, name, ref, className } = props;

  let passedClassName = '';
  if (className !== undefined) {
    passedClassName = ` ${className}`;
  }

  return (
    <div className={`${styles.labeledInput} ${passedClassName}`}>
      <label htmlFor={name}>{labelText}</label>
      <input name={name} id={name} ref={ref} {...props} />
    </div>
  );
};

export default LabeledInput;
