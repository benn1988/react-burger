import React from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = ( props ) => {

  return (
    <div className={classes.SideDrawer}>
      {/* Passing the height of the Logo as prop, and it being applied as inline styling */}
      <Logo height={'11%'}/>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  )
};

export default sideDrawer;