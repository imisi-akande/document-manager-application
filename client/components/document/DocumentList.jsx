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
import { searchDocuments } from '../../actions/SearchDocumentActions';
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
    return this.props.searchDocuments(queryString);
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
    const title = e.target.title.value;
    const access = e.target.access.value;
    const content = this.state.content;
    const documentDetails = { id, title, access, content };
    this.props.updateDocument(documentDetails, true);
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
        className="read-more"
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
            <h5><a href="/documents">Click here to search for another document
              </a></h5>
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
                    <div className="col s3">
                      <div
                        className="card white darken-1 activator"
                        style={{
                          height: '185px'
                        }}
                      >
                        <div
                          className="card-action"
                          id="card-container"
                          style={{ opacity: 0.9 }}
                        >
                          <h5 style={{ color: '#26a69a' }}>{document.title}</h5>
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
                                header="Edit Document"
                                trigger={
                                  <Button
                                    modal="close" waves="light"
                                    className="btn-floating teal darken-2 left"
                                    style={{ marginRight: '5px' }}
                                  >
                                    <i
                                      className="large material-icons"
                                    >
                                      mode_edit</i>
                                  </Button>
                                }
                              >
                                <form
                                  className="col s12" method="post"
                                  onSubmit={e =>
                                    this.onSubmit(e, document.id)}
                                >
                                  <Row>
                                    <Input
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
                                      config={{
                                        plugins: 'link image preview',
                                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright  | code ' // eslint-disable-line max-len
                                      }}
                                      onChange={this.handleEditorChange}
                                    />
                                  </Row>
                                  <Button
                                    modal="close" className="teal darken-2"
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
  updateDocument: React.PropTypes.func.isRequired,
  documentDetails: React.PropTypes.any.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateDocument: documentDetails => dispatch(DocumentAction
    .updateDocument(documentDetails, true)),
  deleteDocument: id => dispatch(DocumentAction.deleteDocument(id)),
  fetchDocuments: offset => dispatch(DocumentAction.fetchDocuments(offset)),
  searchDocuments: queryString => dispatch(searchDocuments(queryString))
});

const mapStateToProps = state => ({
  currentUser: state.user[0],
  documentDetails: state.documents
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentList);

export { DocumentList };
