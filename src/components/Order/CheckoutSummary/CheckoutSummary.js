import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = ( props ) => (
    <div className={classes.CheckoutSummary}>
        <h4>We hope you like your burger</h4>
        <div style={{widht: '100%', margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button 
            btnType="Danger"
            clicked={props.checkoutCancelled}>CANCEL</Button>
        <Button 
            btnType="Success"
            clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
);

export default checkoutSummary;