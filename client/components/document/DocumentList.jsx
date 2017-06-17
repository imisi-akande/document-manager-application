import renderHTML from 'react-render-html';
import TinyMCE from 'react-tinymce';
import React from 'react';
import { Modal, Button, Row, Input, Pagination } from 'react-materialize';
import moment from 'moment';
import { connect } from 'react-redux';
import DocumentContent from './DocumentContent';
import * as DocumentAction from '../../actions/DocumentActions';
import Auth from '../../util/Auth';


import Prompt from '../common/Prompt';
import { searchDocuments, searchOwnDocuments }
  from '../../actions/SearchDocumentActions';
/**
 *
 *
 * @class DocumentList
 * @extends {React.Component}
 */
class DocumentList extends React.Component {

  /**
   * Creates an instance of DocumentList.
   * @param {undefined} props
   *
   * @memberOf DocumentList
   */
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      content: '',
      access: 'public',
      authorId: '',
      docAccess: false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  /**
   *
   * @param {object} event
   *@returns {nothing} undefined
   * @memberOf DocumentList
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   *
   *
   * @param {object} event
   * @returns {function} function
   * @memberOf DocumentList
   */
  onClick(event) {
    event.preventDefault();
    this.props.deleteDocument().then(() => {
      Materialize.toast('Document successfully deleted.', 5000);
    });
  }

  /**
   *
   *
   * @param {number} pageNo
   * @returns {object} function
   *
   * @memberOf DocumentList
   */
  onSelect(pageNo) {
    const offset = (pageNo - 1) * 10;
    this.props.fetchDocuments(offset);
  }

  /**
   * Handles on search even
   *
   * @param {object} e
   * @returns {object} object
   *
   * @memberOf DocumentList
   */
  onSearch(e) {
    const queryString = e.target.value;
    const locationPath = this.props.location.pathname;
    if (locationPath === '/documents') {
      return this.props.searchDocuments(queryString);
    } else if (locationPath === '/mydocuments') {
      const userId = this.props.currentUser.userId;
      return this.props.searchOwnDocuments(queryString, 0, userId);
    }
  }

  /**
   * Handles onSubmit event
   *
   * @param {object} e
   * @param {number} id
   *@returns {object} object
   * @memberOf DocumentList
   */
  onSubmit(e, id) {
    e.preventDefault();
    const locationPath = this.props.location.pathname;
    const title = e.target.title.value;
    const access = e.target.access.value;
    const content = this.state.content;

    if (content === ' ' ||
    content === '') {
      Materialize.toast('Content Field Cannot Be Empty', 2000);
    } else if (
    title === ' ' ||
    title === '') {
      Materialize.toast('Title Field Cannot Be Empty', 2000);
    } else {
      const documentDetails = { id, title, access, content };
      if (locationPath === '/documents') {
        this.props.updateDocument(documentDetails, true);
      } else if (locationPath === '/mydocuments') {

        this.props.updateDocument(documentDetails);
      }
      $(`#updateDocModal${documentDetails.id}`).modal('close');
    }
  }

  /**
   * Handles Document access
   *
   * @param {object} user
   * @param {object} doc
   * @returns {object} object
   *
   * @memberOf DocumentList
   */
  docAccess(user, doc) {
    return Auth.docAccess(user, doc);
  }

  /**
     *Handle Delete Document
     *
     * @param {number} id
     *@returns {object} object
     * @memberOf DocumentList
     */
  deleteDoc(id) {
    this.props.deleteDocument(id);
  }

