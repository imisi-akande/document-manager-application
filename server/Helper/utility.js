/**
  * Controller's' helper
  */
const Helper = {

  /**
   * Get user's profile'
   * @param {Object} value object containing user's details
   * @returns {Object} return user's value
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
   * Check for document's owner
   * @param {Object} doc object
   * @param {Object} req request object
   * @returns {Boolean} true or false
   */
  isOwnerDoc(doc, req) {
    return doc.authorId === req.decoded.userId;
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

  /**
   * Query for search terms
   * @param {Array} terms array of search terms
   * @returns {Object} return user's value
   */
  likeSearch(searchTerm) {
    const like = {
      $or:
      [
        { title: { $iLike: searchTerm } },
        { content: { $iLike: searchTerm } }
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
