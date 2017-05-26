import { SEARCH_RESULTS } from '../actions/types';

const initialState = {
  results: [],
  user_results: null,
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH_RESULTS:
      return Object.assign({}, state, { results: action.payload });
    default: return Object.assign({}, state);
  }
}
