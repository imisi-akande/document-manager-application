import { combineReducers } from 'redux';
import documents from './documentReducer';
import roles from './roleReducer';
import user from './userReducer';
import searchReducers from './searchReducers';
import setCurrentUser from '../reducers/SetCurrentUser';

const rootReducer = combineReducers({
  roles,
  user,
  documents,
  searchReducers,
  setCurrentUser
});
export default rootReducer;
