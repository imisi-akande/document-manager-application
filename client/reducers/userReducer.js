import findIndex from 'lodash/findIndex';
import * as types from '../actions/ActionTypes';
import initialState from './initialState';


export default function userReducer(state = initialState.allUsers, action) {
  switch (action.type) {
    // case types.CREATE_USER:
    //   return [...state, Object.assign({}, action.user)];
    case types.LOAD_USER_SUCCESS:
      return action.users;
    case types.CREATE_USER_SUCCESS:
      return [...state, Object.assign({}, action.user)];

    // case types.UPDATE_USER_SUCCESS:
    //   return [...state(user => user.id !== action.user.id),
    //     Object.assign({}, action.user)];

    case types.UPDATE_USER_SUCCESS: {
       console.log(action.user, 'jaaaaaaaaa');
      const index =
        findIndex(state.users, { user: action.user.id });
        console.log(state.users, 'jaaaaaaaaa');
      const stateCopy = Object.assign({}, state);
      stateCopy.user[index] = action.user;
     
      return stateCopy;
    }
    case types.USER_SUCCESS:
      return action.user;
    default:
      return state;
  }
}
