/**
 * Documents action, disptach action and
 * action types of each action to the reducer
 */
import { browserHistory } from 'react-router';
import request from 'superagent';
import decode from 'jwt-decode';
import * as types from './ActionTypes';

/**
 * create new document success action
 *
 * @export
 * @param {any} document newly create document reponse from api post
 * @returns {any} action and action types
 */
export const createDocument = document => ({
  type: types.CREATE_DOCUMENT,
  document
});

/**
 * getdocumentsuccess
 * @export
 * @param {any} documents  returned documents from api call
 * @returns {any} action and action types
 */
export const getDocumentSuccess = body => ({
  type: types.LOAD_DOCUMENT_SUCCESS,
  body
});

/**
 * update documents to database using PUT api route /documents/:id
 *
 * @export
 * @param {any} document
 * @returns {object} documents
 */
export const updateDocumentSuccess = document => ({
  type: types.UPDATE_DOCUMENT_SUCCESS,
  document
});

/**
 * create new document success action
 *
 * @export
 * @param {any} document newly create document reponse from api post
 * @returns {any} action and action types
 */
export const createDocumentSuccess = document => ({
  type: types.CREATE_DOCUMENT_SUCCESS,
  document
});

/**
 * delete document from database using DELETE api route /documents/:id
 *
 * @export
 * @param {any} id
 * @returns {object} documents
 */
export const deleteDocumentSuccess = id => ({
  type: types.DELETE_DOCUMENT_SUCCESS,
  id
});


// thunk
export const fetchDocuments = (offset) => {
  const pageOffset = offset ? offset : 0;
  const token = localStorage.getItem('dms-user');
  return (dispatch) => {
    request
      .get(`/api/documents?offset=${pageOffset}`)
      .set({ 'x-access-token': token })
      .end((err, res) => {
        Materialize.toast(res.body.message, 4000, 'rounded');
        dispatch(getDocumentSuccess(res.body));
        console.log(res.body, 'wonderful people....//////');
      });
  };
};

export const fetchOwnDocuments = (offset) => {
  const pageOffset = offset ? offset : 0;
  const token = localStorage.getItem('dms-user');
  const userData = decode(token);
  const id = userData.userId;
  return (dispatch) => {
    request
      .get(`/api/users/${id}/documents/`)
      .set({ 'x-access-token': token })
      .end((err, res) => {
        Materialize.toast(res.body.message, 4000, 'rounded');

        dispatch(getDocumentSuccess(res.body));
        console.log(res.body, 'okekeeee');
      });
  };
};

export const documentSaver = (document) => {
  const token = localStorage.getItem('dms-user');
  return (dispatch) => {
    request
      .post('/api/documents')
      .send(document)
      .set({ 'x-access-token': token })
      .end((err, res) => {
        Materialize.toast(res.body.message, 4000, 'rounded');
        if (err) {
          return err;
        }
        dispatch(createDocumentSuccess(res.body.document));
        browserHistory.push('/documents');
      });
  };
};


export const updateDocument = (document) => {
  const token = localStorage.getItem('dms-user');
  return (dispatch) => {
    request
      .put(`/api/documents/${document.id}`)
      .send(document)
      .set({ 'x-access-token': token })
      .end((err, res) => {
        Materialize.toast(res.body.message, 4000, 'rounded');
        if (err) {
          return err;
        }
        browserHistory.push('/documents');
        dispatch(fetchDocuments());
      });
  };
};



export const deleteDocument = (id) => {
  const token = localStorage.getItem('dms-user');
  return (dispatch) => {
    // console.log(document,'aaaaaaaaaaaa');
    request
      .delete(`/api/documents/${id}`)
      // .send(document)
      .set({ 'x-access-token': token })
      .end((err, res) => {
        Materialize.toast(res.body.message, 4000, 'rounded');
        if (err) {
          return err;
        }
        console.log(res.body, 'tiwasavage');
        dispatch(deleteDocumentSuccess(id));
        browserHistory.push('/documents');
      });
  };
};
