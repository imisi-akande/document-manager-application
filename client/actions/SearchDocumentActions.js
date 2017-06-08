import request from 'superagent';
import * as types from './ActionTypes';
import { fetchDocuments, fetchOwnDocuments } from './DocumentActions';

import getToken from '../actions/GetToken';

export const getDocumentSuccess = documents => ({
  type: types.LOAD_DOCUMENT_SUCCESS,
  documents
});

/**
 * getdocumentsuccess
 * @export
 * @param {any} documents  returned documents from api call
 * @returns {any} action and action types
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
    request
    .get(`/api/search/documents/?q=${queryString}&offset=${offset}`)
    .set({ 'x-access-token': getToken() })
    .end((err, res) => {
      if (queryString) {
        dispatch(getDocumentSuccess(res.body));
      } else {
        dispatch(fetchDocuments());
      }
    });
  };
}

/**
 *
 * @export
 * @param {any} queryString
 * @param {number} [offset=0]
 * @returns {object}} object
 */
export function searchOwnDocuments(queryString, offset = 0) {
  getToken();
  return (dispatch) => {
    request
     .get(`/api/search/documents/?q=${queryString}&offset=${offset}`)
    .set({ 'x-access-token': getToken() })
    .end((err, res) => {
      if (queryString) {
        dispatch(getOwnDocumentSuccess(res.body));
      } else {
        dispatch(fetchOwnDocuments());
      }
    });
  };
}
