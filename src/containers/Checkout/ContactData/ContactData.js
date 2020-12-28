import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

export default class contactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        // Prevent the page from being reloaded after hitting the form button
        event.preventDefault();
        // change loading state, to trigger the spinner as soon as the button is clicked
        this.setState({loading: true});
        // store the order details
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Diana Staver',
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
                this.setState({loading: false});
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState({loading: false});
             } )
    }

    render() {
        let form = this.state.loading ? <Spinner /> : 
        <form>
            <input type="text" name="name" placeholder="Your name" />
            <input type="email" name="email" placeholder="Your email" />
            <input type="text" name="street" placeholder="Street Address" />
            <input type="text" name="postal" placeholder="Postal Code" />
            <Button 
                btnType="Success"
                clicked={this.orderHandler}>Order</Button>
        </form>
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}
