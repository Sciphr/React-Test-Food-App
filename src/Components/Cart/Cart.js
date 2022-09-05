import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`; //Syntax to ensure 2 decimal places, and with $ at the front.
  const hasItems = cartCtx.items.length > 0; //Used to check if there are actually items in the Cart

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = (props) => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-33f1d-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>{" "}
      {/* Through 'props' from the 'App.js' file, we are setting the 'onClick' property of this html button tag, to trigger the 'onClose' custom named function from 'App.js' to run. The function being passed through props here is the 'hideCartHandler', which sets the state of 'cartIsShown' to 'false' in 'App.js', resulting in the 'Cart' not rendering anymore. Essentially, making the close button do it's job.  */}
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}{" "}
      {/*Will only render the 'Order' button, if there are items in the Cart */}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}{" "}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending Order Data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}{" "}
      {/* This 'Modal' component is the overall 'Cart' window. Everything in between the 'Modal' tags is childen of it. We are setting a property of the 'Modal', custom called 'onClose', to run the function being passed through props from 'App.js' also custom called 'onClose'. This is referencing the 'hideCartHandler' function in 'App.js' which will close the cart. The purpose of this call, as opposed to the one below on the 'close' button, is to close the cart when clicking on the backdrop of the modal (or, the background of the Cart window) */}
    </Modal>
  );
};

export default Cart;
