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

 
};

export default RoleController;
