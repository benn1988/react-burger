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
        ingredients: null, // ingredients null until they are fetched from the server
        totalPrice: 4, // starting burger price, with all the other ingredient's prices being added on top
        purchasing: false, // clicked the Order Now button, to show the order details?
        loading: false // waiting for the request to the server
    }

    // get request for ingredients
    componentDidMount() {
        axios.get('/ingredients.json')
            .then( response => {
                this.setState({ingredients: response.data}) // save the ingredients from the server into the state
            })
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
        
        // output order summary if ingredients were fetched and its not loading a new request after hitting the 'Continue' button
        let orderSummary = this.state.ingredients ? 
            // if loading, render the spinner
            (this.state.loading ? <Spinner /> : 
                <OrderSummary 
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients} 
                    price={this.state.totalPrice}/>) 
            // if no ingredients, dont render anything, so that it doesnt throw an exception
            : null;

        // wait until the ingredients were fetched from the server to render the burger and burger builder
        let burger = this.state.ingredients ? (
            // if ingredients are not null (already fetched from server), output the burger and controls
            <Aux>
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
        // otherwise render the spinner while it waits for the response from the server
        ) : <Spinner />

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>  
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

// wrap the container inside the withErrorHandler HOC and pass the axios object as well
// so that we can catch any errors
export default withErrorHandler(BurgerBuilder, axios);