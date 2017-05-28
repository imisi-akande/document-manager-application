import findIndex from 'lodash/findIndex';
import * as types from '../actions/ActionTypes';
import initialState from './InitialState';


const roleReducer = (state = initialState.roles, action) => {
  switch (action.type) {
    case types.CREATE_ROLE:
      return [...state, Object.assign({}, action.role)];
    case types.LOAD_ROLE_SUCCESS:
      return action.roles;
    case types.CREATE_ROLE_SUCCESS:
      return [...state, Object.assign({}, action.role)];
    case types.UPDATE_ROLE_SUCCESS:
      return [...state.filter(role => role.id !== action.role.id),
        Object.assign({}, action.role)];
    case types.DELETE_ROLE_SUCCESS: {

      const index =
        findIndex(state, { id: action.id });
      const stateCopy = [...state];
      stateCopy.splice(index, 1);
      return stateCopy;
    }
    default:
      return state;
  }
};

export default roleReducer;
