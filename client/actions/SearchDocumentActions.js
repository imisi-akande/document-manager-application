import request from 'superagent';
import * as types from './ActionTypes';
import { fetchDocuments, fetchOwnDocuments } from './DocumentActions';

import getToken from '../actions/GetToken';

export const getDocumentSuccess = documents => ({
  type: types.LOAD_DOCUMENT_SUCCESS,
  documents
});

/**
 * getowndocumentsuccess
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
 * searchDocuments - description
 *
 * @param  {type} queryString description
 * @param  {type} offset = 0  description
 * @return {type}             description
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
 *
 * @export
 * @param {object} queryString
 * @param {number} [offset=0]
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
