import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked} />
);

export default button;