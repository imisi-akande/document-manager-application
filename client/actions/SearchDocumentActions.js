import { browserHistory } from 'react-router';
import request from 'superagent';
import { SEARCH_RESULTS } from './Types';


/**
 * userSearchResult
 * @param  {object} users user reponse from api call
 * @return {object}      action type and action payload
 */
export function documentsSearched(documentSearchResult) {
  return {
    type: SEARCH_RESULTS,
    payload: documentSearchResult,
  };
}

/**
 * search document function,
 * GET /search/documents/?term={term}
 * @param  {String} term   search term
 * @param  {number} limit  limit of records to be returned
 * @param  {numebr} offset offset of document data
 * @return {object}        reponse from the api
 */
export function searchDocuments(queryString) {
  const token = window.localStorage.getItem('dms-user');
  return (dispatch) => {
    request
    .get(`/api/search/documents/?q=${queryString}`)
    .set({ 'x-access-token': token })
    .end((err, res) => {
      Materialize.toast(res.body.message, 4000, 'rounded');
      dispatch(documentsSearched(res.body.documents.rows));
      browserHistory.push('/search');
    });
  };
}
