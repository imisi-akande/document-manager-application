import React, { propTypes } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import * as roleAction from '../actions/roleAction';
import {Modal, Button, Row, Input} from 'react-materialize';
import Prompt from '../components/Prompt';

const RoleListRow = (props) => {
  
  const { role, deleteRoles } = props;
  const getDeleteRoles = (roleId)=>{
    deleteRoles(roleId);
  }
  
                
  return (
        <tr>
            <td>{role.title}</td>
            <td>{role.createdAt}</td>
            <td>{moment(role.updatedAt).format('MMMM Do YYYY')}</td>
            <td>{role.title !== 'admin' && role.title !== 'regular' ? <Prompt
                  trigger={
                    <Button waves='light' 
                    className="btn-floating btn-large red darken-2 right">
                      <i className="large material-icons">delete</i>
                    </Button>
                  }
                  onClickFunction={
                    (e) => {getDeleteRoles(role.id)}
                  }
                /> : ''}</td>
        </tr>
  );
};
const mapDispatchToProps = dispatch => ({
  deleteRoles: roleId => dispatch(roleAction.deleteRoles(roleId))
});

const mapStateToProps =(state)=>{
    return {
      roleId : state.roleId
    };
}

export default connect(null, mapDispatchToProps)(RoleListRow);