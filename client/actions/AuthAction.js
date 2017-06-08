import { SET_CURRENT_USER } from './ActionTypes';

const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export default setCurrentUser;
