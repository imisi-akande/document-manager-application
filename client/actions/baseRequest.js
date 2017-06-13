import superagent from 'superagent';

const token = localStorage.getItem('dms-user');
const request = superagent.set({
  'x-access-token': token,
});

export default request;
