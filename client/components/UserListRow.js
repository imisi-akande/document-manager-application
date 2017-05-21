import React, { propTypes } from 'react';
import {Modal, Button, Row, Input, Pagination} from 'react-materialize';
import {connect} from 'react-redux';
import { link } from 'react-router';
import * as UserAction from '../actions/userAction';

class UserListRow extends React.Component{
constructor (props) {
        super(props);
        this.state = {
        id: this.props.user.id,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        userName: this.props.user.userName,
        email: this.props.user.email,
        roleId: this.props.user.roleId
      };

      this.onChange = this.onChange.bind(this);
      }
      onChange(e) {
        return this.setState({ [e.target.name]: e.target.value });
        console.log('aunty mercy', this.state);
      }
    deleteUser(id) {
      this.props.deleteUser(id);
    }
    onSubmit(e){
    e.preventDefault();
     const { updateUser } = this.props;
     const { deleteUser } = this.props;
     const userId = e.target.id.value;
     const firstName = e.target.firstName.value;
     const lastName = e.target.lastName.value;
     const userName = e.target.userName.value;
     const email = e.target.email.value
     const roleId = e.target.roleId.value;
     const userDetails = {userId,firstName, lastName, userName, email, roleId};
     updateUser(userDetails);
     deleteUser(userDetails);
  }
  render () {
   const user = this.props.user;
  //  pagination = this.props.userDetails.pagination;
    return (
        <tr>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.userName}</td>
            <td>{user.email}</td>
            <td>{user.roleId === 1 ? 'Admin' : user.roleId === 2 ?
               'regular' : 'Guest'}</td>
             <Modal
                    header='Edit User'
                    trigger={
                    <td><Button waves='light' 
                    className="btn-floating btn-large teal darken-2">
                    <i className="large material-icons">mode_edit</i>
                    </Button></td>
             }>
              <form className="col s12" method="post" onSubmit={(e) => 
                this.onSubmit(e)} >
                   <Row>
                      <Input s={6}  value="USER ID" />
                      <Input s={6} name = "id" value={user.id} />
                  </Row>
                  <Row>
                      <Input s={6} label="firstName"  name="firstName" 
                      value={this.state.firstName} onChange={this.onChange}  />
                      <Input  s={6} label="lastName" name = "lastName"  
                      value={this.state.lastName} onChange={this.onChange} />
                  </Row>
                  <Row>
                      <Input s={6} label="userName" name = "userName" 
                      value={this.state.userName} onChange={this.onChange}  />
                      <Input  s={6} label="email" name = "email" 
                      label = "email" value={this.state.email} 
                      onChange={this.onChange} />
                  </Row>
                  <Row>
                      <Input s={6} label="roleId" name = "roleId" 
                      value={this.state.roleId} onChange={(e) => 
                      this.onChange(e)}  />
                  </Row>

                  <Button className="teal darken-2" waves='light' 
                  type="submit">UPDATE</Button>
                </form>
                </Modal>
               <td> <Button waves='light' onClick={(e) =>
                  this.deleteUser(user.id)}  
                  className="btn-floating btn-large red darken-2 right">
                  <i className="large material-icons">delete</i></Button></td>
        </tr>
    );

};

  }

const mapDispatchToProps = dispatch => ({
  updateUser: userDetails => dispatch(UserAction.updateUser(userDetails)),
  deleteUser: id => dispatch(UserAction.deleteUser(id))
});

const mapStateToProps = (state) => {
  return {
    userDetails: state.user
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserListRow);




