import db from '../models';
import Helper from '../Helper/utility';
import DocumentHelper from '../ControllerHelper /DocumentHelper';

const DocumentController = {
 /**
  * create - create a new Document
  * Route: POST: /documents
  *
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
   * Get all document
   * Route: GET: /documents/
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void} response object or void
   */
  listAllDocuments(req, res) {
    req.dmsFilter.attributes = DocumentHelper.getDocumentAttribute();
    db.Documents
      .findAndCountAll(req.dmsFilter)
      .then((documents) => {
        const condition = {
          count: documents.count,
          limit: req.dmsFilter.limit,
          offset: req.dmsFilter.offset
        };
        delete documents.count;
        const pagination = Helper.pagination(condition);
        res.status(200)
          .send({
            message: 'You have successfully retrieved all documents',
            documents,
            pagination
          });
      });
  },

  /**
   * Get document by ID
   * Route: GET: /documents/:id
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} response object or void
   */
  getDocument(req, res) {
    const document = DocumentHelper.getDocument(req.singleDocument);
    return res.status(200)
      .send({
        message: 'You have successfully retrieved this document',
        document
      });
  },

  /**
   * Delete document by id
   * Route: DELETE: /documents/:id
   *
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
   *
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

  /**
   * List all documents
   * Route: GET: /documenta/
   * 
   * @param {any} req 
   * @param {any} res 
   */
  listMyDocuments(req, res) {
    db.Documents.findAll({
      where: {
        authorId: req.params.userId
      }
    })
      .then(docs => res.status(200).send(docs));
  },

  /**
   * Search document
   * Route: GET: /search?query={}
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} response object or void
   */
  searchDocuments(req, res) {
    req.dmsFilter.attributes = DocumentHelper.getDocumentAttribute();
    db.Documents
      .findAndCountAll(req.dmsFilter)
      .then((documents) => {
        const condition = {
          count: documents.count,
          limit: req.dmsFilter.limit,
          offset: req.dmsFilter.offset
        };
        delete documents.count;
        const pagination = Helper.pagination(condition);
        res.status(200)
          .send({
            message: 'The search was successful',
            documents,
            pagination
          });
      });
  },

  /**
   *Search user's documents
   *Route: GET: /search?query={}
   *
   * @returns {Object}object
   * @param {any} req
   * @param {any} res
   */
  searchUserDocuments(req, res) {
    req.dmsFilter.attributes = DocumentHelper.getDocumentAttribute();
    const userDocuments = {};
    db.Documents
      .findAndCountAll(req.dmsFilter)
      .then((documents) => {
        const condition = {
          count: documents.count,
          limit: req.dmsFilter.limit,
          offset: req.dmsFilter.offset
        };
        delete documents.count;
        const pagination = Helper.pagination(condition);
        userDocuments.documents = documents;
        res.status(200)
          .send({
            message: 'The search was successful',
            userDocuments,
            pagination
          });
      });
  },
};

export default DocumentController;
