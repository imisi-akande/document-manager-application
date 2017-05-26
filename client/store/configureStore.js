import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createStore, applyMiddleware, compose } from 'redux';
import jwtDecode from 'jwt-decode';
import rootReducer from '../reducers';
import setCurrentUser from '../actions/AuthAction';

const store = createStore(
      rootReducer,
      compose(
        (applyMiddleware(thunk, reduxImmutableStateInvariant())),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      ));

if (localStorage['dms-user']) {
  store.dispatch(setCurrentUser(jwtDecode(localStorage['dms-user'])));
}

export default store;
