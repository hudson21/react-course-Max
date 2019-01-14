import React, {Component} from 'react';

//Components
import Aux from '../../../hoc/Auxiliar/Auxiliar';
import Button from '../../UI/Button/Button';

class OderSummary extends Component{
    //This could be a functional component, it does not have to be a class
    componentWillUpdate(){
        //console.log('componentWillUpdate');
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
          .map(igKey=> (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
          ));
 
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong> </p>
            <p>Continue to Checkout?</p>
            <Button clicked={this.props.purchaseCanceled} btnType="Danger">CANCEL</Button>
            <Button clicked={this.props.purchaseContinued} btnType="Success">CONTINUE</Button>
        </Aux>
    );
    }
    
}

export default OderSummary;
