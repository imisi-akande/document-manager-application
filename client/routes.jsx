// react route
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './container/App';
import LandingPage from './components/common/LandingPage';
import login from './components/authentication/Login';
import register from './components/authentication/SignUp';
import RolePage from './container/RolePage';
import manageRolePage from './container/ManageRolePage';
import UserPage from './container/UserPage';
import manageUserPage from './container/ManageUserPage';
import documentContainer from '../client/container/DocumentContainer';
import documentPage from '../client/container/DocumentPage';
import myDocumentPage from '../client/container/MyDocumentPage';
import EditUser from '../client/components/user/EditUser';
import alreadyAuthenticated from './util/AlreadyAuthenticated';


const logUserOut = () => {
  localStorage.removeItem('dms-user');
  window.location = '/';
};

export default (
  <Route path="/" component={App}>
    <IndexRoute component={alreadyAuthenticated(LandingPage)} />
    <Route path="signup" component={alreadyAuthenticated(register)} />
    <Route path="login" component={login} />
    <Route path="roles" component={RolePage} />
    <Route path="createdoc" component={documentContainer} />
    <Route path="role" component={manageRolePage} />
    <Route path="role/:id" component={manageRolePage} />
    <Route path="users" component={UserPage} />
    <Route path="user" component={manageUserPage} />
    <Route path="logout" onEnter={logUserOut} />
    <Route path="documents" component={documentPage} />
    <Route path="documents/:id" component={documentContainer} />
    <Route path="mydocuments" component={(myDocumentPage)} />
    <Route path="myprofile" component={EditUser} />
  </Route>
);
