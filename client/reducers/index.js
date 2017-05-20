import { combineReducers } from 'redux';
import documents from './documentReducer';
import roles from './roleReducer';
import user from './userReducer';
import search from './search';

const rootReducer = combineReducers({
  roles,
  user,
  documents,
  search
});
export default rootReducer;
