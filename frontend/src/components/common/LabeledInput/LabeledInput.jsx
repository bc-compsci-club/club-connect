import React from 'react';

const LabeledInput = (props) => {
  const { labelText, name, ref, className, ...otherProps } = props;

  let passedClassName = '';
  if (className !== undefined) {
    passedClassName = ` ${className}`;
  }

  return (
    <div className={passedClassName}>
      <label htmlFor={name}>{labelText}</label>
      <input name={name} id={name} ref={ref} {...otherProps} />
    </div>
  );
};

export default LabeledInput;
