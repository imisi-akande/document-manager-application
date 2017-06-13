import React, { propTypes } from 'react';
import { Modal, Button, Row, Input } from 'react-materialize';
import { connect } from 'react-redux';
import moment from 'moment';
import * as roleAction from '../../actions/RoleAction';

import Prompt from '../common/Prompt';

const RoleListRow = (props) => {
  const { role, deleteRoles } = props;
  const getDeleteRoles = (roleId) => {
    deleteRoles(roleId);
  };


  return (
    <tr>
      <td className="role-title">{role.title}</td>
      <td>{moment(role.createdAt).format('MMMM Do YYYY')}</td>
      <td>{moment(role.updatedAt).format('MMMM Do YYYY')}</td>
      <td>{role.title !== 'admin' && role.title !== 'regular' ? <Prompt
        trigger={
          <Button
            waves="light"
            className="btn-floating btn-large red darken-2 right"
          >
            <i className="large material-icons">delete</i>
          </Button>
                  }
        onClickFunction={
                    (e) => { getDeleteRoles(role.id); }
                  }
      /> : ''}</td>
    </tr>
  );
};
RoleListRow.propTypes = {
  deleteRoles: React.PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => ({
  deleteRoles: roleId => dispatch(roleAction.deleteRoles(roleId))
});

const mapStateToProps = state => ({
  roleId: state.roleId
});

export default connect(mapStateToProps, mapDispatchToProps)(RoleListRow);
export { RoleListRow };
