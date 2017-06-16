const DocumentHelper = {
  /**
   * Helper method for getDocument
   *
   * @param {Object} value document response from the database
   * Get documents's attributes'
   * @returns {Object} return user's attributes
   */
  getDocument(value) {
    return {
      id: value.userId,
      title: value.title,
      content: value.content,
      access: value.access,
      authorId: value.authorId,
      createdAt: value.createdAt,
      updatedAt: value.updatedAt
    };
  },
  /**
   * Document access
   *
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
