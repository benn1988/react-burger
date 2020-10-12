import React from 'react';

import classes from "./DrawerToggle.module.css";

// hamburger item component
const drawerToggle = ( props ) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;