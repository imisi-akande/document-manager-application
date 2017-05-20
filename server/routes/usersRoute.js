import express from 'express';
import UserController from '../controller/UserController';
import authenticate from '../middleware/Authenticate';
// Express router created
const userRoutes = express.Router();
/**
   * @swagger
   * /users:
   *   post:
   *     description: Creates new user
   *     tags:
   *      - Create
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewUser'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/User'
   */
userRoutes.route('/')
  .get(authenticate.verifyToken, authenticate.validateSearch,
  UserController.listAllUsers)
    .post(authenticate.validateUserInput, UserController.createUser);

// Logs a user in
/**
 * @swagger
 * definitions:
 *   NewLogin:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *   Login:
 *     allOf:
 *       - $ref: '#/definitions/NewLogin'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRoutes.route('/login')
  /**
   * @swagger
   * api/users/login:
   *   post:
   *     description: Logs in a user
   *     tags:
   *      - Authentication
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewLogin'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/Login'
   */
  .post(authenticate.validateLoginInput, UserController.login);
  // Logs a user out
/**
 * @swagger
 * definitions:
 *   NewLogout:
 *     type: object
 *   Logout:
 *     allOf:
 *       - $ref: '#/definitions/NewLogout'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRoutes.route('/logout')
  /**
   * @swagger
   * /users/logout:
   *   post:
   *     description: Logs out a user
   *     tags:
   *      - Authentication
   *     produces:
   *       - application/json
   *     parameters:
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/Logout'
   */
 .post(UserController.logout);

// Find, Update and Delete user
/**
 * @swagger
 * definitions:
 *   NewUpdate:
 *     type: object
 *     required:
 *       - username
 *       - email
 *       - firstName
 *       - lastName
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       email:
 *         type: string
 *         format: email
 *   Update:
 *     allOf:
 *       - $ref: '#/definitions/NewUpdate'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
userRoutes.route('/:id')
/**
   * @swagger
   * /users/{id}:
   *   get:
   *     description: Returns a particular user
   *     tags:
   *      - Find Users
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
   *             $ref: '#/definitions/Update'
   */

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     description: Updates the user signed in
   *     tags:
   *      - Update
   *     produces:
   *       - application/json
   *     parameters:
   *        - name: id
   *          description: The user's id
   *          in:  path
   *          required: true
   *          type: string
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *        - name: user
   *          description: User object
   *          in:  body
   *          required: true
   *          type: string
   *          schema:
   *            $ref: '#/definitions/NewUpdate'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/Update'
   */

  /**
   * @swagger
   * /users/{id}:
   *    delete:
   *      description: Deletes the user with the id supplied as param
   *      tags:
   *        - Delete
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: id
   *          description: The user's id
   *          in:  path
   *          required: true
   *          type: string
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *      responses:
   *        200:
   *          description: users
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/Update'
   */
.get(authenticate.verifyToken, authenticate.getUser, UserController.FindUserById)
  .put(authenticate.verifyToken, authenticate.validateUserUpdate,
  UserController.UpdateUser)
  .delete(authenticate.verifyToken, authenticate.validateAdmin,
  authenticate.validateDeleteUser, UserController.DeleteUser);

// Find all documents belonging to the user.
/**
 * @swagger
 * definitions:
 *   NewFetchDoc:
 *     type: object
 *   FetchDoc:
 *     allOf:
 *       - $ref: '#/definitions/NewFetchDoc'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
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