  /**
   * Handle Text editor change
   *
   * @param {object} e
   * @returns{object} object
   * @memberOf DocumentList
   */
  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }

  /**
     *Handle editor change
     *
     * @param {object} e
     * @returns {object} object
     *
     * @memberOf DocumentList
     */
  fieldChange(e) {
    return this.setState({ [e.target.name]: e.target.value, });
  }

  /**
   * Documents
   *
   * @returns{object} object
   *
   * @memberOf DocumentList
   */
  render() {
    let pagination = null;
    let doc = [];
    const deleteButton = (
      <Button
        waves="light" id="deletebutton"
        className="btn-floating red darken-2 left"
      >
        <i className="large material-icons">delete</i>
      </Button>
    );
    const readMoreButton = (
      <a
        id="readmore"
        href="readmore"
        className="right"
      >
        READ MORE</a>
    );

    if (this.props.documentDetails.documents &&
        this.props.documentDetails.documents.rows) {
      doc = this.props.documentDetails.documents.rows;
      pagination = this.props.documentDetails.pagination;
    }

    let noDoc = null;

    if (pagination && pagination.total_count === 0) {
      noDoc = (
        <div className="container">
          <div className="row center-align">
            <div style={{ padding: '20px' }} />
            <h5>Sorry there are no documents to display.</h5> <br />
          </div>
        </div>
      );
    }

    return (
      <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <input
          id="doc-search"
          type="search"
          placeholder="search for documents here..."
          onChange={e => this.onSearch(e)}
          name="search"
        />

        { noDoc }

        {
          doc
            ?
              <div className="row">
                {doc.map(document =>
                  <div key={document.id}>
                    <div className="col s12 m6 l4">
                      <div
                        className="card Searching through a list of documents created by a user seems to display white darken-1 activator"
                        style={{
                          height: '185px'
                        }}
                      >
                        <div
                          className="card-action"
                          id="card-container"
                          style={{ opacity: 0.9 }}
                        >
                          <h5 className="card-container2" style={{ color: '#26a69a' }}>{document.title}</h5>
                          <h6
                            style={{ fontSize: '19px', marginTop: '7px' }}
                          >
                            Access: {document.access}
                          </h6>
                          <br />
                          <a>Published: {moment(document.createdAt)
                            .format('MMMM Do YYYY')}
                          </a> <br />

                          <div className="card-action">
                            {this.docAccess(this.props.currentUser, document) ?
                              <Modal
                                id={`updateDocModal${document.id}`}
                                header="Edit Document"
                                trigger={
                                  <Button
                                    modal="close" waves="light"
                                    className="btn-floating teal darken-2 left"
                                    style={{ marginRight: '5px' }}
                                  >
                                    <i
                                      id="editButton"
                                      className="large material-icons"
                                    >
                                      mode_edit</i>
                                  </Button>
                                }
                              >
                                <form
                                  id="submitButton"
                                  className="col s12" method="post"
                                  onSubmit={e =>
                                    this.onSubmit(e, document.id)}
                                >
                                  <Row>
                                    <Input
                                      className="card-title"
                                      s={6} name="title"
                                      defaultValue={document.title}
                                      onChange={e => this.fieldChange(e)}
                                    />
                                    <Input
                                      s={6}
                                      name="access"
                                      validate type="select"
                                      value={this.state.access}
                                      onChange={e => this.fieldChange(e)}
                                    >
                                      <option value="public">Public</option>
                                      <option value="private">Private</option>
                                      <option value="role">role</option>
                                    </Input>
                                  </Row>

                                  <Row>
                                    <TinyMCE
                                      content={document.content}
                                      name="content"
                                      config={{
                                        plugins: 'link image code',
                                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                      }}
                                      onChange={this.handleEditorChange}
                                      className="wysiwyg" required
                                    />
                                  </Row>
                                  <Button
                                    id="updateButton"
                                    className="teal darken-2"
                                    waves="light"
                                    type="submit"
                                  >UPDATE</Button>
                                </form>
                              </Modal> : ''
                            }
                            {
                              this.docAccess(this.props.currentUser, document)
                                ?
                                  <Prompt
                                    trigger={deleteButton}
                                    onClickFunction={
                                      () => this.deleteDoc(document.id)
                                    }
                                  />
                                :
                                  ''
                            }
                          </div>
                          <Modal
                            style={{
                              maxHeight: '100%',
                              width: '100%',
                              bottom: '0%',
                            }}
                            actions={
                              <h2
                                id="close-document-view"
                                className="modal-close"
                                style={{ cursor: 'pointer' }}
                              >
                                <i className="medium material-icons">close</i>
                              </h2>
                            }
                            header={document.title}
                            trigger={readMoreButton}
                          >

                            <DocumentContent
                              content={renderHTML(document.content)}
                            />
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            :
              <h1>No document</h1>
        }
        {
           pagination
            ?
              pagination.total_count > 0 ? <Pagination
                items={pagination.page_count}
                activePage={1} maxButtons={5} onSelect={e => this.onSelect(e)}
              /> : ''
            :
              ''
        }
      </div >
    );
  }
}

DocumentList.propTypes = {
  deleteDocument: React.PropTypes.func.isRequired,
  fetchDocuments: React.PropTypes.func.isRequired,
  searchDocuments: React.PropTypes.func.isRequired,
  searchOwnDocuments: React.PropTypes.func.isRequired,
  updateDocument: React.PropTypes.func.isRequired,
  documentDetails: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,

};

const mapDispatchToProps = dispatch => ({
  updateDocument: (documentDetails, isAdmin) => dispatch(DocumentAction
    .updateDocument(documentDetails, isAdmin)),
  deleteDocument: id => dispatch(DocumentAction.deleteDocument(id)),
  fetchDocuments: offset => dispatch(DocumentAction.fetchDocuments(offset)),
  searchDocuments: queryString => dispatch(searchDocuments(queryString)),
  searchOwnDocuments: (queryString, offset, userId) =>
    dispatch(searchOwnDocuments(queryString, offset, userId))
});

const mapStateToProps = state => ({
  currentUser: state.user[0],
  documentDetails: state.documents
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);

export { DocumentList };
