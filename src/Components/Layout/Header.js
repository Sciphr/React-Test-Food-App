import React, { Fragment } from 'react';
import classes from './Header.module.css'; //As usual, for CSS modules, 'classes' is whatever we want to call it. Just making up a name as a reference when needing to point to it

import mealsImage from '../../assets/meals.jpg'; //'mealsImage' is simply a name we can assign to the image. Whatever we want it to be. We are doing this to make it 'dynamic' rather than static direct link as the 'src' to the 'img' tag.

import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <Fragment>
      {/*'classes', referring to what we made up in the import statement. '.header' is the name of the class used in the CSS module file. Refer to the CSS file for confirmation */}
      <header className={classes.header}>
        <h1 className={classes.headerText}>Meal Prep App!</h1>
        {/* <button>Cart</button>. This is replaced with below. A component created to represent the Cart button */}
        <HeaderCartButton onClick={props.onShowCart} />{' '}
        {/*'onClick' is a custom name for a custom component, NOT the html 'onClick' internal property. The name of the function being passed FROM 'app.js' is called 'onShowCart' (which is custom named by me), so we call through props, that function. */}
      </header>
      {/*Same as with the 'header' tag. Square brackets are used as different syntax purely because there is a dash in the name of the class in the CSS file */}
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="Lovely table of food" />
      </div>
    </Fragment>
  );
};

export default Header;
