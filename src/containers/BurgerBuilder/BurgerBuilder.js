import React, { Component } from 'react';
import axios from '../../axios-orders'; // import out axios instance

import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        purchasing: false, // clicked the Order Now button, to show the order details?
        loading: false // waiting for the request to the server
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

    // handler to close the modal when the backdrop area is clicked
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    // handler for the "CONTINUE" button click.
    purchaseContinueHandler = () => {
        // change loading state, to trigger the spinner as soon as the button is clicked
        this.setState({loading: true});
        // store the order details
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Dan Staver',
                address: {
                    street: '444 SPRING ST',
                    city: 'LA MESA',
                    zip: '91941'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then( response => {
                // 
                this.setState({loading: false, purchasing: false}) // when done, stop showing spinner and close modal
            } )
            .catch( error => {
                // console.log(error)
                this.setState({loading: false, purchasing: false})
             } )
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

        // order summary to be the spinner while waiting for the request
        let orderSummary = this.state.loading ? <Spinner /> : 
            <OrderSummary 
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients} 
            price={this.state.totalPrice}/>;

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>  
                {orderSummary}
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

// wrap the container inside the withErrorHandler HOC and pass the axios object as well
// so that we can catch any errors
export default withErrorHandler(BurgerBuilder, axios);