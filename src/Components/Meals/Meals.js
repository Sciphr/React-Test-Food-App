import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';
import { Fragment } from 'react';

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary /> {/*Made this component to simply represent a text block to describe the restaurant. We did this separately, in order to make this look cleaner. This is then imported into the 'App.js' */}
      <AvailableMeals /> {/*Same with above, but this component has hardcoded info on each meal option we have */}
    </Fragment>
  );
};

export default Meals;