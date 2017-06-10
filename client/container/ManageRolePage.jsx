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
   * @param {any} props
   *
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
   *
   *
   * @param {any} event
   * @returns{any} any
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
   *
   *
   * @param {any} event
   * @returns{any} any
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
   * @returns{any} any
   *
   * @memberOf ManageRolePage
   */
  render() {
    return (
      <div>
        <h5>Add Role</h5>
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
  role: React.PropTypes.object.isRequired,
  saveRole: React.PropTypes.func.isRequired,
};
/**
 *
 * @param {any} dispatch
 * @returns {any} any
 */
const mapDispatchToProps = dispatch => ({
  saveRole: role => dispatch(roleActions.roleSaver(role))
});
/**
 *
 * dispatch document actions
 * @param {any} state
 * @returns {any}any
 */
const mapStateToProps = () => {
  const role = { id: '', title: '', createdAt: '', updatedAt: '' };
  return {
    roles: role
  };
};

export { ManageRolePage };
export default connect(mapStateToProps, mapDispatchToProps)(ManageRolePage);
