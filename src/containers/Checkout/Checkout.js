import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

//Components
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
   
    checkoutCancelled = () => {
        this.props.history.goBack();//This goes back to the last page
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>
                  {/*------------Nested Route here------------------*/}
                <Route path={`${this.props.match.url}/contact-data`} 
                       component={ContactData}/> 
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);