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
        {controls.map(ctrl => ( // map through each control, and render it
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.type)} // when clicked, we invoke the handler and pass to it the ingredient
                />
        ))}
    </div>
);

export default buildControls;