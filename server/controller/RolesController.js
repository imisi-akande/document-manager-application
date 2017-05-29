import db from '../models';
import Helper from '../Helper/utility';



const RoleController = {

 /**
    * Create a new role
    * Route: POST: /roles/
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  createRole(req, res) {
    db.Roles.create(req.body)
      .then((role) => {
        res.status(201)
          .send({
            message: 'Role has been created',
            role
          });
      })
      .catch(error =>
        res.status(401)
          .send({
            errorArray: Helper.errorArray(error)
          }));
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
    * Update roles
    * Route: PUT: /roles/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  updateRole(req, res) {
    req.roleInstance.update(req.body)
      .then((updatedRole) => {
        res.status(200)
          .send({
            message: 'This role has been updated',
            updatedRole
          });
      })
      .catch(error =>
        res.status(400)
          .send({
            errorArray: Helper.errorArray(error)
          }));
  },

  /**
    * Delete a Role
    * Route: DELETE: /roles/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  deleteRole(req, res) {
    req.roleInstance.destroy()
      .then((updatedRole) => {
        res.status(200)
          .send({
            message: 'This role has been deleted',
            updatedRole
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

export default RoleController;
