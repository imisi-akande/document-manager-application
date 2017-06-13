import * as types from '../actions/ActionTypes';
import initialState from './InitialState';


/**
 *user reducer
 *
 * @export
 * @param {object} [state=initialState.allUsers]
 * @param {object} action
 * @returns {object} object
 */
export default function userReducer(state = initialState.allUsers, action) {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
      return action.users;
    case types.CREATE_USER_SUCCESS:
      return [...state, ...action.user];

    case types.UPDATE_USER_SUCCESS:
      {
        const allUsers = state.users.rows
          .filter(user => user.id !== action.user.id);
        allUsers.push(action.user);

        return {
          ...state,
          users: {
            ...state.users,
            rows: allUsers
          }
        };
      }
    case types.USER_SUCCESS:
      return action.user;
    default:
      return state;
  }
}
