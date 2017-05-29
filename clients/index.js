import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import '../node_modules/toastr/build/toastr.min';
// import '../client/styles/custom.scss';
import store from './store/configureStore';
// import {createRole, fetchRoles, saveRole} from './actions/';
// import { fetchUsers, userSaver, createUser, saveUser } from './actions/userAction';
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
