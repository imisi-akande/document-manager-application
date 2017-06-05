import { SEARCH_RESULTS } from '../actions/Types';

const initialState = {
  results: [],
  pagination: {},
  user_results: null,
};


/**
 * search - description
 *
 * @param  {type} state = initialState description
 * @param  {type} action               description
 * @return {type}                      description
 */
export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_RESULTS:
      return Object.assign({},
        state, { results: action.payload,
          pagination: action.payload.pagination });
    default: return Object.assign({}, state);
  }
}
