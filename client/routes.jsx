import React from 'react';
import { Route, browserHistory, IndexRoute , match } from 'react-router';
import App from './container/App';
import LandingPage from './components/common/LandingPage';
import Header from './components/common/Header';
import Login from './components/authentication/Login';
import Register from './components/authentication/SignUp';
import RolePage from './container/RolePage';
import ManageRolePage from './container/ManageRolePage';
import UserPage from './container/UserPage';
import ManageUserPage from './container/ManageUserPage';
import DocumentContainer from '../client/container/DocumentContainer';
import DocumentPage from '../client/container/DocumentPage';
import DocumentForm from '../client/components/document/DocumentForm';
import Search from '../client/components/search/SearchDocument';
import SearchUsers from './components/search/SearchUsers';
import OwnDocumentList from '../client/components/document/OwnDocumentList';
import EditUser from '../client/components/user/EditUser';

const logUserOut = (nextState, replace, done) => {
  localStorage.removeItem('dms-user');
  window.location = '/';
};

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
  <Route path="signup" component={Register}/>
    <Route path="login" component={Login}/>
    <Route path="roles" component={RolePage} />
    <Route path="createdoc" component={DocumentContainer} />
    <Route path="role" component={ManageRolePage} />
    <Route path="role/:id" component={ManageRolePage} />
    <Route path="users" component={UserPage} />
    <Route path="signups" component={ManageUserPage} />
    <Route path="user" component={ManageUserPage} />
    <Route path="logout" onEnter={logUserOut} />
    <Route path="documents" component={DocumentPage} />
    <Route path="documents/:id" component={DocumentContainer} />
    <Route path="mydocuments" component={OwnDocumentList} />
    <Route path="search" component={Search} />
    <Route path="search/users" component={SearchUsers}/>
    <Route path="myprofile" component={EditUser}/>
  </Route>
);
