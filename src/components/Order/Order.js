import React from 'react';

import classes from './Order.module.css';

const order = ( props ) => {
    const ingredients = [];
    // iterate through all the object values to get ingredients
    for (let ingredientName in props.ingredients) {
        // push an object with the ingredient name and amount into the above create array
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName],
        })
    }

    const ingredientOutput = ingredients.map( ig => (
        <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                border: '1px solid #ccc',
                margin: '0 5px',
                padding: '5px'
            }}
            key={ ig.name }>{ ig.name }: { ig.amount }</span>
    ))
    
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>${ Number.parseFloat(props.price).toFixed(2) }</strong></p>
        </div> 
    )

};

export default order;