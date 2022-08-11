import PropTypes from 'prop-types';

const typeOfIngredient = PropTypes.oneOf(['bun', 'sauce', 'main']);

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: typeOfIngredient,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired
});

const orderPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
});

export {ingredientPropTypes, orderPropTypes}
