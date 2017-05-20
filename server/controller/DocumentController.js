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
  
  listMyDocuments(req, res) {
    console.log(req.params, 'hapinessssss');
    console.log(req.decoded, 'fatherrrrrrr');
    db.Documents.findAll({ where: { authorId: req.params.userId } })
      .then(docs => res.status(200).send(docs));
  },
  /**
    * Get all roles
    * Route: GET: /roles/
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  getAllRoles(req, res) {
    db.Roles
      .findAll()
      .then((roles) => {
        res.status(200)
        .send({
          message: 'You have successfully retrieved all roles',
          roles
        });
      });
  },
  /**
    * Search document
    * Route: GET: /searchs?query={}
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
    */
  searchDocuments(req, res) {
    req.documentFilter.attributes = Helper.getDocumentAttribute();
    db.Documents
      .findAndCountAll(req.documentFilter)
      .then((documents) => {
        console.log('greeeeeat', db.Documents);
        const condition = {
          count: documents.count,
          limit: req.documentFilter.limit,
          offset: req.documentFilter.offset
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
    * Get all document
    * Route: GET: /documents/
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} response object or void
    */
  listAllDocuments(req, res) {
    req.documentFilter.attributes = Helper.getDocumentAttribute();
    db.Documents
      .findAndCountAll(req.documentFilter)
      .then((documents) => {
        const condition = {
          count: documents.count,
          limit: req.documentFilter.limit,
          offset: req.documentFilter.offset
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
   * retrieve -  return a role
   * @param {Object}  request request object
   * @param {Object}  response response object
   * @returns {void} - returns void
   */
  getRoleById(req, res) {
    db.Roles.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role does not exists'
          });
        }
        return res.status(200).send({
          role
        });
      });
  }
  
};

export default DocumentController;
