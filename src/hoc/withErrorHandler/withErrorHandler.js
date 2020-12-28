import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliar/Auxiliar';


const withErrorHandler = ( WrappedComponent, axios ) => {
  return class extends Component {
    // save the error data in the state. initially 'null'
    state = {
      error: null
    }

    componentDidMount() {
      // when sending a new request, reset error state
      this.reqInterceptor = axios.interceptors.request.use( req => {
        this.setState({error: null});
        return req;
      });

      // if receiving an error from the request, save the error data to the state
      this.resInterceptor = axios.interceptors.response.use( res => res, error => {
        this.setState({error: error});
      });
    }

    // remove the interceptors when component is unmounted
    // componentWillUnmount() {
    //   axios.interceptors.request.eject(this.reqInterceptor);
    //   axios.interceptors.respone.eject(this.resInterceptor);
    // }

    // handler for the modal to dissapear when backdrop clicked
    errorConfirmedHandler() {
      this.setState({error: null});
    }

    render() {
      return (
        <Aux>
          <Modal 
            // show modal with error only if any errors were returned from request
            show={this.state.error} 
            modalClosed={this.errorConfirmedHandler}>
            {/* show message only if error state not null, otherwise will throw an exception */}
            {this.state.error ? this.state.error.message : null} 
          </Modal>
          {/* render the component that was wrapped by this handler and pass the original props */}
          <WrappedComponent {...this.props}/>
        </Aux>

      )}
  }
};

export default withErrorHandler;