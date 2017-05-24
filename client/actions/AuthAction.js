const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    user
  };
};

export default setCurrentUser;
