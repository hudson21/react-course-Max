import React from 'react';
import {withRouter} from 'react-router-dom';

import classes from './Burger.module.css';

//Components
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    //It extracts the keys of the object, to convert in an array of keys
    let transformedIngredients = Object.keys(props.ingredients)
          .map(igKey =>{
              return [...Array(props.ingredients[igKey])].map((_, i)=>(
                  <BurgerIngredient key={igKey + i} type={igKey} />
              )) //[,]
          })
          .reduce((previous,current)=>{
              return previous.concat(current)
          }, []);
    if(transformedIngredients.length === 0 ){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default withRouter(Burger);
