import classes from './Card.module.css';


//This 'Card.js' file is being used as a 'wrapper'. This will be used to wrap each meal item, using the same type of CSS styling for each one. Hence, why a 'wrapper' component is so useful, as it can simply be copy/pasted for each item
const Card = (props) => {
  return (
    <div className={classes.card}>
      {props.children}
    </div>
  );
};

export default Card;