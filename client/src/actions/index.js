import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  LOAD_MORE_PRODUCTS_START,
  LOAD_MORE_PRODUCTS_SUCCESS,
  LOAD_MORE_PRODUCTS_FAILURE,
  FETCH_PRODUCT_BY_ID_START,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCT_BY_ID_FAILURE,
  ADD_PRODUCT_TO_CART_START,
  ADD_PRODUCT_TO_CART_SUCCESS,
  ADD_PRODUCT_TO_CART_FAILURE,
  SEARCH_PRODUCT,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  REMOVE_PRODUCT_FROM_CART,
  PRODUCT_PAGE_STATE_NULL,
  EMPTY_CART
} from './types';
import { getRenderedProductsLength } from '../selectors';

// export const signup = ({ email, password }) => dispatch => {
// we are passing email and password as formProps
export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3090/signup',
      formProps
    );
    // console.log(response);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    // console.log(e);
    dispatch({ type: AUTH_ERROR, payload: 'email in use' });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3090/signin',
      formProps
    );
    // console.log(response);
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    // console.log(e);
    dispatch({ type: AUTH_ERROR, payload: 'invalid login credentials' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('cart');

  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const fetchProducts = () => async dispatch => {
  try {
    dispatch({ type: FETCH_PRODUCTS_START });

    const response = await axios.get('http://localhost:3090/products');
    console.log(response);

    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: err, error: true });
  }
};

export const setProductPageStateToNull = id => dispatch => {
  dispatch({
    type: PRODUCT_PAGE_STATE_NULL,
    payload: id
  });
};

export const fetchCategories = () => async dispatch => {
  try {
    dispatch({ type: FETCH_CATEGORIES_START });

    const response = await axios.get(`http://localhost:3090/categories`);
    console.log(response);

    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: err, error: true });
  }
};

export const loadMoreProducts = () => async (dispatch, getState) => {
  const offset = getRenderedProductsLength(getState());

  dispatch({ type: LOAD_MORE_PRODUCTS_START });

  try {
    const response = await axios.get('http://localhost:3090/products', {
      offset
    });
    dispatch({
      type: LOAD_MORE_PRODUCTS_SUCCESS,
      payload: response
    });
  } catch (err) {
    dispatch({
      type: LOAD_MORE_PRODUCTS_FAILURE,
      payload: err,
      error: true
    });
  }
};

export const fetchProductById = id => async dispatch => {
  dispatch({ type: FETCH_PRODUCT_BY_ID_START });

  try {
    const response = await axios.get(`http://localhost:3090/product/${id}`);
    console.log(response);
    dispatch({
      type: FETCH_PRODUCT_BY_ID_SUCCESS,
      payload: response
    });
  } catch (err) {
    dispatch({
      type: FETCH_PRODUCT_BY_ID_FAILURE,
      payload: err,
      error: true
    });
  }
};

export const addProductToCart = id => async dispatch => {
  dispatch({ type: ADD_PRODUCT_TO_CART_START });

  try {
    const response = await axios.get(`http://localhost:3090/addToCart/${id}`);

    console.log(response.data);
    dispatch({ type: ADD_PRODUCT_TO_CART_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: ADD_PRODUCT_TO_CART_FAILURE, payload: err, error: true });
  }
};

export const searchProduct = text => dispatch => {
  // console.log('search product called')
  dispatch({
    type: SEARCH_PRODUCT,
    payload: text
  });
};

export const removeProductFromCart = id => dispatch => {
  dispatch({
    type: REMOVE_PRODUCT_FROM_CART,
    payload: id
  });
};

export const emptyCart = () => dispatch => {
  dispatch({
    type: EMPTY_CART
  });
};

export const cartCheckout = products => () => {
  alert(JSON.stringify(products));
};
