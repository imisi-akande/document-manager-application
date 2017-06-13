import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';
import Helper from '../Helper/utility';
import DocumentHelper from '../ControllerHelper /DocumentHelper';
import RoleHelper from '../ControllerHelper /RoleHelper';

dotenv.config();
const secretKey = process.env.SECRET;

// const Roles = db.Roles;
/**
 * to authenticate users
 */
const authenticate = {
  /**
   * verifyToken - Verifies if a token supplied is valid or not
   *
   * @param  {Object} request  Request Object
   * @param  {Object} response  Response Object
   * @param  {Object} next Middleware function
   * @returns {Object} Response Status
   */
  verifyToken(request, response, next) {
    // token request
    const token = request.body.token ||
      request.get('Authorization') ||
      request.headers['x-access-token'];
    if (token) {
        // If the token is valid, request is set to decoded
      jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
          response.status(401).send({
            message: 'Invalid token, Authentication required'
          });
        }
          // decode token with user id
        request.decoded = decoded;
          // Move to the next middleware function
        next();
      });
    // } else {
    //   response.status(401).send({
    //     message: 'You are not permitted to perform this action'
    //   });
    }
  },

  /**
   * Get token
   * @param {Object} user user's object
   * @returns {Boolean} true or false
   */
  getToken(user) {
    const userToken = jwt.sign({
      userId: user.id
    },
      secretKey, { expiresIn: '1d' }
    );
    return userToken;
  },
  /**
   * Validate user to delete, make sure it not admin user
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   *
   */
  validateDeleteUser(req, res, next) {
    db.Users.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        if (Helper.isAdmin(user.roleId) && user.id === 1) {
          return res.status(403)
            .send({
              message: 'You can not delete the default admin user'
            });
        }
        if (Helper.isRegular(user.roleId) && user.id === 2) {
          return res.status(403)
            .send({ message: 'You can not delete the default regular user' });
        }
        req.userInstance = user;
        next();
      });
  },
   /**
   * Validate documents input
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  validateDocumentsInput(req, res, next) {
    const title = /\w+/g.test(req.body.title);
    const content = /\w+/g.test(req.body.content);
    if (!req.body.title) {
      return res.status(400)
        .send({
          message: 'Title field is required'
        });
    }
    if (!req.body.content) {
      return res.status(400)
        .send({
          message: 'Content field is required'
        });
    }
    if (!title) {
      return res.status(400)
        .send({
          message: 'Please enter a valid title'
        });
    }
    if (!content) {
      return res.status(400)
        .send({
          message: 'Please enter a valid content'
        });
    }
    if (req.body.access
      && !['public', 'private', 'role'].includes(req.body.access)) {
      return res.status(400)
        .send({
          message: 'Access type can only be public, private or role'
        });
    }
    req.docInput = {
      title: req.body.title,
      content: req.body.content,
      authorId: req.decoded.userId,
      access: req.body.access,
      // ownerRoleId: req.decoded.roleId
    };
    next();
  },

  /**
   * Check for role edit and delete permission
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  modifyRolePermission(req, res, next) {
    db.Roles.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404)
            .send({
              message: 'This role does not exist'
            });
        }
        if (Helper.isAdmin(role.id) || Helper.isRegular(role.id)) {
          return res.status(403)
            .send({
              message: 'You are not permitted to modify this role'
            });
        }
        req.roleInstance = role;
        next();
      });
  },
  /**
   * Validate user's input
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   * */
  validateUserUpdate(req, res, next) {
    if (req.decoded.roleId === '1') {
      return res.status(403)
        .send({
          message: 'You are not permitted to modify the default admin user'
        });
    }
    if (!(Helper.isAdmin(req.decoded.roleId) || Helper.isOwner(req))) {
      return res.status(401)
        .send({
          message: 'You are not permitted to update this profile'
        });
    }
    if (!!req.body.roleId && req.body.roleId === '1') {
      if (!Helper.isAdmin(req.decoded.roleId)) {
        return res.status(403)
          .send({
            message: 'You are not permitted to update role to admin'
          });
      }
    }
    if (req.body.id) {
      return res.status(403)
        .send({
          message: 'You are not permitted to update your id'
        });
    }
    db.Users.findById(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        req.userInstance = user;
        next();
      });
  },
  /**
   * Validate user's input
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   * */
  validateUserInput(req, res, next) {
    if (req.body.roleId && req.body.roleId === 1) {
      return res.status(403)
        .send({
          message: 'Permission denied, You cannot sign up as an admin user'
        });
    }
    let userName = /\w+/g.test(req.body.userName);
    let firstName = /\w+/g.test(req.body.firstName);
    let lastName = /\w+/g.test(req.body.lastName);
    let email = /\S+@\S+\.\S+/.test(req.body.email);
    let password = /\w+/g.test(req.body.password);

    if (!userName) {
      return res.status(400)
        .send({
          message: 'Enter a valid username'
        });
    }
    if (!firstName) {
      return res.status(400)
        .send({
          message: 'Enter a valid firstname'
        });
    }
    if (!lastName) {
      return res.status(400)
        .send({
          message: 'Enter a valid lastname'
        });
    }
    if (!email) {
      return res.status(400)
        .send({
          message: 'Enter a valid email'
        });
    }
    if (!password) {
      return res.status(400)
        .send({
          message: 'Enter a valid password'
        });
    }
    if (req.body.password && req.body.password.length < 6) {
      return res.status(400)
        .send({
          message: 'Minimum of 6 characters is allowed for password'
        });
    }

    db.Users.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) {
          return res.status(409)
            .send({
              message: 'email already exists'
            });
        }
        db.Users.findOne({ where: { userName: req.body.userName } })
          .then((newUser) => {
            if (newUser) {
              return res.status(409)
                .send({
                  message: 'userName already exists'
                });
            }
            userName = req.body.userName;
            firstName = req.body.firstName;
            lastName = req.body.lastName;
            email = req.body.email;
            password = req.body.password;
            const roleId = req.body.roleId || 2;
            req.userInput =
            { userName, firstName, lastName, roleId, email, password };
            next();
          });
      });
  },
 /**
   * Validate user's login datas
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   * */
  validateLoginInput(req, res, next) {
    if (!req.body.password || !req.body.email) {
      return res.status(400)
        .send({
          message: 'Please provide your email and password to login'
        });
    }

    const email = /\S+@\S+\.\S+/.test(req.body.email);
    const password = /\w+/g.test(req.body.password);

    if (!email || !password) {
      return res.status(400)
        .send({
          message: 'Please enter a valid email and password'
        });
    }
    next();
  },
  /**
   * validateAdmin
   * @param {Object} request object
   * @param {Object} response object
   * @param {Object} next object
   * @param {Object} Role object
   * @returns {Object} response message
   */
  validateAdmin(request, response, next) {
    db.Roles.findById(request.decoded.roleId)
      .then((role) => {
        if (role.title === 'admin') {
          next();
        } else {
          response.status(401).send({
            message: 'You are not permitted to perform this action'
          });
        }
      });
  },
  /**
   * Check for document edit and delete permission
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  hasDocumentPermission(req, res, next) {
    db.Documents.findById(req.params.id)
      .then((doc) => {
        if (!doc) {
          return res.status(404)
            .send({
              message: 'This document does not exist'
            });
        }
        if (!Helper.isOwnerDoc(doc, req)
          && !Helper.isAdmin(req.decoded.roleId)) {
          return res.status(401)
            .send({
              message: 'You are not permitted to modify this document'
            });
        }

        req.docInstance = doc;
        next();
      });
  },
  /**
   * Validate search
   *
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  validateSearch(req, res, next) {
    const query = {};
    const terms = [];
    const userQuery = req.query.q;
    const searchArray =
      userQuery ? userQuery.toLowerCase().match(/\w+/g) : null;
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const publishedDate = req.query.publishedDate;
    const order =
      publishedDate && publishedDate === 'ASC' ? publishedDate : 'DESC';

    if (limit < 0 || !/^([1-9]\d*|0)$/.test(limit)) {
      return res.status(400)
        .send({
          message: 'Only positive number is allowed for limit value'
        });
    }
    if (offset < 0 || !/^([1-9]\d*|0)$/.test(offset)) {
      return res.status(400)
        .send({
          message: 'Only positive number is allowed for offset value'
        });
    }

    if (searchArray) {
      searchArray.forEach((word) => {
        terms.push(`%${word}%`);
      });
    }
    query.limit = limit;
    query.offset = offset;
    query.order = [['createdAt', order]];

    if (`${req.baseUrl}${req.route.path}` === '/api/search/users') {
      if (!req.query.q) {
        return res.status(400)
          .send({
            message: 'Please enter a search query'
          });
      }
      query.where = {
        $or: [
          { userName: { $iLike: { $any: terms } } },
          { firstName: { $iLike: { $any: terms } } },
          { lastName: { $iLike: { $any: terms } } },
          { email: { $iLike: { $any: terms } } }
        ]
      };
    }
    if (`${req.baseUrl}${req.route.path}` === '/api/users/') {
      query.where = Helper.isAdmin(req.decoded.roleId) ||
       Helper.isRegular(req.decoded.roleId)
        ? {}
        : { id: req.decoded.userId };
    }
    if (`${req.baseUrl}${req.route.path}` === '/api/search/documents' ||
      `${req.baseUrl}${req.route.path}` === '/api/search/user/documents') {
      if (Helper.isAdmin(req.decoded.roleId)) {
        query.where = {
          $or: [
          { title: { $iLike: { $any: terms } } },
          { content: { $iLike: { $any: terms } } },
          ]
        };
        query.include = [{
          model: db.Users,
          attributes: { exclude: ['password'] }
        }];
      } else {
        query.where = {
          $and: [DocumentHelper.documentAccess(req), Helper.likeSearch(terms)]
        };
        query.include = [{
          model: db.Users,
          attributes: { exclude: ['password'] }
        }];
      }
    }
    if (`${req.baseUrl}${req.route.path}` === '/api/documents/') {
      if (Helper.isAdmin(req.decoded.roleId)) {
        query.where = {};
      } else {
        query.where = DocumentHelper.documentAccess(req);
        query.include = [{
          model: db.Users,
          attributes: { exclude: ['password'] }
        }];
      }
    }
    if (`${req.baseUrl}${req.route.path}` === '/api/users/:id/documents') {
      const adminSearch = req.query.q ? Helper.likeSearch(terms) : { };
      const userSearch = req.query.q
        ? [DocumentHelper.documentAccess(req), Helper.likeSearch(terms)]
        : DocumentHelper.documentAccess(req);
      if (Helper.isAdmin(req.decoded.roleId)) {
        query.where = adminSearch;
      } else {
        query.where = userSearch;
      }
    }
    req.dmsFilter = query;
    next();
  },


  /**
   * Get a single user's document
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  getSingleDocument(req, res, next) {
    db.Documents
      .findById(req.params.id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({
              message: 'This document cannot be found'
            });
        }
        if (!Helper.isPublic(document) && !Helper.isOwnerDoc(document, req)
           && !Helper.isAdmin(req.decoded.roleId)
           && !RoleHelper.hasRoleAccess(document, req)) {
          return res.status(401)
            .send({
              message: 'You are not permitted to view this document'
            });
        }
        req.singleDocument = document;
        next();
      })
      .catch(error => res.status(500).send(error.errors));
  },


   /**
   *  Validate user search
   *
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  validateDocumentSearch(req, res, next) {
    const query = {};
    const terms = [];
    const userQuery = req.query.q;
    const searchArray =
      userQuery ? userQuery.toLowerCase().match(/\w+/g) : null;
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const publishedDate = req.query.publishedDate;
    const order =
      publishedDate && publishedDate === 'ASC' ? publishedDate : 'DESC';

    if (limit < 0 || !/^([1-9]\d*|0)$/.test(limit)) {
      return res.status(400)
        .send({
          message: 'Only positive number is allowed for limit value'
        });
    }
    if (offset < 0 || !/^([1-9]\d*|0)$/.test(offset)) {
      return res.status(400)
        .send({
          message: 'Only positive number is allowed for offset value'
        });
    }

    if (searchArray) {
      searchArray.forEach((word) => {
        terms.push(`%${word}%`);
      });
    }
    query.limit = limit;
    query.offset = offset;
    query.order = [['createdAt', order]];

    if (`${req.baseUrl}${req.route.path}` === '/api/search/users') {
      if (!req.query.q) {
        return res.status(400)
          .send({
            message: 'Please enter a search query'
          });
      }
      query.where = {
        $or: [
          { userName: { $iLike: { $any: terms } } },
          { firstName: { $iLike: { $any: terms } } },
          { lastName: { $iLike: { $any: terms } } },
          { email: { $iLike: { $any: terms } } }
        ]
      };
    }
    if (`${req.baseUrl}${req.route.path}` === '/api/users/') {
      query.where = Helper.isAdmin(req.decoded.roleId) ||
       Helper.isRegular(req.decoded.roleId)
        ? {}
        : { id: req.decoded.userId };
    }
    if (`${req.baseUrl}${req.route.path}` === '/api/search/user/documents') {
      if (Helper.isAdmin(req.decoded.roleId)) {
        query.where = {
          $or: [
          { title: { $iLike: { $any: terms } } },
          { content: { $iLike: { $any: terms } } },
          ]
        };
        query.include = [{
          model: db.Users,
          attributes: { exclude: ['password'] }
        }];
      } else {
        query.where = {
          $and: [{ title: {
            $ilike: {
              $any: searchArray,
            },
          }, }, { authorId: req.decoded.userId }]
        };
        query.include = [{
          model: db.Users,
          attributes: { exclude: ['password'] }
        }];
      }
    }
    req.dmsFilter = query;
    next();
  },

  /**
   * Get a single user's profile
   * @param {Object} req req object
   * @param {Object} res response object
   * @param {Object} next Move to next controller handler
   * @returns {void|Object} response object or void
   */
  getUser(req, res, next) {
    db.Users
      .findOne({
        where: { id: req.params.id },
      })
      .then((user) => {
        if (!user) {
          return res.status(404)
            .send({
              message: 'This user does not exist'
            });
        }
        req.getUser = user;
        next();
      })
      .catch(err => res.status(500).send(err.errors));
  },
};
export default authenticate;

