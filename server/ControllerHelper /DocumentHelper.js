const DocumentHelper = {
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
      ]
    };
    return access;
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

};
export default DocumentHelper;
