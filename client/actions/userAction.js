import request from 'superagent';
import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';
import * as types from './ActionTypes';
import setCurrentUser from './AuthAction';

/**
 * createUser,
 * action dispatched on getting a user records from db
 * @param  {object} users user response fron api call in the thunk
 * @return {object}      reponse dispatched to reducer
 */
export const createUser = user => ({
  type: types.CREATE_USER,
  user
});
/**
 *  action dispatched on creating new user failure
 *
 * @export
 * @param {any} name
 * @returns {Object} json object
 */
export const getUserSuccess = user => ({
  type: types.USER_SUCCESS,
  user
});

/**
 * action dispatched on creating new user success
 *
 * @export
 * @param {any} user
 * @returns {Object} json object
 */
export const createUserSuccess = user => ({
  type: types.CREATE_USER_SUCCESS,
  user
});
/**
 * update user success
 * @param  {object} user updated user new details
 * @return {object} json object
 */
export const updateUserSuccess = user => ({
  type: types.UPDATE_USER_SUCCESS,
  user
});

/**
 * remove from state the currently selected user
 * @param  {object} user delete user details
 * @return {object} action [description]
 */
export const deleteUserSuccess = user => ({
  type: types.DELETE_USER_SUCCESS,
  user
});

/**
 * create new user using api route
 * POST /users/
 *
 * @export saveUser
 * @param {object} user
 * @returns {Object} api response
 */
export const saveUser = user => (dispatch) => {
  request
    .post('/api/users')
     .send(user)
    .end((err, res) => {
      Materialize.toast(res.body.message, 4000, 'rounded');
      if (err) {
        return err;
      }
      dispatch(createUserSuccess(user));
      browserHistory.push('/login');
    });
};
/**
 * load users from the database using api route setting limit and offset
 * GET /users/?limit=%offset=
 * @param  {number} limit  [description]
 * @param  {number} offset [description]
 * @return {object}        [description]
 */
export const fetchAllUsers = (offset) => {
  const token = localStorage.getItem('dms-user');
  return dispatch => new Promise((resolve) => {
    request
        .get(`/api/users?offset=${offset}`)
        .set({ 'x-access-token': token })
        .end((err, res) => {
          Materialize.toast(res.body.message, 4000, 'rounded');
          dispatch(getUserSuccess(res.body));
          resolve();
        });
  });
};

/**
 * login user function
 * set user token to local storage on successfull login
 * and set headers for authorization
 *
 * @export
 * @param {any} user
 * @returns {any} data
 */
export const login = (userCredentials) => {
  return (dispatch) => {
    request
      .post('/api/users/login')
      .send(userCredentials)
      .end((err, res) => {
        Materialize.toast(res.body.message, 4000, 'rounded');
        if (err) {
          return err;
        }
        Object.assign({}, res.body.user, { token: res.body.token });
        localStorage.setItem('dms-user', res.body.token);
        browserHistory.push('/');
        dispatch(setCurrentUser(jwtDecode(res.body.token)));
      });
  };
};

export const editUser = (userId, userData) => {
  const token = localStorage.getItem('dms-user');
  return (dispatch) => {
    request
      .put(`/api/users/${userId}`, userData)
      .set({ 'x-access-token': token })
      .end((err, res) => {
        dispatch(setCurrentUser(userData));
      });
  };
};

/**
 *
 *
 * @export
 * @param {any} userId
 * @returns {Object} userData
 */
export const fetchProfile = (userId) => {
  const token = localStorage.getItem('dms-user');
  return dispatch => new Promise((resolve) => {
    request
      .get(`/api/users/${userId}`)
      .set({ 'x-access-token': token })
      .end((err, res) => {
        Materialize.toast(res.body.message, 4000, 'rounded');
        if (err) {
          return err;
        }
        dispatch(setCurrentUser(res.body.user));
        resolve();
      });
  });
};

/**
 * user update by account owner
 * GET /users/:id
 * @param  {object} user [user data object to update]
 * @param  {number} id   user id
 * @return {object}      [api response]
 */
export const updateUser = (user) => {
  const token = localStorage.getItem('dms-user');
  return (dispatch) => {
    request
      .put(`/api/users/${user.userId}`)
      .set({ 'x-access-token': token })
      .send(user)
      .end((err, res) => {
        Materialize.toast(res.body.message, 4000, 'rounded');
        if (err) {
          return err;
        }
        browserHistory.push('/users');
        dispatch(updateUserSuccess(res.body.updatedUser));
      });
  };
};

/**
 *
 *
 * @export getUser
 * @param {any} id
 * @returns {Object} json object
 */
export const deleteUser = (id) => {
  const token = localStorage.getItem('dms-user');
  return (dispatch) => {
    request
      .delete(`/api/users/${id}`)
      .set({ 'x-access-token': token })
      .end((err, res) => {
        Materialize.toast(res.body.message, 4000, 'rounded');
        if (err) {
          return err;
        }
        dispatch(deleteUserSuccess(res.body.document));
      });
  };
};
