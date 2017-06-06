import React, { propTypes } from 'react';
import { Modal, Button, Row, Input, Pagination, Table } from 'react-materialize';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router';
import * as userAction from '../../actions/UserAction';

/**
 *
 *
 * @class EditUsers
 * @extends {React.Component}
 */
class EditUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userId: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        roleId: ''
      },
      isEditing: false
    };

    this.token = window.localStorage.getItem('token');
    this.onChange = this.onChange.bind(this);
    this.isEditing = this.isEditing.bind(this);
  }

  /**
   *
   *
   * @param {any} event
   * @returns
   *
   * @memberOf EditUsers
   */
  onChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user });
  }

  /**
   *
   *
   *
   * @memberOf EditUsers
   */
  componentWillMount() {
    const { currentUser } = this.props;
    const newState = this.state.user;

    this.props.fetchProfile(currentUser.userId)
      .then(() => {
        newState.userId = this.props.user[1].id;
        newState.firstName = this.props.user[1].firstName;
        newState.lastName = this.props.user[1].lastName;
        newState.userName = this.props.user[1].userName;
        newState.email = this.props.user[1].email;
        newState.roleId = currentUser.roleId;

        this.setState({
          newState
        });
      });
  }

  /**
   *
   *
   * @param {any} event
   *
   * @memberOf EditUsers
   */
  onSubmit(event) {
    const { currentUser } = this.props;
    event.preventDefault();
    const { editUser } = this.props;
    const userData = this.state.user;
    editUser(currentUser.userId, userData);
    this.isEditing();
  }

  /**
   *
   *
   *
   * @memberOf EditUsers
   */
  isEditing() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  render() {
    const userDetails = this.state.user;
    const isEditing = this.state.isEditing;
    return (
      <div>
        {isEditing ?
          <table className="table striped">
            <thead>
              <tr>
                <th>first Name</th>
                <th>lastName</th>
                <th>userName</th>
                <th>email</th>
                <th>role Id</th>
              </tr>
            </thead>

            <tr>
              <td><Input
                s={6} label="firstname" name="firstName"
                value={userDetails.firstName} onChange={this.onChange}
              /></td>
              <td><Input
                s={6} label="lastName" name="lastName"
                value={userDetails.lastName} onChange={this.onChange}
              /></td>
              <td><Input
                s={6} label="userName" name="userName"
                value={userDetails.userName} onChange={this.onChange}
              /></td>
              <td><Input
                s={6} label="email" name="email"
                label="email" value={userDetails.email}
                onChange={this.onChange}
              /></td>
              <td>{userDetails.roleId === 1 ? 'Admin' :
                userDetails.roleId === 2 ? 'regular' : 'Guest'}
              </td>
              <td><Button
                waves="light"
                onClick={e => this.onSubmit(e)}
                className="btn-large teal darken-2"
              >
                <i className="large material-icons">
                  mode_edit</i> Save</Button></td>
            </tr>
          </table> :
          <table className="table striped">
            <thead>
              <tr>
                <th>first Name</th>
                <th>lastName</th>
                <th>userName</th>
                <th>email</th>
                <th>role Id</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userDetails.firstName}</td>
                <td>{userDetails.lastName}</td>
                <td>{userDetails.userName}</td>
                <td>{userDetails.email}</td>
                <td>{userDetails.roleId === 1 ? 'Admin' : userDetails.roleId === 2 ? 'regular' : 'Guest'}</td>
                <td><Button
                  waves="light"
                  onClick={this.isEditing}
                  className="btn-floating btn-large teal darken-2"
                >
                  <i className="large material-icons">
                    mode_edit</i></Button></td>
              </tr>
            </tbody>
          </table>
        }
      </div>
    )
      ;
  }
}


EditUsers.propTypes = {
  user: React.PropTypes.array.isRequired
};

const mapStoreToProps = (state) => ({
  currentUser: state.user[0],
  user: state.user
});
const mapDispatchToProps = dispatch => ({
  fetchProfile: userId =>
    dispatch(userAction.fetchProfile(userId)),
  editUser: (userId, userData) =>
    dispatch(userAction.editUser(userId, userData)),
});

export default connect(mapStoreToProps, mapDispatchToProps)(EditUsers);
