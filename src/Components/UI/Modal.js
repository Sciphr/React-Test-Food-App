import classes from "./Modal.module.css";
import { Fragment } from "react";
import ReactDOM from 'react-dom';

// This function is simply taking care of the BACKGROUND of the Cart menu/modal that will pop up
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>; /* Through 'props' from the 'Cart' component, and before that, the 'App' component, we are bringing the 'onClose' custon named function which will result in the whole 'Cart' not rendering in the App.js file, essentially closing it. We do this here on the backdrop, so that the user can click on the background of this Modal in order to close the cart, instead of clicking the 'close' button in 'Cart.js'.  */
};

// This function represents the box/cart/modal that will pop up. This has it's own styling, along with the 'props.children' because this is going to fill the Modal with everything that is in between the <Modal> tags in the 'Cart.js' file.
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

//We are using 'PORTALS' to place this Modal. To do this, we added a new '<div>' with the ID of 'overlay', in the 'index.html' file in the Public folder, right above the 'root' div where 'App.js' is rendered. This is so we can point this overlay to a specific ID in the HTML file, for the purpose of separating the Modal from the rest of the app.
//This constant 'portalElement', is just a way to make the 'return' statement below, a little cleaner by making sure we don't have to type 'document.getElementById('overlays')' twice. 
const portalElement = document.getElementById('overlays');

//MODAL is the naming convention for a wrapper that will be an 'overlay'. So, a pop-out sort of window that will take over the screen. In this case, it will be used to wrap 'Your Cart' of the users meal items
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)} {/* The 'backdrop' function is being called here, therefore we have to pass the function from 'props' from 'Cart.js' and 'App.js', to the 'Backdrop' function being called in this same file.  */}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
