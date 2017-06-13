import express from 'express';
import RoleController from '../controller/RolesController';
import authenticate from '../middleware/Authenticate';

const roleRoutes = express.Router();

/**
 * @swagger
 * definitions:
 *   NewRole:
 *     type: object
 *     required:
 *       - title
 *     properties:
 *       title:
 *         type: string
 *   Role:
 *     allOf:
 *       - $ref: '#/definitions/NewRole'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
roleRoutes.route('/')
/**
   * @swagger
   * /roles:
   *   get:
   *     description: Returns roles
   *     tags:
   *      - Find Roles
   *     produces:
   *      - application/json
   *     parameters:
   *      - name: x-access-token
   *        in: header
   *        description: an authorization header
   *        required: true
   *        type: string
   *     responses:
   *       200:
   *         description: documents
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/Role'
   */

  /**
   * @swagger
   * /roles:
   *   post:
   *     description: Creates new role
   *     tags:
   *      - Create
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: x-access-token
   *         in: header
   *         description: an authorization header
   *         required: true
   *         type: string
   *       - name: role
   *         description: role object
   *         in:  body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/NewRole'
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           $ref: '#/definitions/Role'
   */

  .get(authenticate.verifyToken, authenticate.validateAdmin, RoleController
    .getAllRoles)
  .post(authenticate.verifyToken, authenticate.validateAdmin,
    RoleController.createRole);

    /**
 * @swagger
 * definitions:
 *   NewRoleUpdate:
 *     type: object
 *     required:
 *       - title
 *     properties:
 *       title:
 *         type: string
 *   RoleUpdate:
 *     allOf:
 *       - $ref: '#/definitions/NewRoleUpdate'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */

roleRoutes.route('/:id')
/**
   * @swagger
   * /roles/{id}:
   *   get:
   *     description: Returns a particular role
   *     tags:
   *      - Find Roles
   *     produces:
   *      - application/json
   *     parameters:
   *       - name: id
   *         description: The role's id
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
   *             $ref: '#/definitions/RoleUpdate'
   */

  /**
   * @swagger
   * /roles/{id}:
   *   put:
   *     description: Updates a role by id
   *     tags:
   *      - Update
   *     produces:
   *       - application/json
   *     parameters:
   *        - name: id
   *          description: The role's id
   *          in:  path
   *          required: true
   *          type: string
   *        - name: x-access-token
   *          in: header
   *          description: an authorization header
   *          required: true
   *          type: string
   *        - name: role
   *          description: User object
   *          in:  body
   *          required: true
   *          type: string
   *          schema:
   *            $ref: '#/definitions/NewRoleUpdate'
   *     responses:
   *       200:
   *         description: roles
   *         schema:
   *           $ref: '#/definitions/RoleUpdate'
   */

  /**
   * @swagger
   * /roles/{id}:
   *    delete:
   *      description: Deletes the role with the id supplied as param
   *      tags:
   *        - Delete
   *      produces:
   *        - application/json
   *      parameters:
   *        - name: id
   *          description: The role's id
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
   *          description: roles
   *          schema:
   *            type: array
   *            items:
   *              $ref: '#/definitions/RoleUpdate'
   */
  .put(authenticate.verifyToken, authenticate.validateAdmin,
    authenticate.modifyRolePermission, RoleController.updateRole)
  .delete(authenticate.verifyToken, authenticate.validateAdmin,
   authenticate.modifyRolePermission, RoleController.deleteRole)
    .get(authenticate.verifyToken, authenticate.validateAdmin,
   RoleController.getRoleById);

export default roleRoutes;
