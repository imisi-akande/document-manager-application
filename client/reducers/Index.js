import { combineReducers } from 'redux';
import documents from './DocumentReducer';
import roles from './RoleReducer';
import user from './AuthReducer';
import allUsers from './UserReducer';
import search from './SearchReducer';

const rootReducer = combineReducers({
  roles,
  user,
  documents,
  search,
  allUsers
});
export default rootReducer;
