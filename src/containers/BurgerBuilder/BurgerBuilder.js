import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }


    // handler to add one ingredient each time when the 'More' button is clicked. It accepts the ingredient as argument
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddittion = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddittion;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    // handler to remove one ingredient each time when the 'Less' button is clicked. It accepts the ingredient as argument
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    // handler to show the modal with the order summary when the 'ORDER NOW' button is pressed
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    render () {
        // create a copy of the state
        const disabledInfo = {
            ...this.state.ingredients
        };
        // replace the values from the state copy to true or false, wether greater than 0, to be able to manipulate the state of each ingredient's 'Less' button
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // check if all the values of disabledInfo are true, then the 'Order Now' btn is disabled(no ingredients selected)
        const disabledOrderBtn = Object.keys(disabledInfo)
            .map( igKey => disabledInfo[igKey])
            .reduce( (final, current) => {
                return (final && current);
            } , true);
        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    disabledBtn={disabledInfo}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    disabledOrderBtn={disabledOrderBtn}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;