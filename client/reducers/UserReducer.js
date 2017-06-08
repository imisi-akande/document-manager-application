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

    case types.UPDATE_USER_SUCCESS:
      {
        const allUsers = state.users.rows
          .filter(user => user.id !== action.user.id);
        allUsers.push(action.user);
        return Object.assign({}, state, {
          users: {
            rows: allUsers
          }
        });
      }
    case types.USER_SUCCESS:
      return action.user;
    default:
      return state;
  }
}
