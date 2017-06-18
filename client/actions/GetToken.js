/**
 * Get Token from local storage
 *
 * @export
 * @param {object}  newly generate token
 * @returns {object} token
 */
const getToken = () => localStorage.getItem('dms-user');

export default getToken;
