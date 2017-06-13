import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as roleActions from '../actions/RoleAction';
import RoleForm from '../components/role/RoleForm';

/**
 *
 *
 * @class ManageRolePage
 * @extends {React.Component}
 */
class ManageRolePage extends React.Component {

  /**
   * Creates an instance of ManageRolePage.
   *
   * @param {object} props
   * @memberOf ManageRolePage
   */
  constructor(props) {
    super(props);
    this.state = {
      role: Object.assign({}, this.props.role),
      errors: {},
      saving: false
    };
    this.updateRoleState = this.updateRoleState.bind(this);
    this.saveRole = this.saveRole.bind(this);
  }

  /**
   *update roles
   *
   * @param {object} event
   * @returns{object} object
   *
   * @memberOf ManageRolePage
   */
  updateRoleState(event) {
    const field = event.target.name;
    const role = this.state.role;
    role[field] = event.target.value;
    return this.setState({ role });
  }

  /**
   *Save role
   *
   * @param {object} event
   * @returns{object} object
   * @memberOf ManageRolePage
   */
  saveRole(event) {
    event.preventDefault();
    this.props.saveRole(this.state.role);
    this.context.router.push('/');
    this.setState({ saving: true });
  }

  /**
   *
   *
   * @returns{object} object
   *
   * @memberOf ManageRolePage
   */
  render() {
    return (
      <div>
        <h5 style={{ marginLeft: '650px', marginTop: '50px' }}>Add Role</h5>
        <RoleForm
          role={this.state.role}
          onChange={this.updateRoleState}
          onSave={this.saveRole}
          error={this.state.error}
        />
      </div>
    );
  }
}

ManageRolePage.contextTypes = {
  router: PropTypes.object
};

ManageRolePage.propTypes = {
  saveRole: React.PropTypes.func.isRequired,
  role: React.PropTypes.func.isRequired,
};
/**
 *
 * @param {object} dispatch
 * @returns {object} object
 */
const mapDispatchToProps = dispatch => ({
  saveRole: role => dispatch(roleActions.roleSaver(role))
});
/**
 *dispatch document actions
 *
 * @param {object} state
 * @returns {object}object
 */
const mapStateToProps = () => {
  const role = { id: '', title: '', createdAt: '', updatedAt: '' };
  return {
    roles: role
  };
};

export { ManageRolePage };
export default connect(mapStateToProps, mapDispatchToProps)(ManageRolePage);
