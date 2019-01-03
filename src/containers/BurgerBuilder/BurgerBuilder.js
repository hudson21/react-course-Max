import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

//Components
import Aux from '../../hoc/Auxiliar/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import OderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    
    state ={
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        /*
            axios.get('https://burger-builder-react-b39ed.firebaseio.com/ingredients.json')
             .then(response => {
                this.setState({ingredients: response.data});
             })
             .catch(error => {
                 this.setState({error: true})
             });
        */
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
              .map(igKey => {
                return ingredients[igKey]
              })
              .reduce((previous, current) =>{
                  return previous + current;
              },0);
        this.setState({
            purchaseable: sum > 0 
        });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients){
         queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`);
        }
        queryParams.push(`price=${this.state.totalPrice}`);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString
        });
        
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
            //{salad: true, meat: false, ...}
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can´t be loaded!</p> : <Spinner />;

        if(this.props.ings){
            burger = (<Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}/>
              </Aux>);

            orderSummary = <OrderSummary 
                             price={this.state.totalPrice}
                             ingredients={this.props.ings}
                             purchaseCanceled={this.purchaseCancelHandler}
                             purchaseContinued={this.purchaseContinueHandler}/>
        }
        
        if(this.state.loading){
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ings: state.ingredients
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}) 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));