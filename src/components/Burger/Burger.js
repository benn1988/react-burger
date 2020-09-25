import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {

    const transformedIngredients = Object.keys(props.ingredients) // return an array of the ingredients properties
        .map(igKey => { // for each ingredient property
            return [...Array(props.ingredients[igKey])] // return an array containing the property X times (where X is the value of the property)
                .map((_, index) => { // for each time the property appears
                    return <BurgerIngredient key={igKey + index} type={igKey} /> // return the ingredient component with it's respective type
                });
        });

    return (
        <div className={classes.Burger}>
        {/* top and bottom buns are always present */}
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;