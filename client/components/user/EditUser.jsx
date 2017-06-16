import React from 'react';
import { Button, Input } from 'react-materialize';
import { connect } from 'react-redux';
import * as userAction from '../../actions/UserAction';

/**
 *
 *
 * @class EditUsers
 * @extends {React.Component}
 */
class EditUsers extends React.Component {

  /**
   * Creates an instance of EditUsers.
   *
   * @param {object} props
   * @memberOf EditUsers
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userId: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        roleId: '',
        password: '',
        confirmPassword: ''

      },
      isEditing: false
    };

    this.token = window.localStorage.getItem('token');
    this.onChange = this.onChange.bind(this);
    this.isEditing = this.isEditing.bind(this);
  }


  /**
   * @returns {Undefined} nothing
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
   * onChange event
   *
   * @param {object} event
   * @returns{object}object
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
   * @param {object} event
   *@returns{object}object
   * @memberOf EditUsers
   */
  onSubmit(event) {
    const { currentUser } = this.props;
    event.preventDefault();
    const { editUser } = this.props;
    const userData = this.state.user;
    if (this.state.user.password === this.state.user.confirmPassword) {
      editUser(currentUser.userId, userData);
    } else {
      Materialize.toast('Passwords do not match', 4000, 'rounded');
    }
    this.isEditing();
  }

  /**
   *Edit user
   *
   *@param {object} event
   *@returns{object}object
   * @memberOf EditUsers
   */
  isEditing() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  /**
   * render edit user
   *
   * @return{object}object
   *
   * @memberOf EditUsers
   */
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
                <th>password</th>
                <th>confirmPassword</th>
                <th>role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Input
                  s={6} name="firstName"
                  value={userDetails.firstName} onChange={this.onChange}
                /></td>
                <td><Input
                  s={6} name="lastName"
                  value={userDetails.lastName} onChange={this.onChange}
                /></td>
                <td><Input
                  s={6}name="userName"
                  value={userDetails.userName} onChange={this.onChange}
                /></td>
                <td><Input
                  s={6} name="email"
                  value={userDetails.email}
                  onChange={this.onChange}
                /></td>
                <td><Input
                  s={6} name="password"
                  value={userDetails.password}
                  onChange={this.onChange}
                  type="password"
                /></td>
                <td><Input
                  s={6} name="confirmPassword"
                  value={userDetails.confirmPassword}
                  onChange={this.onChange}
                  type="password"
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
            </tbody>
          </table> :
          <table className="table striped">
            <thead>
              <tr>
                <th>first Name</th>
                <th>lastName</th>
                <th>userName</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userDetails.firstName}</td>
                <td>{userDetails.lastName}</td>
                <td>{userDetails.userName}</td>
                <td>{userDetails.email}</td>
                <td>{userDetails.roleId === 1 ? 'Admin'
                  : userDetails.roleId === 2 ? 'regular' : 'Guest'}</td>
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
  user: React.PropTypes.array.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  editUser: React.PropTypes.func.isRequired,
  fetchProfile: React.PropTypes.func.isRequired
};

const mapStoreToProps = state => ({
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
