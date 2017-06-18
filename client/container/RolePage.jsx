import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as roleAction from '../actions/RoleAction';
import RoleList from '../components/role/RoleList';

/**
 *
 *
 * @class Role
 * @extends {React.Component}
 */
class Role extends React.Component {

  /**
   * Creates an instance of Role.
   * @param {obect} props
   *
   * @memberOf Role
   */
  constructor(props) {
    super(props);
    this.state = {
      roles: ''
    };
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
  }
 /**
  *delete role
  *
  * @param {number} id
  *@returns{object}object
  * @memberOf Role
  */
  deleteRole(id) {
    this.props.deleteRole(id);
  }
  /**
   *load roles
   *
   * @memberOf Role
   * @returns {object}object
   */
  componentWillMount() {
    this.props.loadRoles();
  }
/**
 *redirect role page
 *
 *@returns {object} object
 * @memberOf Role
 */
  redirectToRolePage() {
    browserHistory.push('/role');
  }

  /**
   *renders rolelist
   *
   * @returns{object} object
   *
   * @memberOf Role
   */
  render() {
    const { roles } = this.props;
    return (
      <div className="container">
        { roles ? <RoleList
          roles={roles} deleteRole={this.props.deleteRole}
        /> : ''}
        <input
          id="addRole"
          type="submit"
          value="Add Role"
          className="btn green darken-4"
          onClick={this.redirectToRolePage}
        />
      </div>
    );
  }
}

Role.propTypes = {
  roles: PropTypes.array.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createRole: role => dispatch(roleAction.roleSaver(role)),
  loadRoles: () => dispatch(roleAction.fetchRoles()),
});

/**
 * map state to props
 *
 * @param {object} state
 * @returns {object} -h
 */
const mapStateToProps = state => ({
  roles: state.roles
});

export { Role };
export default connect(mapStateToProps, mapDispatchToProps)(Role);

