import { SET_CURRENT_USER } from './ActionTypes';

/**
 * Display current user status
 *
 * @param  {object} user user details to be saved
 * @return {object}      user details
 */
const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export default setCurrentUser;
