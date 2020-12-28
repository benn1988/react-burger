import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export default class Checkout extends Component {
    state={
        ingredients: {
            bacon: 0,
            salad: 0,
            cheese: 0,
            meat: 0
        },
        price: 0
    }

    componentDidMount() {
        // Use the URLSearchParams interface to work with the query string of our URL.
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        // Use the entries method to iterate through all key/value pairs contained
        for (let param of query.entries()) {
            // If the key is the price, we update the state
            if (param[0] === 'price') {
                this.setState({price: param[1]})
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        // Update the state with the ingredients received from URL queries
        this.setState({ingredients: ingredients})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCancelled={this.checkoutCancelledHandler} />
                {/* Nested routing. We use the render method to pass props to the rendered component */}
                <Route 
                    path={this.props.match.url + '/contact-data'}
                    render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>} />
            </div>
        )
    }
}
