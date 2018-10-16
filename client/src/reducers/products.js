import * as R from 'ramda';

import {
  FETCH_PRODUCTS_SUCCESS,
  LOAD_MORE_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_BY_ID_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, { type, payload }) {
  console.log(payload);
  switch (type) {
    case FETCH_PRODUCTS_SUCCESS:
      const newValues = R.indexBy(R.prop('_id'), payload);
      console.log(newValues);
      return R.merge(state, newValues);
    case LOAD_MORE_PRODUCTS_SUCCESS:
      const moreValues = R.indexBy(R.prop('_id'), payload);
      return R.merge(state, moreValues);
    case FETCH_PRODUCT_BY_ID_SUCCESS:
      return R.assoc(payload.id, payload, state);
    default:
      return state;
  }
}
