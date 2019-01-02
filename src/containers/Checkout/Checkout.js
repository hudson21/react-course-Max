import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//Components
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        console.log(this.props);
        //Extract the params from the URL
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        for (let param of query.entries()) {
            //['salad', '1']
            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredients[param[0]] = +param[1];
            }
            
        }
        this.setState({ingredients, totalPrice: price});
    }

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
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>
                  {/*------------Nested Route here------------------*/}
                <Route path={`${this.props.match.url}/contact-data`} 
                       render={() => (<ContactData ingredients={this.state.ingredients}
                                                   price={this.state.totalPrice}/>)}/> 
            </div>
        );
    }
}

export default Checkout;