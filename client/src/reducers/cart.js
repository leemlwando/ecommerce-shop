import * as R from 'ramda';

import {
  ADD_PRODUCT_TO_CART_SUCCESS,
  REMOVE_PRODUCT_FROM_CART,
  EMPTY_CART
} from '../actions/types';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  console.log(payload, 'payload -----------------');
  switch (type) {
    case ADD_PRODUCT_TO_CART_SUCCESS:
      let result = R.append(payload, state);
      console.log(result);
      return result;
    case REMOVE_PRODUCT_FROM_CART:
      return R.without(R.of(payload), state);
    case EMPTY_CART:
      return [];
    default:
      return state;
  }
};
