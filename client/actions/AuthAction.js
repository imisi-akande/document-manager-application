import { SET_CURRENT_USER } from './ActionTypes';


const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  };
};

export default setCurrentUser;
