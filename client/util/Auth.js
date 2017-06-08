const Auth = {
  validateAdmin(user) {
    return user.roleId === 1;
  },
  docAccess(user, doc) {
    return Auth.validateAdmin(user) ? true : user.userId === doc.authorId;
  }
};

export default Auth;
