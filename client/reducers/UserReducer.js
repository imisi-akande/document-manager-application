import * as types from '../actions/ActionTypes';
import initialState from './initialState';

const UserReducer = (state = [], action) => {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
      return Object.assign({}, state, action.user);
    case types.USER_SUCCESS:
      return Object.assign({}, state, action.users);
    case types.LOAD_USER_SUCCESS:
      return {};
    case types.FETCH_PROFILE: {
      const newState = [...state, action.user];
      return newState;
    }
    case types.CURRENT_USER:
      return action.user;
    default:
      return state;
  }
};

export default UserReducer;
