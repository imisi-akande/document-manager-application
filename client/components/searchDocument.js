import React, { PropTypes, Component } from 'react';
import {Modal, Button, Row, Icon, Input, Pagination} from 'react-materialize';
import {  searchDocuments } from '../actions/SearchDocumentActions';
import {Link} from 'react-router';
import DocumentTitle from '../components/DocumentListTitle';
import moment from 'moment';
import DocumentContent from '../components/DocumentContent';
import  * as DocumentAction from '../actions/DocumentActions';
import { connect } from 'react-redux';
import imagePath from '../img/cardReveal.jpg';
import renderHTML from 'react-render-html';

class Search extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {title:"",
                 content:""}
  }
  
  onSubmit(event){
    event.preventDefault();
    this.props.searchDocuments(this.state.search);
    console.log(this.state.search,'gooooooooo');
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });  
  }
  render() {
    let pagination = null;
    const mappedResults = this.props.result.map((document, index) =>
      <div className="col s3" key={document.id}>
        
        <div className="card white darken-1 activator"  style={{ height: 185,  
        backgroundImage: 'url(' + imagePath + ')' }}>
            <div className="card-image waves-effect waves-block waves-light">
              <a className = "btn activator">VIEW</a>
          </div>
          <div className="card-reveal black-text">
            <DocumentTitle title={document.title} />
            <DocumentContent content={renderHTML(document.content)} />
          </div>
          <div className="card-action">
            <div className>{document.title}</div>
            <strong><div className = "right">{document.access}
                 </div></strong>
            <a>Published: {moment(document.createdAt).format('MMMM Do YYYY')}</a> <br/>
            <div className="card-action">
              <Modal
                  header='Edit Document'
                  trigger={
                  <Button className="btn-floating btn-large teal darken-2 right"
                  ><i className="large material-icons">mode_edit</i></Button>
                  }>
                  <form className="col s12" method="post" onSubmit={(e) => 
                    this.onSubmit(e)} >
                  <Row>
                    <Input s={6}  value="DOC ID" />
                    <Input s={6} name = "id" value={document.id} />
                </Row>
                <Row>
                    <Input
                      s={6}
                      name = "title"
                      value={this.state.title === '' 
                      ? document.title : this.state.title}
                      onChange={(e) => this.fieldChange(e)}
                    />
                     <Input  s={6} name = "access" validate type = "select"
                      value={this.state.access === '' ? 
                      document.access : this.state.access} 
                      onChange={(e) => this.fieldChange(e)}> 
                       <option value="public">Public</option>
                       <option value="private">Private</option> 
                    </Input>
                </Row>
                  <Row>
                   <textarea name = "content" value={this.state.content === '' ? 
                   document.content : this.state.content} onChange={(e) => 
                   this.fieldChange(e)} label="Content" 
                   className="materialize-textarea"/>
                </Row>
                <Button className="teal darken-2" type="submit">UPDATE</Button>
              </form>
              </Modal>
              <Button onClick={(e) => this.deleteDoc(document.id)}  
              className="btn-floating btn-large red darken-2 right">
              <i className="large material-icons">delete</i></Button>
            </div>
            <Modal
                header= {<DocumentTitle title={document.title} />}
                trigger={
                  <Button waves='light'>READ MORE</Button>
                }>
                 <DocumentContent content={renderHTML(document.content)} />
            </Modal>
          </div>
        </div>
      </div>
    );
       {pagination ? <Pagination items={pagination.page_count} activePage={2}
        maxButtons={5} onSelect={(e)=>this.onSelect(e)}/> 
        : '<div>Not document</div> '}

    return (
      <div className="row">
        <div>
        <h5 className="green-text">Search for all documents Here..</h5>
      <div>
          <Input
            name = "search"
            id="search"
            s={6}
            label="Search"
            validate
            onChange={(e) => this.onChange(e)}
            className="search">
            <Icon style={{ color: 'white' }} >search</Icon>
          </Input> <br/>
           <Button type="submit" name="action" onClick={this.onSubmit}>
             Click Here <i className="material-icons right">send</i>
           </Button>  <br/><br/><br/>
          <div>
            {mappedResults}
          </div>
          </div>
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
   console.log(state.searchReducers.results, 'wherever');
  return {
    result: state.searchReducers.results,
  };
}
function mapDispatchToProps(dispatch) {
  searchDocuments: (searchTerm) => dispatch(searchDocuments(searchTerm));
}
export default connect(mapStateToProps, { searchDocuments })(Search);
