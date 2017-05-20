import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';

const configureStore = (initialState) => {
  return createStore(
      rootReducer,
      initialState,
      compose(
        (applyMiddleware(thunk, reduxImmutableStateInvariant())),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      ));
};

export default configureStore();
