import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then( res => {
                const ordersFetched = [];
                // iterate over the response we get, and save the data in an array by using the spread method
                // save the order id as well
                for (let key in res.data) {
                    ordersFetched.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders: ordersFetched});
            })
            .catch( err => {
                this.setState({loading: false});
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map( order => (
                    <Order 
                        key={order.id}
                        price={order.price}
                        ingredients={order.ingredients} />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);