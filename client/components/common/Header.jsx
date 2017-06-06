import React from 'react';
import { Dropdown, Button, NavItem } from 'react-materialize';
import { Link, IndexLink } from 'react-router';
import jwtDecode from 'jwt-decode';

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
  const rolesButton = (
    <Button id="document-container3"className="right">ROLES</Button>
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
                  activeClassName="active"
                  className="right"
                >
                  My Profile
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/users" activeClassName="active" className="right">
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
                >
                  All Documents
                </Link>
              </NavItem>
              <NavItem divider />
              <NavItem>
                <Link
                  to="/mydocuments"
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
                  <Dropdown trigger={rolesButton}>
                    <NavItem>
                      <Link
                        to="/role"
                        activeClassName="active"
                        className="right"
                      >
                        Add Role
                      </Link>
                    </NavItem>
                    <NavItem divider />
                    <NavItem>
                      <Link
                        to="/roles"
                        activeClassName="active"
                        className="right"
                      >
                        Roles
                      </Link>
                    </NavItem>
                  </Dropdown>
                :
                  null
            }
          </li>

          <li>
            <Link to="/logout" activeClassName="active" className="right">
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
          to="/login" activeClassName="active"
          className="right"
        >Login</Link>
      </li>

      <li>
        <Link
          to="/signup" activeClassName="active"
          className="right"
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
        className="brand-logo"
      >smartDocx</IndexLink>
      {renderIfLoggedIn()}

    </div>
  </nav>

);
export default Header;
