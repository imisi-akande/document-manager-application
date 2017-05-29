import findIndex from 'lodash/findIndex';
import * as types from '../actions/ActionTypes';
import initialState from './InitialState';


export default function userReducer(state = initialState.allUsers, action) {
  switch (action.type) {
    // case types.CREATE_USER:
    //   return [...state, Object.assign({}, action.user)];
    case types.LOAD_USER_SUCCESS:
      return action.users;
    case types.CREATE_USER_SUCCESS:
      return [...state, Object.assign({}, action.user)];

    case types.UPDATE_USER_SUCCESS: {
      const index =
        findIndex(state.users.rows, { id: action.user.id });
      const stateCopy = Object.assign({}, state);
      stateCopy.users.rows[index] = action.user;
      return stateCopy;
    }
    case types.USER_SUCCESS:
      return action.user;
    default:
      return state;
  }
}
