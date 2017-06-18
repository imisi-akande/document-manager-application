/**
 * Documents action, disptach action and
 * action types of each action to the reducer
 */
import {
  browserHistory
} from 'react-router';
import request from 'superagent';
import decode from 'jwt-decode';
import * as types from './ActionTypes';

import getToken from '../actions/GetToken';

/**
 * create new document success action
 *
 * @export
 * @param {object} document newly create document reponse from api post
 * @returns {object} action and action types
 */
export const createDocument = document => ({
  type: types.CREATE_DOCUMENT,
  document
});

/**
 * get all accessible documents
 *  Route: GET: /documents/
 *
 * @export
 * @param {object} documents  returned documents from api call
 * @returns {object} action and action types
 */
export const getDocumentSuccess = documents => ({
  type: types.LOAD_DOCUMENT_SUCCESS,
  documents
});

/**
 * get accessible documents only
 * Route: GET: /users/:id/documents
 *
 * @export
 * @param {object} documents  returned documents from api call
 * @returns {object} action and action types
 */
export const getOwnDocumentSuccess = documents => ({
  type: types.LOAD_OWN_DOCUMENT_SUCCESS,
  documents
});

/**
 * update documents to database
 * PUT api route /documents/:id
 *
 * @export
 * @param {object} document
 * @returns {object} documents
 */
export const updateDocumentSuccess = document => ({
  type: types.UPDATE_DOCUMENT_SUCCESS,
  document
});

/**
 * create new document success action
 * Route: POST: /documents
 *
 * @export
 * @param {object} document newly create document reponse from api post
 * @returns {object} action and action types
 */
export const createDocumentSuccess = document => ({
  type: types.CREATE_DOCUMENT_SUCCESS,
  document
});

/**
 * delete document from database
 * DELETE api route /documents/:id
 *
 * @export
 * @param {number} id
 * @returns {object} documents
 */
export const deleteDocumentSuccess = id => ({
  type: types.DELETE_DOCUMENT_SUCCESS,
  id
});

/**
 *Fetch documents action
 *Route: GET: /documents
 *
 * @export
 * @param {number} offset
 * @param {number} limit
 * @returns {Object}documents
 */
export const fetchDocuments = (offset) => {
  const pageOffset = offset || 0;
  return (dispatch) => {
    request
      .get(`/api/documents?offset=${pageOffset}`)
      .set({
        'x-access-token': getToken()
      })
      .end((err, res) => {
        dispatch(getDocumentSuccess(res.body));
      });
  };
};

/**
 * fetch own documents action
 * Route: GET: users/:id/documents
 *
 * @export
 * @param {number} [offset=0]
 * @param {number} [limit=10]
 * @returns {Object}object
 */
export const fetchOwnDocuments = () => {
  const userData = decode(getToken());
  const id = userData.userId;
  return (dispatch) => {
    request
      .get(`/api/users/${id}/documents/`)
      .set({
        'x-access-token': getToken()
      })
      .end((err, res) => {
        dispatch(getOwnDocumentSuccess(res.body));
      });
  };
};
/**
  * Save - Save Document
  * Route: POST: /documents
  *
  * @param {Object} document Request object
  * @param {Object} response Response object
  * @returns {Object} res Response object
  */
export const documentSaver = document => (dispatch) => {
  request
      .post('/api/documents')
      .send(document)
      .set({
        'x-access-token': getToken()
      })
      .end((err, res) => {
        dispatch(createDocumentSuccess(res.body.document));
        browserHistory.push('/documents');
      });
};

/**
 * Update documents action
 * Route: PUT: /documents/:id
 *
 * @export
 * @param {object} document
 * @param {object} isAdmin
 * @returns {Object}updated documents
 */
export const updateDocument = (document, isAdmin) => (dispatch) => {
  request
      .put(`/api/documents/${document.id}`)
      .send(document)
      .set({
        'x-access-token': getToken()
      })
      .end(() => {
        if (isAdmin) {
          dispatch(fetchDocuments());
        } else {
          dispatch(fetchOwnDocuments());
        }
      });
};

/**
 * Delete documents action
 * Route: DELETE: /documents/:id
 *
 * @export
 * @param {number} id
 * @returns {Object}object
 */
export const deleteDocument = id => (dispatch) => {
  request
      .delete(`/api/documents/${id}`)
      .set({
        'x-access-token': getToken()
      })
      .end(() => {
        dispatch(deleteDocumentSuccess(id));
      });
};

