import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export default class contactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street Name'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-mail'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: ''
                },
        },
        loading: false
    }

    orderHandler = (event) => {
        // Prevent the page from being reloaded after hitting the form button
        event.preventDefault();
        // change loading state, to trigger the spinner as soon as the button is clicked
        this.setState({loading: true});
        // create a new object where we store the input type and value to be submitted to firebase
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        // store the order details
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    // handler for the form input change
    inputChangedHandler = (event, identifier) => {
        // create a copy of order state
        const updatedForm = {...this.state.orderForm};
        // because we have objects inside objects, when we use spread, the copy of the object is shallow
        // this means we have to spread the object inside the object if we want to make any changes to the object inside the object
        const updatedElement = {...updatedForm[identifier]};
        // saving the value from the input
        updatedElement.value = event.target.value;
        // save the 1st level object with the updated 2nd level object
        updatedForm[identifier] = updatedElement;
        this.setState({orderForm: updatedForm});
    }

    render() {
        // create a new array to store all the form object properties so that we can loop through them
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        // if loading state true, display the spinner, otherwise display the actual form
        let form = this.state.loading ? <Spinner /> : 
        <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
            ))}

            <Button btnType="Success">Order</Button>
        </form>
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}
