import { useContext } from 'react';

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  //We are passing the 'map' of meal items from 'AvailableMeals.js'. This is being passed as an 'object' through 'props'. The price is being sent as just a number, but to display, we need to add a '$'. Instead of hardcoding this in the JSX code, we make it prettier by making a variable above the 'return' statement that does the conversion for us. Syntax below is how to do this. The '.toFixed(2)' is the way to ensure 2 decimal places are ALWAYS shown
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
