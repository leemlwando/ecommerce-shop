import * as R from 'ramda';

import {
  FETCH_PRODUCT_BY_ID_SUCCESS,
  PRODUCT_PAGE_STATE_NULL
} from '../actions/types';

const initialState = {
  id: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCT_BY_ID_SUCCESS:
      return R.merge(state, {
        id: R.prop('_id', payload.data)
      });
    case PRODUCT_PAGE_STATE_NULL:
      return R.without(R.of(payload), state);
    default:
      return state;
  }
};
