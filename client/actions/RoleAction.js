import request from 'superagent';
import { browserHistory } from 'react-router';
import * as types from './ActionTypes';

/**
 * createrole action
 * @param  {object} roles [description]
 * @return {object}      [description]
 */
export const createRole = role => ({
  type: types.CREATE_ROLE,
  role
});

/**
 * get role
 * @return {object} object of roles
 */
export const getRoleSuccess = roles => ({
  type: types.LOAD_ROLE_SUCCESS,
  roles
});

/**
 * update from state the current selected role
 * @return {[type]} [description]
 */
export const updateRoleSuccess = role => ({
  type: types.UPDATE_ROLE_SUCCESS,
  role
});

/**
 * delete from state the current selected role
 * @return {[type]} [description]
 */
export const deleteRoleSuccess = id => ({
  type: types.DELETE_ROLE_SUCCESS,
  id
});

/**
 * create from state the current selected role
 * @return {[type]} [description]
 */
export const createRoleSuccess = role => ({
  type: types.CREATE_ROLE_SUCCESS,
  role
});

/**
 * create new role
 * POST /roles/
 * @param  {object} role role object to be svaed
 * @return {object}      response from api
 */
export const roleSaver = (role) => {
  return (dispatch) => {
    const token = localStorage.getItem('dms-user');
    request
      .post('/api/roles/')
      .send(role)
      .set({ 'x-access-token': token })
      .end((err, res) => {
        Materialize.toast(res.body.message, 4000, 'rounded');
        dispatch(createRoleSuccess(role));
        browserHistory.push('/roles');
        return res;
      });
  };
};

/**
 * fetch roles
 * @return {object} object of roles
 */
export const fetchRoles = () => {
  return (dispatch) => {
    const token = localStorage.getItem('dms-user');
    request
      .get('/api/roles/')
      .set({ 'x-access-token': token })
      .end((err, res) => {
        // Materialize.toast(res.body.message, 4000, 'rounded');
        dispatch(getRoleSuccess(res.body.roles));
      });
  };
};

/**
 * delete role from db
 * DELETE /roles/:id
 * @param  {number} id role id
 * @return {object}    api response
 */
export const deleteRoles = (id) => {
  return (dispatch) => {
    const token = localStorage.getItem('dms-user');
    request
      .delete(`/api/roles/${id}`)
       .set({ 'x-access-token': token })
      .end((err, res) => {
        Materialize.toast(res.body.message, 4000, 'rounded');
        browserHistory.push('/roles');
        dispatch(deleteRoleSuccess(id));
      });
  };
};

