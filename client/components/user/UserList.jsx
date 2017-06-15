import React from 'react';
import { connect } from 'react-redux';
import UserListRow from './UserListRow';
import { searchUsers } from '../../actions/SearchUserAction';


/**
 * render list
 *
 * @class renderList
 * @extends {React.Component}
 */
class renderList extends React.Component {

  /**
   * Creates an instance of renderList.
   * @param {any} props
   *
   * @memberOf renderList
   */
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }

  /**
   * On seacrh selector
   *
   * @param {object} e
   * @returns {object}object
   *
   * @memberOf renderList
   */
  onSearch(e) {
    const queryString = e.target.value;
    return this.props.searchUsers(queryString);
  }

  /**
   * renders user list
   *
   * @returns{object}object
   *
   * @memberOf renderList
   */
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

              {usersList.map(user =>
                <UserListRow user={user} key={user.id} />
    )}
            </tbody>
          </table>
          {this.props.pagination}
        </div>
      </div>
    );
  }
}

renderList.propTypes = {
  searchUsers: React.PropTypes.func.isRequired,
  usersList: React.PropTypes.array.isRequired,
  pagination: React.PropTypes.object
};


export default connect(null, { searchUsers })(renderList);
