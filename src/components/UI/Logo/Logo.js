import React from 'react';
import classes from './Logo.module.css';

import burgerLogo from '../../../assets/images/132 burger-logo.png';

const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="MyBurger"/>
        </div>
    );
}

export default Logo;

