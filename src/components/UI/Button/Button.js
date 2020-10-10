import React from 'react';

import classes from './Button.module.css';

// stylized button which is stylized according to it's class. 2 classes at the moment: Danger & Success
const button = (props) => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}>{props.children}</button>
);

export default button;