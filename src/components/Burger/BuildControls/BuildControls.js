import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

// store all controls in an array for an easier output
const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
];

const buildControls = ( props ) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => ( // map through each control, and render it
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                // when clicked, we invoke the handler and pass to it the ingredient
                removed={() => props.ingredientRemoved(ctrl.type)}
                added={() => props.ingredientAdded(ctrl.type)}
                disabled={props.disabledBtn[ctrl.type]} // passing the state of the button for this ingredient
                />
        ))}
    </div>
);

export default buildControls;