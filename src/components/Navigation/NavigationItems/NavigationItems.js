import React from 'react';

import classes from './NavigationItems.module.css';

//Components
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        {!props.isAuthenticated
            ? null
            : <NavigationItem link='/orders'>Orders</NavigationItem>}
        {!props.isAuthenticated 
            ? <NavigationItem link='/auth'>Login</NavigationItem>
            : <NavigationItem link='/logout'>Logout</NavigationItem>}
    </ul>
);

export default NavigationItems;
