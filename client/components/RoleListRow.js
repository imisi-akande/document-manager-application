import React, { propTypes } from 'react';
import {connect} from 'react-redux';
import * as roleAction from '../actions/roleAction';
import {Modal, Button, Row, Input} from 'react-materialize';
const RoleListRow = (props) => {
  
  const { role, deleteRole, deleteRoles } = props;
  const getDeleteRoles = (roleId)=>{
    deleteRoles(roleId);
  }
  
  return (
    
        <tr>
            <td>{role.title}</td>
            <td>{role.createdAt}</td>
            <td>{role.updatedAt}</td>
            <td><Button waves='light' onClick={(e)=>getDeleteRoles(role.id)} className="btn-floating btn-large red darken-2 right"><i className="large material-icons">delete</i></Button></td>
        </tr>
  );
};
const mapDispatchToProps = dispatch => ({
  deleteRoles: roleId => dispatch(roleAction.deleteRoles(roleId))
});

// const mapStateToProps =(state)=>{
//     return {
//       roleId : state.roleId
//     };
// }

export default connect(null, mapDispatchToProps)(RoleListRow);