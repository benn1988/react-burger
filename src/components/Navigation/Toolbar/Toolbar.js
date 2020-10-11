import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationsItems from '../NavigationItems/NavigationItems';

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <div>Menu</div>
        {/* Changing the logo height by wrapping the logo inside a div
         and applying a height of 80% to the div through CSS */}
        <div className={classes.Logo}>
            <Logo />
        </div>

        <nav>
            <NavigationsItems />
        </nav>
        
    </header>
);

export default toolbar;