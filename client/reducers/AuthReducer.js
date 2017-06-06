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
    // case types.CREATE_USER:
    //   return [...state, Object.assign({}, action.user)];
    case types.SET_CURRENT_USER:
      return [...state,
        Object.assign({}, action.user)
      ];
    default:
      return state;
  }
}