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
  constructor(props) {
    super(props);
    this.state = {
      roles: ''
    };
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
  }
 /**
  *
  *
  * @param {any} id
  *
  * @memberOf Role
  */
  deleteRole(id) {
    this.props.deleteRole(id);
  }
  /**
   *
   *
   *
   * @memberOf Role
   */
  componentWillMount() {
    this.props.loadRoles();
  }
/**
 *
 *
 *
 * @memberOf Role
 */
  redirectToRolePage() {
    browserHistory.push('/role');
  }

  /**
   *
   *
   * @returns
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
  deleteRole: PropTypes.array.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createRole: role => dispatch(roleAction.roleSaver(role)),
  loadRoles: () => dispatch(roleAction.fetchRoles()),
});

/**
 *
 *
 * @param {any} state
 * @returns {any} -h
 */
const mapStateToProps = state => ({
  roles: state.roles
});

export default connect(mapStateToProps, mapDispatchToProps)(Role);

