import React, { PropTypes } from 'react';
import { Link, IndexLink, match} from 'react-router';
import jwtDecode from 'jwt-decode';
import Search from '../components/SearchDocument';

const renderIfLoggedIn = () => {
  const token = localStorage.getItem('dms-user');
	const userRoleId = token ? jwtDecode(token).roleId : null;
  if (token) {
    return (
			<ul id="nav-mobile" className=" right hide-on-med-and-down">
				<li>
					<Link to="/createdoc" activeClassName="active" className="right">Add Document</Link>
				</li>
				<li>
					{userRoleId===1 ? <Link to="/role" activeClassName="active" className="right">Add Role</Link> : ''}
				</li>
				<li>
				{userRoleId===1 ?	<Link to="/users" activeClassName="active" className="right">Add User</Link> : ''}
				</li>
				<li>
					{userRoleId===1 ?	<Link to="/roles" activeClassName="active" className="right">Roles</Link> : ''}
				</li>
				<li>
				{userRoleId===1 ?	<Link to="/users" activeClassName="active" className="right">Users</Link> : ''}
				</li>
        <li>
					<Link to="/documents" activeClassName="active" className="right">Documents</Link>
				</li>
				 <li>
					<Link to="/mydocuments" activeClassName="active" className="right">my Documents</Link>
				</li>
				<li>
					<Link to="/myprofile" activeClassName="active" className="right">My Profile</Link>
				</li>
		
	  
        <li>
					<Link to="/search" activeClassName="active" className="right">Search Documents</Link>
				</li>
				<li>
					<Link to="/search/users" activeClassName="active" className="right">Search Users</Link>
				</li>
				<li>
					<Link to="/logout" activeClassName="active" className="right">Logout
					</Link>
				</li>
			</ul>
  );
  }
  return (
		<ul id="nav-mobile" className="right hide-on-med-and-down">
			<li>
				<Link to="/" activeClassName="active" className="right">Home</Link>
			</li>
			<li>
				<Link to="/login" activeClassName="active" className="right">Login</Link>
			</li>
			<li>
				<Link to="/signup" activeClassName="active" className="right">Sign up</Link>
			</li>
		</ul>
  );
};
const Header = () => (
  <nav className="#004d40 teal darken-2">
  <div className="navbar nav-wrapper">
  <IndexLink to="/" activeClassName="active" className="brand-logo">smartDocx</IndexLink>
   	{renderIfLoggedIn()}
			</div>
		</nav>

  );
const searchOnChange = (e) =>{
	return e.target.value;
}
export default Header;
