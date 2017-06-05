import React, { propTypes } from 'react';
import { connect } from 'react-redux';
import UserListRow from './UserListRow';
import {Pagination} from 'react-materialize';
import { searchUsers } from '../../actions/SearchUserAction';

class renderList extends React.Component {
constructor(props) {
  super(props);
  this.onSearch = this.onSearch.bind(this);
}
onSearch(e) {
  console.log('our event', e);
  const queryString = e.target.value;
  return this.props.searchUsers(queryString);
}
render() {
 const { usersList } = this.props;
  if (usersList.length === 0) {
    return (
     <div className="">
      <h1> No Users </h1>
     </div>
    );
  }

  return (
    <div>
      <input
        id="doc-search"
        type="search"
        placeholder="search for users here..."
        onChange={this.onSearch} name="search"
    />

    <div>
   <table className="table striped">
     <thead>
       <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>User Name</th>
      <th>Email</th>
      <th>Role</th>
     </tr>
   </thead>
   <tbody>

    {usersList.map((user) =>
      <UserListRow user={user} key={user.id} />
    )}
  </tbody>
  </table>
 }
  </div>
</div>
  );
}
}

renderList.propTypes = {
  searchUsers: React.PropTypes.func.isRequired
};


export default connect(null, { searchUsers })(renderList);
