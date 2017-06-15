const UserHelper = {

  /**
   * Get user's profile'
   * @param {Object} value object containing user's details
   * @returns {Object} return user's value
   */
  getUserProfile(value) {
    return {
      id: value.id,
      userName: value.userName,
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
    };
  },
  /**
   * Get user's profile'
   * @param {Object} value object containing user's details
   * @returns {Object} return user's value
   */
  userProfile(value) {
    return {
      id: value.id,
      userName: value.userName,
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      roleId: value.roleId,
      createAt: value.createdAt,
      updatedAt: value.updatedAt
    };
  },
  /**
   * Get user's attributes'
   * @returns {Array} return user's attributes
   */
  getUserAttribute() {
    return [
      'id',
      'userName',
      'firstName',
      'lastName',
      'email',
      'roleId',
      'createdAt',
    ];
  },
};

export default UserHelper;