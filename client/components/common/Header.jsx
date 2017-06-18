import React from 'react';
import { Dropdown, Button, NavItem } from 'react-materialize';
import { Link, IndexLink } from 'react-router';
import jwtDecode from 'jwt-decode';

/**
* render if logged in
*
* @param {Object} props { token, userRoleId, userButton }
* @returns {Object} jsx object
*/
const renderIfLoggedIn = () => {
  const token = localStorage.getItem('dms-user');
  const userRoleId = token ? jwtDecode(token).roleId : null;
  const userButton = (
    <Button id="document-container1"className="right">USERS</Button>
  );
  const documentButton = (
    <Button id="document-container2"className="right">
      DOCUMENTS
    </Button>
  );

  if (token) {
    return (
      <div>
        <ul id="authenticated-nav" className="right hide-on-med-and-down">
          <li>
            <Dropdown trigger={userButton}>
              <NavItem>
                <Link
                  to="/myprofile"
                  activeClassName="active" id="myProfile"
                  className="right"
                >
                  My Profile
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/users" activeClassName="active" id="allUsers"
                  className="right"
                >
                  All Users
                </Link>
              </NavItem>
              <NavItem divider />

              {
                userRoleId === 1
                  ?
                    <NavItem>
                      <Link
                        to="/user"
                        activeClassName="active"
                        className="right"
                      >
                        Add User
                      </Link>
                    </NavItem>
                  :
                    null
              }
            </Dropdown>
          </li>

          <li>
            <Dropdown trigger={documentButton}>
              <NavItem>
                <Link
                  to="/createdoc"
                  id="create-doc"
                  activeClassName="active"
                  className="right"
                >
                  Add Document
                </Link>
              </NavItem>
              <NavItem divider />
              <NavItem>
                <Link
                  to="/documents"
                  activeClassName="active"
                  className="right"
                  id="all-documents"
                >
                  All Documents
                </Link>
              </NavItem>
              <NavItem divider />
              <NavItem>
                <Link
                  to="/mydocuments"
                  id="myDocuments"
                  activeClassName="active"
                  className="right"
                >
                  My Documents
                </Link>
              </NavItem>
              <NavItem divider />
            </Dropdown>
          </li>
          <li>
            {
              userRoleId === 1
                ?
                  <Link
                    to="/roles"
                    activeClassName="active"
                    className="right"
                    id="rolesButton"
                  >
                        Roles
                      </Link>
                :
                  null
            }
          </li>

          <li>
            <Link
              to="/logout"
              id="logOut"
              activeClassName="active"
              className="right"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  return (

    <ul id="unauthenticated-nav" className="right hide-on-med-and-down">

      <li>
        <Link
          to="/" activeClassName="active"
          className="right"
        >Home</Link>
      </li>

      <li>
        <Link
          to="/login" id="login" activeClassName="active"
          className="right"
        >Login</Link>
      </li>

      <li>
        <Link
          to="/signup" activeClassName="active"
          className="right"
          id="Signup"
        >Sign up</Link>
      </li>
    </ul>
  );
};


const Header = () => (
  <nav className="#004d40 teal darken-2">
    <div className="navbar nav-wrapper">

      <IndexLink
        to="/" activeClassName="active"
        className="brand-logo" id="logo"
      >smartDocx</IndexLink>
      {renderIfLoggedIn()}

    </div>
  </nav>

);
export default Header;
