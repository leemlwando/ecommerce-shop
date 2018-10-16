import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form'
import auth from './auth';
import products from './products'
import productsPage from './productsPage'
import productPage from './productPage'
import categories from './categories'
import cart from './cart'

export default combineReducers({
  form: formReducer,
  auth,
  cart,
  products,
  productsPage,
  productPage,
  categories
});
