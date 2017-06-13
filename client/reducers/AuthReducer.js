import * as types from '../actions/ActionTypes';
import initialState from './InitialState';


/**
 *
 * @param {object} [state=initialState.user]
 * @param {object} action object
 * @returns{object} object
 */
export default function AuthReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return [...state,
        { ...action.user }
      ];
    default:
      return state;
  }
}
