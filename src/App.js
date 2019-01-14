import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//Components
import ayncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions';

// Lazy loading
const asyncCheckout = ayncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = ayncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = ayncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
       <Route path="/" exact component={BurgerBuilder}/> 
       <Route path="/auth" component={asyncAuth}/> 
       <Redirect to="/" />
      </Switch>
    );
    
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder}/>  
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/logout" component={Logout}/> 
          <Route path="/auth" component={asyncAuth}/>  
          <Redirect to="/" /> 
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const maptDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, maptDispatchToProps)(App));
