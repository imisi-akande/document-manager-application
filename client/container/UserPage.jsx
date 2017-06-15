import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pagination } from 'react-materialize';
import { browserHistory } from 'react-router';
import * as userActions from '../actions/UserAction';
import UserList from '../components/user/UserList';


/**
 * User Page
 *
 * @class User
 * @extends {React.Component}
 */
class User extends React.Component {

  /**
   * Creates an instance of User.
   * @param {any} props
   *
   * @memberOf User
   */
  constructor(props) {
    super(props);
    this.state = {
      allUsers: {}
    };
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  /**
   *
   *
   *@returns {object}object
   * @memberOf User
   */
  redirectToRolePage() {
    browserHistory.push('/user');
  }

  /**
   *Onselect pageNo
   *
   * @param {Number} pageNo
   *@returns{object}object
   * @memberOf User
   */
  onSelect(pageNo) {
    const offset = (pageNo - 1) * 10;
    this.props.actions.fetchAllUsers(offset);
  }

  /**
   *
   *@returns{object}object
   *
   * @memberOf User
   */
  componentWillMount() {
    this.props.actions.fetchAllUsers(0)
    .then(() => {
      this.setState({
        allUsers: this.props.allUsers[0]
      });
    });
  }

  /**
   *
   *
   * @returns{object}object
   *
   * @memberOf User
   */
  render() {
    const allUsers = this.props.allUsers;
    let users, pagination;
    if (allUsers && allUsers.users !== undefined) {
      users = allUsers.users.rows;
      pagination = allUsers.pagination;
    }

    let paginationData;
    if (pagination) {
      paginationData = (
        <Pagination
          items={pagination.page_count} activePage={1} maxButtons={5}
          onSelect={this.onSelect}
        />
        );
    }

    return (
      <div>
        {
          users && users.length > 0 ?
            <UserList usersList={users} pagination={paginationData} />
            :
            <div className="row center-align">
              <div style={{ padding: '20px' }} />
              <h5>Sorry, user name does not match</h5> <br />
              <h5><a href="/users">Click here to search for another user
              </a></h5>
            </div>
        }
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
