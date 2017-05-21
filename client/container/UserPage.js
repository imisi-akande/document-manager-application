import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pagination } from 'react-materialize';
import { browserHistory } from 'react-router';
import * as userActions from '../actions/userAction';
import UserList from '../components/UserList';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: {}
    };
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  redirectToRolePage() {
    browserHistory.push('/user');
  }

  onSelect(pageNo) {
    console.log('=====Hello');
    const offset = (pageNo - 1) * 10;
    this.props.actions.fetchAllUsers(offset);
  }

  componentWillMount() {
    this.props.actions.fetchAllUsers(0)
    .then(() => {
      this.setState({
        allUsers: this.props.allUsers[0]
      });
    });
  }

  render() {
    const allUsers = this.props.allUsers;
    console.log(this.state.allUsers, 'how');
    let users, pagination;
    if (allUsers && allUsers.users !== undefined) {
      users = allUsers.users.rows;
      pagination = allUsers.pagination;
    }
    // const users = allUsers.users.rows;
    // const pagination = allUsers.pagination;
    let paginationData;
    if (pagination) {
      paginationData = (
        <Pagination
          items={pagination.page_count} activePage={1} maxButtons={5}
          onSelect={this.onSelect}
        />
        );
    }
    // if (users.pagination) {
    return (
      <div>
        {
          users && users.length > 0 ?
          <UserList usersList={users} /> : <span>users</span>
        }
        <input
          type="submit"
          value="Add new User"
          className="btn waves-effect waves-light teal darken-2"
          onClick={this.redirectToRolePage}
        />
        {paginationData}
      </div>
    );
  }
}

User.propTypes = {
  allUsers: PropTypes.any.isRequired,
  actions: PropTypes.object.isRequired
};

// we map our dispatch to custom saveUser props
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});


const mapStateToProps = state => ({
  allUsers: state.allUsers
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
