const UserHelper = {

  /**
   * Get user's profile'
   * @param {Object} data object containing user's details
   * @returns {Object} return user's data
   */
  getUserProfile(data) {
    return {
      id: data.id,
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };
  },
  /**
   * Get user's profile'
   * @param {Object} data object containing user's details
   * @returns {Object} return user's data
   */
  userProfile(data) {
    return {
      id: data.id,
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      roleId: data.roleId,
      createAt: data.createdAt,
      updatedAt: data.updatedAt
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