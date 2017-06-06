const RoleHelper = {


/**
   * Check for document's role permission
   * @param {Object} doc object
   * @param {Object} req request object
   * @returns {Boolean} true or false
   */
  hasRoleAccess(doc, req) {
    return (doc.access === 'role'
      && doc.roleId === req.decoded.roleId);
  },
};
export default RoleHelper;
