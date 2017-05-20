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
  /**
    * Delete document by id
    * Route: DELETE: /documents/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  deleteDocument(req, res) {
    req.docInstance.destroy()
      .then(() => res.status(200)
         .send({
           message: 'This document has been deleted successfully'
         })
      );
  },
/**
    * Update document by id
    * Route: PUT: /documents/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  updateDocuments(req, res) {
    req.docInstance.update(req.body)
      .then((updatedDocument) => {
        res.status(200).send({
          message: 'This document has been updated successfully',
          updatedDocument
        });
      })
      .catch(error => res.status(500).send(error.errors));
  },
  
};

export default DocumentController;
