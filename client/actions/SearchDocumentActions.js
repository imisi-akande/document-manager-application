import request from 'superagent';
import * as types from './ActionTypes';
import { fetchDocuments, fetchOwnDocuments } from './DocumentActions';

import getToken from '../actions/GetToken';

/**
 * getowndocumentsuccess
 * Route: GET: /documents
 *
 * @export
 * @param {object} documents  returned all documents from api call
 * @returns {object} action and action types
 */
export const getDocumentSuccess = documents => ({
  type: types.LOAD_DOCUMENT_SUCCESS,
  documents
});

/**
 * getowndocumentsuccess
 * Route: GET: /documents/:id
 *
 * @export
 * @param {object} documents  return own documents from api call
 * @returns {object} action and action types
 */
export const getOwnDocumentSuccess = documents => ({
  type: types.LOAD_OWN_DOCUMENT_SUCCESS,
  documents
});

/**
 * search for all Documents
 * Route: GET: /search?query={}
 *
 * @param  {object} queryString input query
 * @param  {number} offset = 0  offset
 * @return {object}           object
 */
export function searchDocuments(queryString, offset = 0) {
  getToken();
  return (dispatch) => {
    if (!queryString) {
      return dispatch(fetchDocuments());
    }
    request
    .get(`/api/search/documents/?q=${queryString}&offset=${offset}`)
    .set({ 'x-access-token': getToken() })
    .end((err, res) => {
      dispatch(getDocumentSuccess(res.body));
    });
  };
}

/**
 * search own documents
 * Route: GET: /search?query={}
 *
 * @export
 * @param {object} queryString
 * @param {number} [offset=0]
 * @param {object} userId
 * @returns {object}} object
 */
export function searchOwnDocuments(queryString, offset = 0, userId) {
  getToken();

  return (dispatch) => {
    if (!queryString) {
      return dispatch(fetchOwnDocuments());
    }
    request
     .get(`/api/search/documents/?q=${queryString}&offset=${offset}`)
    .set({ 'x-access-token': getToken() })
    .end((err, res) => {
      res.body.documents.rows = res.body.documents.rows
        .filter(document => document.authorId === userId);
      dispatch(getOwnDocumentSuccess(res.body));
    });
  };
}
