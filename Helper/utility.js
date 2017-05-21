import db from '../models';
/**
  * Controller's' helper
  */
const Helper = {

  /**
   * Get user's profile'
   * @param {Object} data object containing user's details
   * @returns {Object} return user's data
   */
  /**
   * Check for admin permission
   * @param {String} roleId user role id
   * @returns {Boolean} true or false
   */
  isAdmin(roleId) {
    return roleId === 1;
  },
  /**
   * Check for regular permission
   * @param {String} roleId user role id
   * @returns {Boolean} true or false
   */
  isRegular(roleId) {
    return roleId === 2;
  },
  /**
   * Check for owner
   * @param {Object} req request object
   * @returns {Boolean} true or false
   */
  isOwner(req) {
    return String(req.decoded.userId) === String(req.params.id);
  },
  /**
   * Check if document's access level is public
   * @param {Object} doc object
   * @returns {Boolean} true or false
   */
  isPublic(doc) {
    return doc.access === 'public';
  },
  /**
   * @param {Object} data document response from the database
   * Get documents's attributes'
   * @returns {Object} return user's attributes
   */
  getDocument(data) {
    return {
      id: data.userId,
      title: data.title,
      content: data.content,
      access: data.access,
      authorId: data.authorId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
  },
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
   * Check for document's role permission
   * @param {Object} doc object
   * @param {Object} req request object
   * @returns {Boolean} true or false
   */
  hasRoleAccess(doc, req) {
    return (doc.access === 'role'
      && doc.roleId === req.decoded.roleId);
  },
  /**
   * Query for document's access
   * @param {Object} req request object
   * @returns {Object} return access query
   */
  documentAccess(req) {
    const access = {
      $or:
      [
        { access: 'public' },
        { authorId: req.decoded.userId },
        // {
        //   $and: [
        //     { access: 'role' },
        //     { roleId: req.decoded.roleId }
        //   ]
        // }
      ]
    };
    return access;
  },


  /**
   * Check for document's owner
   * @param {Object} doc object
   * @param {Object} req request object
   * @returns {Boolean} true or false
   */
  isOwnerDoc(doc, req) {
    return doc.authorId === req.decoded.userId;
  },
  // /**
  //  * Get user's profile'
  //  * @param {Object} data object containing user's details
  //  * @returns {Object} return user's data
  //  */
  // getUserProfile(data) {
  //   return {
  //     id: data.id,
  //     username: data.username,
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     email: data.email,
  //   };
  // },
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
   * Pagination
   * @param {Object} condition pagination condition
   * @returns {Object} return an object
   */
  pagination(condition) {
    const next = Math.ceil(condition.count / condition.limit);
    const currentPage = Math.floor((condition.offset / condition.limit) + 1);
    const pageSize = condition.limit > condition.count
      ? condition.count : condition.limit;
    return {
      page_count: next,
      page: currentPage,
      page_size: Number(pageSize),
      total_count: condition.count
    };
  },
  getDocumentAttribute() {
    return [
      'id',
      'title',
      'content',
      'access',
      'authorId',
      'createdAt',
      'updatedAt'
    ];
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
  /**
   * Query for search terms
   * @param {Array} terms array of search terms
   * @returns {Object} return user's data
   */
  likeSearch(terms) {
    const like = {
      $or:
      [
        { title: { $iLike: { $any: terms } } },
        { content: { $iLike: { $any: terms } } }
      ]
    };
    return like;
  },
  /**
   * Get errors
   * @param {Array} error client side errors
   * @returns {Array} return user's attributes
   */
  errorArray(error) {
    const errorArray = [];
    if (error.errors) {
      error.errors.forEach((err) => {
        errorArray.push({ path: err.path, message: err.message });
      });
    }
    return errorArray;
  },
};


export default Helper;
