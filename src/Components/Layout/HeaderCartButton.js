import { useContext, useEffect, useState } from "react";

import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx; //This is to grab the 'items' property from the cartCtx, so it's a bit cleaner. That's all

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`; //This is about applying the animation from the associated CSS file, to the Cart button in the Header. To add multiple classes, this is the syntax. We are putting this into a 'const' in order to make it prettier in the 'return' call below.
  //**NOTE: Above, we are using the 'useState' of 'btnIsHighlighted' to decide if the animation (.bump) from the CSS file, should be applied to the button below. Otherwise, we use '' to indicated there is no class being assigned */

  useEffect(() => {
    if (items.length === 0) {
      return;
    } //If there are no more items in the cart, simply leave this 'useEffect' function

    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300); //Making a timer of 300ms, as the animation in the CSS file takes 300ms to finish. Therefore we cant to ensure the animation doesn't overlap itself. Also by setting 'setBtnIsHighlighted' to false, this makes it so the next button click after 300ms will proc the animation again

    return () => {
      clearTimeout(timer);
    }; //Clearing the timer.

  }, [items]); //Making this 'useEffect' to be dependant ONLY on any change of values to the items in the cart

  return (
    <button className={btnClasses} onClick={props.onClick}>
      {" "}
      {/*classes=imported above (name can be whatever). '.button' is the CSS class in the CSS file associated with 'HeaderCartButton.js'. ***The 'onClick' is calling a function passed from 'app.js', then 'header.js'. In 'header.js', we named the custom function 'onClick', therefore we are calling 'props.onClick'. This is resulting in the 'showCartHandler' function in 'App.js' being called, which results in the state of 'setCartIsShown' being set to 'true'. Therefore, showing the 'Cart' modal. */}
      <span className={classes.icon}>
        {" "}
        {/*Same with above */}
        <CartIcon />{" "}
        {/*Custom file given by Udemy. Just import of a SVG image file */}
      </span>
      <span className={classes.cartButtonText}>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
