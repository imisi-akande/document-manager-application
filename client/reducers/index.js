import { combineReducers } from 'redux';
import documents from './documentReducer';
import roles from './roleReducer';
import user from './AuthReducer';
import allUsers from './userReducer';
import search from './SearchReducer';

const rootReducer = combineReducers({
  roles,
  user,
  documents,
  search,
  allUsers
});
export default rootReducer;
