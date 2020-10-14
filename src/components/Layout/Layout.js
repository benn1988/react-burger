import React, { Component} from 'react';

import Aux from '../../hoc/Auxiliar/Auxiliar';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Backdrop from '../UI/Backdrop/Backdrop';


class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    hideSideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    }

    openSideDrawerHandler = () => {
        this.setState({showSideDrawer: true})
    }

    render() {
        return (
        <Aux>
            <Backdrop show={this.state.showSideDrawer} clicked={this.hideSideDrawerHandler} />
            <Toolbar clicked={this.openSideDrawerHandler}/>
            <SideDrawer show={this.state.showSideDrawer} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
}

export default Layout;