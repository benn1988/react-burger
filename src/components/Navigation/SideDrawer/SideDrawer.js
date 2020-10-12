import React from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = ( props ) => {
  // save the SideDrawer class in an array
  const sideDrawerClasses = [classes.SideDrawer];
  // add to the array the Open or Close class, depending on the passed props
  props.show ? sideDrawerClasses.push(classes.Open) : sideDrawerClasses.push(classes.Close);

  return (
    // because we have the classes saved in an array, we have to join them
    <div className={sideDrawerClasses.join(' ')}>
      {/* Passing the height of the Logo as prop, and it being applied as inline styling */}
      <Logo height={'11%'}/>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  )
};

export default sideDrawer;