import db from '../models';
import Helper from '../Helper/utility';

const DocumentController = {
  /**
   * create - create a new Document
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {Object} res Response object
   */

  createDocument(req, res) {
    req.body.authorId = req.decoded.userId;
    return db.Documents.create(
        req.body
      )
      .then(document => res.status(201).send(document))
      .catch(error => res.status(400).send(error));
  },
};

export default DocumentController;
