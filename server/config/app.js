import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import * as routes from '../routes';
import AddDevSetup from './AddDevSetup';

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  Connect all our routes to our application

// Creates a new user
/**
 * @swagger
 * definitions:
 *   NewUser:
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
 */

app.use('/api/users', routes.userRoutes);
/**
   * @swagger
   * /users:
   *   get:
   *     description: Returns users
   *     tags:
   *      - Find Users
   *     produces:
   *      - application/json
   *     parameters:
   *      - name: x-access-token/ Authorization
   *        in: header
   *        description: an authorization header
   *        required: true
   *        type: string
   *     responses:
   *       200:
   *         description: users
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/User'
   */
app.use('/api/roles', routes.roleRoutes);

/**
 * @swagger
 * definitions:
 *   NewDocument:
 *     type: object
 *     required:
 *       - title
 *       - content
 *       - access
 *     properties:
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       access:
 *         type: string
 *   Document:
 *     allOf:
 *       - $ref: '#/definitions/NewDocument'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
app.use('/api/documents', routes.documentRoutes);
app.use('/api/search', routes.searchRoutes);
// Setup a default catch-all route that sends back a
// welcome message in JSON format

app.use(express.static(path.join(__dirname, '../../client/public')));
if (process.env.NODE_ENV === 'development') {
  AddDevSetup(app);
}
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});


export default app;
// export default server
