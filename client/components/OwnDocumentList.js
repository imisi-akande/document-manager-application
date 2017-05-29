import React, { PropTypes } from 'react';
import {Modal, Button, Row, Input, Pagination} from 'react-materialize';
import moment from 'moment';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import DocumentTitle from '../components/DocumentListTitle';
import DocumentContent from '../components/DocumentContent';
import  * as DocumentAction from '../actions/DocumentActions';
import Search from '../components/SearchDocument';
import imagePath from '../img/cardReveal.jpg';
import renderHTML from 'react-render-html';
import TinyMCE from 'react-tinymce';
import Prompt from '../components/Prompt';


class OwnDocumentList extends React.Component {
      constructor (props) {
        super(props);
        const { updateDocument } = this.props;
        const { deleteDocument } = this.props;
        const { fetchOwnDocuments } = this.props;
        this.state = {
        id: '',
        title:  '',
        content: '',
        access: '',
        authorId: ''
      };
    }

    componentDidMount() {
      this.props.fetchOwnDocuments();
    }
    fieldChange(e) {
         return this.setState({ [e.target.name]: e.target.value,  })
      }
    deleteDoc (id) {
       this.props.deleteDocument(id);
    }
    onSelect(pageNo){
      const offset = (pageNo-1) * 10;
      this.props.fetchOwnDocuments(offset);
    }
    onSubmit(e){
    e.preventDefault();
     const id = e.target.id.value;
     const title = e.target.title.value;
     const access = e.target.access.value;
      const content = e.target.content.value;
     const documentDetails = { id, title, access, content};
     this.props.updateDocument(documentDetails);
  }
  render () {
    /**
   * renders the user's Document component
   * @returns {void}
   * @memberOf ownDocumentList
   */
   let pagination = null;
   let doc = null;
   if (this.props.documentDetails !== undefined && 
   this.props.documentDetails.rows !== undefined){
    doc = this.props.documentDetails.rows;
    pagination = this.props.documentDetails.pagination;
   }
    return (
      <div>
   { doc ?
    <div className="col s12 m12 row">    
    {doc.map(document =>
    <div key={document.id}>
        <div className="col s3">
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
               <strong><div className = "right">{document.access}</div></strong>
              <a>Published: {moment(document.createdAt).format('MMMM Do YYYY')}
                </a> <br/>
              <div className="card-action">
                  <Modal
                    header='Edit Document'
                    trigger={
                    <Button waves='light' className =
                    "btn-floating btn-large teal darken-2 right"><i className=
                    "large material-icons">mode_edit</i></Button>
                    }>
                    <form className="col s12" method="post" onSubmit={(e) => 
                      this.onSubmit(e)} >
                  <Row>
                      <Input s={6} name = "title" defaultValue={document.title}
                      onChange={(e) => this.fieldChange(e)} />
                      <Input  s={6} name = "access" validate type = "select" 
                      value={this.state.access === '' ? document.access : 
                      this.state.access} onChange={(e) => this.fieldChange(e)}> 
                       <option value="public">Public</option>
                       <option value="private">Private</option> 
                    </Input>
                  </Row>
                  <Row>
                  <TinyMCE
                    content={document.content}
                    config={{
                      plugins: 'link image preview',
                      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
                    }}
                    onChange={this.handleEditorChange}
                    />
                </Row>
                  <Button className="teal darken-2" waves='light' 
                  type="submit">UPDATE</Button>
                </form>
                </Modal>
                <Prompt
                  trigger={
                    <Button waves='light' 
                    className="btn-floating btn-large red darken-2 right">
                      <i className="large material-icons">delete</i>
                    </Button>
                  }

                  onClickFunction={
                    (e) => {this.deleteDoc(document.id)}
                  }
                />
              </div>
              <Modal
                header= {document.title} 
                trigger={
                  <Button waves='light'>READ MORE</Button>
                }>
                 <DocumentContent content={renderHTML(document.content)} />
            </Modal>
            </div>
          </div>
        </div>
      </div>
      )}
       {pagination ? <Pagination items={pagination.page_count} 
       activePage={2} maxButtons={5} onSelect={(e)=>this.onSelect(e)}/> : ''}
      </div>
      : <div>Not document</div> }
      </div>
      
  );
};
};
const mapDispatchToProps = dispatch => ({
  updateDocument: documentDetails => 
  dispatch(DocumentAction.updateDocument(documentDetails)),
  deleteDocument: id => dispatch(DocumentAction.deleteDocument(id)),
  fetchOwnDocuments: offset => 
  dispatch(DocumentAction.fetchOwnDocuments(offset))
});

const mapStateToProps = (state) => {
  return {
    documentDetails: state.documents.documents
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnDocumentList);
