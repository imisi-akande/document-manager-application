import express from 'express';
import UserController from '../controller/UserController';
import DocumentController from '../controller/DocumentController';
import authenticate from '../middleware/Authenticate';

const searchRoutes = express.Router();

// Search for a user
/**
 * @swagger
 * definitions:
 *   NewSearchUser:
 *     type: object
 *   SearchUser:
 *     allOf:
 *       - $ref: '#/definitions/NewSearchUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */

searchRoutes.route('/users')
  .get(authenticate.verifyToken,
    authenticate.validateSearch,
    UserController.searchUser);

/**
 * @swagger
 * definitions:
 *   NewSearchDocument:
 *     type: object
 *   SearchDocument:
 *     allOf:
 *       - $ref: '#/definitions/NewSearchDocument'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
searchRoutes.route('/documents')
  .get(authenticate.verifyToken,
    authenticate.validateSearch,
    DocumentController.searchDocuments);

export default searchRoutes;
