import React, { PropTypes, Component } from 'react';
import {Modal, Button, Row, Icon, Input, Pagination} from 'react-materialize';
import {  searchUsers } from '../actions/searchUserAction';
import {Link} from 'react-router';
import Userlist from '../components/UserList';
import UserListRow from './UserListRow';
import moment from 'moment';
import  * as SearchAction from '../actions/SearchDocumentActions';
import { connect } from 'react-redux';
import imagePath from '../img/cardReveal.jpg';

class SearchUser extends Component {
  constructor(props) {
    super(props);
     this.state = {
        id: '',
        firstName:  '',
        lastName: '',
        userName: '',
        email: '',
        roleId: ''
      };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderResults = this.renderResults.bind(this);
    this.state = {
      clicked: false,
    };
  }
  
  onSubmit(event){
    event.preventDefault();
    this.props.searchUsers(this.state.search);
    this.setState({ clicked: true });
    console.log(this.state.search,'gooooooooo');
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  renderResults() {
    let resultTable = null;
    let mappedResult;
      mappedResult = this.props.results.map((users) =>
        <UserListRow key={users.id} user={users} />
      )
      resultTable = (
        <div>
        <table className="table striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {mappedResult}
          </tbody>
        </table>
        </div>
      );
    // }
    return (
      <div>
      <ul>
        {
          (!this.props.results)
          ?
            <h1> No Users </h1>
          :
            resultTable
        }
      </ul>
       </div>
    )
  }

  render() {
    let pagination = null;
    console.log('props', this.props.results);

    let resultTable = null;
    let mappedResult;
    if (this.props.results) {
      mappedResult = this.props.results.map((users) =>
        <UserListRow key={users.id} user={users} />
      )
      resultTable = (
        <table className="table striped">
          <thead>
            <tr>
              <th>id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {mappedResult}
          </tbody>
        </table>
      );
       pagination = this.props.results.pagination;
    }
   {pagination ? <Pagination items={pagination.page_count} activePage={2} 
   maxButtons={5} onSelect={(e)=>this.onSelect(e)}/> : ''}
     
    return (
      <div className = "row">
        <h5 className="green-text">Search for Users Here..</h5>
        <div>
          <Input
            id="search"
            s={6}
            label="Search"
            name="search"
            validate
            onChange={(e) => this.onChange(e)}
            className="search">
            <Icon style={{ color: 'white' }} >search</Icon>
          </Input> <br/>
          <Button type="submit" name="action" onClick={this.onSubmit}>Click Here
          <i className="material-icons right">send</i>
          </Button>  <br/><br/><br/>
        </div>
        <div>
          {this.state.clicked ? this.renderResults() : null}
        </div>
      </div>
    ) 
  }
}
function mapStateToProps(state) {
   console.log(state.search, 'hiiiii')
  return {
    results: state.searchReducers.results,
  };
}
function mapDispatchToProps(dispatch) {
  searchDocuments: (searchTerm) => dispatch(searchDocuments(searchTerm));
}
export default connect(mapStateToProps, { searchUsers })(SearchUser);
