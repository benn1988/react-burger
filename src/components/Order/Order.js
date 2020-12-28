import React from 'react';

import classes from './Order.module.css';

const order = ( props ) => (
   <div className={classes.Order}>
       <p>Ingredients: Salad (1)</p>
       <p>Price: <strong>$5.00</strong></p>
   </div> 
);

export default order;