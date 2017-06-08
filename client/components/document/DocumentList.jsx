import renderHTML from 'react-render-html';
import TinyMCE from 'react-tinymce';
import React from 'react';
import { Modal, Button, Row, Input, Pagination } from 'react-materialize';
import moment from 'moment';
import { connect } from 'react-redux';
import DocumentTitle from './DocumentListTitle';
import DocumentContent from './DocumentContent';
import * as DocumentAction from '../../actions/DocumentActions';
import imagePath from '../../img/cardReveal.jpg';
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
   * @param {any} props
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
   * @param {any} event
   *@returns {function} function
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
   * @param {any} event
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
   * @param {any} pageNo
   * @returns {function} function
   *
   * @memberOf DocumentList
   */
  onSelect(pageNo) {
    const offset = (pageNo - 1) * 10;
    this.props.fetchDocuments(offset);
  }

  /**
   *
   *
   * @param {any} e
   * @returns {function} function
   *
   * @memberOf DocumentList
   */
  onSearch(e) {
    const queryString = e.target.value;
    return this.props.searchDocuments(queryString);
  }

  /**
   *
   *
   * @param {any} e
   * @param {any} id
   *@returns {any} any
   * @memberOf DocumentList
   */
  onSubmit(e, id) {
    e.preventDefault();
    const title = e.target.title.value;
    const access = e.target.access.value;
    const content = this.state.content;
    const documentDetails = { id, title, access, content };
    this.props.updateDocument(documentDetails);
  }

  /**
   *
   *
   * @param {any} user
   * @param {any} doc
   * @returns {any} any
   *
   * @memberOf DocumentList
   */
  docAccess(user, doc) {
    return Auth.docAccess(user, doc);
  }
  /**
     *
     *
     * @param {any} id
     *@returns {object} object
     * @memberOf DocumentList
     */
  deleteDoc(id) {
    this.props.deleteDocument(id);
  }

  /**
   *
   *
   * @param {any} e
   * @returns{any} any
   * @memberOf DocumentList
   */
  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }
  /**
     *
     *
     * @param {any} e
     * @returns {object} object
     *
     * @memberOf DocumentList
     */
  fieldChange(e) {
    return this.setState({ [e.target.name]: e.target.value, });
  }

  /**
   *
   *
   * @returns{any} any
   *
   * @memberOf DocumentList
   */
  render() {
    let pagination = null;
    let doc = null;
    const deleteButton = (
      <Button waves="light" className="btn-floating red darken-2 left">
        <i className="large material-icons">delete</i>
      </Button>
    );
    const readMoreButton = (
      <Button className="read-more" waves="light">READ MORE</Button>
    );

    if (this.props.documentDetails.documents &&
      this.props.documentDetails.documents.rows) {
      doc = this.props.documentDetails.documents.rows;
      pagination = this.props.documentDetails.pagination;
    }

    return (
      <div>
        <input
          id="doc-search"
          type="search"
          placeholder="search for documents here..."
          onChange={e => this.onSearch(e)}
          name="search"
        />
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
                          height: 185, backgroundImage: `url(${imagePath})`
                        }}
                      >
                        <div
                          className="card-image waves-effect waves-block waves-light" // eslint-disable-line max-len
                        >
                          <a className="btn activator">PREVIEW</a>
                        </div>

                        <div className="card-reveal black-text">
                          <DocumentTitle
                            title={document.title}
                          />
                          <DocumentContent
                            content={renderHTML(document.content)}
                          />
                        </div>

                        <div
                          className="card-action"
                        >
                          <div
                            className
                          >{document.title}</div>
                          <strong>
                            <div className="right">{document.access}</div>
                          </strong>
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
                                  >
                                    <i className="large material-icons">
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
                                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright' // eslint-disable-line max-len
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
              <div>No document</div>
        }
        {
          pagination
            ?
              <Pagination
                items={pagination.page_count}
                activePage={2} maxButtons={5} onSelect={e => this.onSelect(e)}
              />
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
  currentUser: React.PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateDocument: documentDetails => dispatch(DocumentAction
    .updateDocument(documentDetails)),
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
