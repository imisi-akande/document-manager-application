import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import { browserHistory } from 'react-router';
import * as userActions from '../actions/userAction';
import UserList from '../components/UserList';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
  }

  redirectToRolePage() {
    browserHistory.push('/user');
  }

  componentDidMount() {
    const offset = 0;
    this.props.fetchUsers(offset);
  }

  render() {
    const pagination = null;
    const { users } = this.props;
    let paginationData;
    if (users.pagination) {
      paginationData = (<Pagination
          items={users.pagination.page_count} activePage={1} maxButtons={5}
          onSelect={(pageNo) => {
            const offset = (pageNo - 1) * 10;
            console.log(offset);
            this.props.fetchUsers(offset);
          }
        }
      />);
    }
    return (
      <div>
        <UserList usersList={users} />
        {users.roleId === 1 ?
          <input
            type="submit"
            value="Add new User"
            className="btn waves-effect waves-light teal darken-2"
            onClick={this.redirectToRolePage}
          /> : ''}
        {users.roleId === 1 ? paginationData : ''}
      </div>
    );
  }
}

User.PropTypes = {
  users: PropTypes.array.isRequired,
  fetchUsers: PropTypes.object
};

// we map our dispatch to custom saveUser props
const mapDispatchToProps = dispatch => ({
  saveUser: user => dispatch(userActions.saveUser(user)),
  fetchUsers: offset => dispatch(userActions.fetchUsers(offset))
});

const mapStateToProps = (state) => {
  return {
    users: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
