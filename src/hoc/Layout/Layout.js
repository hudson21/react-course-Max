import React, {Component} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


//hoc
import Aux from '../Auxiliar/Auxiliar';

class Layout extends Component {
    state={
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerOpenedHandler = () => {
        this.setState((prevState) =>{ 
         return {showSideDrawer: !prevState.showSideDrawer}
    })}

    render(){
        return (
            <Aux>
                <Toolbar drawerToggleOpen={this.sideDrawerOpenedHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
            
        );
    }
}

export default Layout;
