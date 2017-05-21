import request from 'superagent';
import { SEARCH_RESULTS } from './types';
/**
 * userSearchResult
 * @param  {object} users user reponse from api call
 * @return {object}      action type and action payload
 */
export function usersSearched(userSearchResult) {
  return {
    type: SEARCH_RESULTS,
    payload: userSearchResult,
  };
}
/**
 * search user function,
 * GET /search/users/?term={term}
 * @param  {String} term   search term
 * @param  {number} limit  limit of records to be returned
 * @param  {numebr} offset offset of user data
 * @return {object}        reponse from the api
 */
export function searchUsers(queryString) {
  const token = window.localStorage.getItem('dms-user');
  return dispatch => {
    request
   .get(`/api/search/users/?q=${queryString}`)
   .set({ 'x-access-token': token })
      .then((res) => {
        console.log(res);
        dispatch(usersSearched(res.body.users.rows));
      });
  };
}
