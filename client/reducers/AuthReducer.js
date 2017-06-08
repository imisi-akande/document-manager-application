import * as types from '../actions/ActionTypes';
import initialState from './InitialState';


/**
 *
 * @param {any} [state=initialState.user]
 * @param {any} action object
 * @returns
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
