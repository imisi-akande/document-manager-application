import express from 'express';
import UserController from '../controller/UserController';
import authenticate from '../middleware/Authenticate';
// Express router created
const userRoutes = express.Router();
userRoutes.route('/:id/documents')
/**
   * @swagger
   * /users/{id}/documents:
   *   get:
   *     description: Returns the documents of a particular user
   *     tags:
   *      - Find Documents
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: id
   *         description: The user's id
   *         in:  path
   *         required: true
   *         type: string
   *       - name: x-access-token
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/FetchDoc'
   */
.get(authenticate.verifyToken, authenticate.validateSearch,
     UserController.findUserDocuments);

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


export default userRoutes;
