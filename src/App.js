import { useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}/>} {/* This is syntax for: if 'cartIsShown' is set to 'True', then the 'Cart' component will be rendered. Since by default it is 'False', it won't render when the app is loaded initially. ALSO, we are setting a custom property to be passed through props TO the 'Cart.js' file called 'onClose'. This will call the function in 'App.js' called 'hideCartHandler' which sets the state of 'cartIsShown' to 'false', resulting in the 'Cart' component to not render anymore.  MORE DETAILS BELOW */}
      <Header onShowCart={showCartHandler} /> {/*'onShowCart' is a custom name for a custom component. **We want the 'cartIsShown' when set to true, to be applicable ONLY when the user presses the Cart button. This, is done in the 'HeaderCartButton.js' file. So we have to send the 'useState' of 'cartIsShown' all the way to the 'HeaderCartButton.js' file. We are bringing it there, so that 'cartIsShown' will be set to 'true' ONLY when that button is pressed. And since the button is in that file, that is where it must be initialized. Through props, that will be sent all the way back to THIS file 'app.js' to then be rendered. ***THIS COULD BE DONE THROUGH CONTEXT, BUT PROPS IS FINE FOR SIMPLE PASSING OF INFO/FUNCTIONS****/}
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
