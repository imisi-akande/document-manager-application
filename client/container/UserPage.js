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
  }

  redirectToRolePage() {
    browserHistory.push('/user');
  }

  componentWillMount() {
    this.props.actions.fetchAllUsers()
    .then(() => {
      this.setState({
        allUsers: this.props.allUsers[0]
      });
    });
  }

  render() {
    const allUsers = this.props.allUsers[0];
    console.log(this.state.allUsers);
    let users, pagination;
    if (allUsers && allUsers.users !== undefined){
      users = allUsers.users.rows;
      pagination = allUsers.pagination;
      console.log('how are you');
   }
    // const users = allUsers.users.rows;
    // const pagination = allUsers.pagination;
    let paginationData;
    if (pagination) {
      paginationData = (
      <Pagination
          items={pagination.page_count} activePage={1} maxButtons={5}
          onSelect={(pageNo) => {
            {/*console.log(pageNo,"PageNo");*/}
            const offset = (pageNo - 1) * 10;
            {/*console.log(offset);*/}
            this.props.fetchUsers(offset);
          }
        }
        />);
    }
    // if (users.pagination) {
    return (
      <div>
        {users && users.length > 0 ?
          <UserList usersList={users} /> : <span>Emi jesus</span>}
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

User.PropTypes = {
  users: PropTypes.array.isRequired,
  fetchUsers: PropTypes.object
};

// we map our dispatch to custom saveUser props
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};


const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
