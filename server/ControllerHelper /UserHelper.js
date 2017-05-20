const UserHelper = {
  /**
   * validate
   * Checks request parameters to ensure they are valid
   * @param {Object} request object
   * @returns {Object} promise
   */
  validate(body) {
    return (
      body &&
      body.userName &&
      body.firstName &&
      body.lastName &&
      body.email &&
      body.password
    );
  },
  userInfo(user) {
    const profile = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      roleId: user.roleId,
      createdAt: user.createdAt
    };
    return profile;
  },
};

export default UserHelper;

