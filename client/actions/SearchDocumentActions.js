import request from 'superagent';
import * as types from './ActionTypes';
import { fetchDocuments, fetchOwnDocuments } from './DocumentActions';

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
  const token = window.localStorage.getItem('dms-user');
  return (dispatch) => {
    request
    .get(`/api/search/documents/?q=${queryString}&offset=${offset}`)
    .set({ 'x-access-token': token })
    .end((err, res) => {
      if (queryString) {
        dispatch(getDocumentSuccess(res.body));
      } else {
        dispatch(fetchDocuments());
      }
    });
  };
}
export function searchOwnDocuments(queryString, offset = 0) {
  const token = window.localStorage.getItem('dms-user');
  return (dispatch) => {
    request
     .get(`/api/search/documents/?q=${queryString}&offset=${offset}`)
    .set({ 'x-access-token': token })
    .end((err, res) => {
      if (queryString) {
        dispatch(getOwnDocumentSuccess(res.body));
      } else {
        dispatch(fetchOwnDocuments());
      }
    });
  };
}
