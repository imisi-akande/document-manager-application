import { browserHistory } from 'react-router';
import request from 'superagent';
import * as types from './ActionTypes';
import { fetchDocuments } from './DocumentActions';
import { SEARCH_RESULTS } from './Types';


// /**
//  * userSearchResult
//  * @param  {object} users user reponse from api call
//  * @return {object}      action type and action payload
//  */
// export function documentsSearched(documentSearchResult) {
//   return {
//     type: SEARCH_RESULTS,
//     payload: documentSearchResult,
//   };
// }

export const getDocumentSuccess = documents => ({
  type: types.LOAD_DOCUMENT_SUCCESS,
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
      // dispatch(documentsSearched(res.body.documents.rows));
      // Materialize.toast(res.body.message, 4000, 'rounded');
      // browserHistory.push('/search');
    });
  };
}
