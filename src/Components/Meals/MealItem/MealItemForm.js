import { useRef, useState } from "react";

import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount; //Converts string to a number value

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {/*Just like with the 'Card.js', we created a resuable component for the input field called 'Input.js'. This is so we can reuse this Input field, with whatever custom properties we want at any time. Refer to the 'Input.js' file for more detail. Here, we are passing 'id' as a custom property we created in 'Input.js', and all the others are HTML default properties for an 'input' field. 'label' and 'input' are actually custom 'props' we are creating too. Again, refer to the 'Input.js' file for context */}
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1 - 5).</p>}
    </form>
  );
};

export default MealItemForm;
