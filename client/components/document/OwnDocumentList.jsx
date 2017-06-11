import React from 'react';
import renderHTML from 'react-render-html';
import TinyMCE from 'react-tinymce';
import { Modal, Button, Row, Input, Pagination } from 'react-materialize';
import moment from 'moment';
import { connect } from 'react-redux';
import DocumentTitle from '../../components/document/DocumentListTitle';
import DocumentContent from '../../components/document/DocumentContent';
import * as DocumentAction from '../../actions/DocumentActions';
import imagePath from '../../img/cardReveal.jpg';
import Prompt from '../../components/common/Prompt';
import { searchOwnDocuments } from '../../actions/SearchDocumentActions';


/**
 *
 *
 * @class OwnDocumentList
 * @extends {React.Component}
 */
class OwnDocumentList extends React.Component {

  /**
   * Creates an instance of OwnDocumentList.
   * @param {any} props
   *
   * @memberOf OwnDocumentList
   */
  constructor(props) {
    super(props);
    // const { updateDocument } = this.props;
    // const { deleteDocument } = this.props;
    // const { fetchOwnDocuments } = this.props;
    this.state = {
      id: '',
      title: '',
      content: '',
      access: 'public',
      authorId: ''
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  /**
   *
   *
   *@returns {object}object
   * @memberOf OwnDocumentList
   */
  componentDidMount() {
    this.props.fetchOwnDocuments();
  }

  /**
   *
   *
   * @param {any} e
   * @returns {object} object
   *
   * @memberOf OwnDocumentList
   */
  onSearch(e) {
    const queryString = e.target.value;
    return this.props.searchOwnDocuments(queryString);
  }

  /**
   *
   *
   * @param {any} pageNo
   *@returns {object}object
   * @memberOf OwnDocumentList
   */
  onSelect(pageNo) {
    const offset = (pageNo - 1) * 10;
    this.props.fetchOwnDocuments(offset);
  }

  /**
   *
   *
   * @param {any} e
   * @param {any} documentId
   *@returns{object}object
   * @memberOf OwnDocumentList
   */
  onSubmit(e, documentId) {
    e.preventDefault();
    const title = e.target.title.value;
    const access = e.target.access.value;
    const content = this.state.content;
    // const id = this.state.id;
    const documentDetails = { id: documentId, title, access, content };
    this.props.updateDocument(documentDetails);
  }

  /**
   *
   *
   * @param {any} e
   * @returns {object}object
   *
   * @memberOf OwnDocumentList
   */
  fieldChange(e) {
    return this.setState({ [e.target.name]: e.target.value, });
  }

  /**
   *
   *
   * @param {any} id
   *@returns{object} object
   * @memberOf OwnDocumentList
   */
  deleteDoc(id) {
    this.props.deleteDocument(id);
  }
   /**
   *
   *
   * @param {any} e
   *@returns{object}object
   * @memberOf DocumentList
   */
  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }

  /**
   *
   *
   * @returns{object}object
   *
   * @memberOf OwnDocumentList
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
      <Button className="read-more" waves="red">READ MORE</Button>
      // <Link to="#" className="read-more" waves="light">READ MORE</Link>
    );
    if (this.props.documentDetails !== undefined &&
      this.props.documentDetails.rows !== undefined) {
      doc = this.props.documentDetails.rows;
      pagination = this.props.documentDetails.pagination;
    }
    return (
      <div>
        <input
          id="doc-search"
          type="search"
          placeholder="search for documents here..."
          onChange={e => this.onSearch(e)} name="search"
        />
        {doc ?
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
                      className="card-image waves-effect waves-block
                    waves-light"
                    >
                      <a className="btn activator">PREVIEW</a>
                    </div>

                    <div className="card-reveal black-text">
                      <DocumentTitle title={document.title} />
                      <DocumentContent content={renderHTML(document.content)} />
                    </div>

                    <div className="card-action">
                      <div className>{document.title}</div>
                      <strong><div className="right">{document.access}</div>
                      </strong>
                      <a>Published: {moment(document.createdAt)
                        .format('MMMM Do YYYY')}
                      </a> <br />

                      <div className="card-action">
                        <Modal
                          header="Edit Document"
                          trigger={
                            <Button
                              modal="close" waves="light"
                              className="btn-floating  teal darken-2 left"
                            >
                              <i className="large material-icons">mode_edit
                                </i></Button>
                          }
                        >
                          <form
                            className="col s12" method="post" onSubmit={e =>
                              this.onSubmit(e, document.id)}
                          >

                            <Row>
                              <Input
                                s={6} name="title" defaultValue={document.title}
                                onChange={e => this.fieldChange(e)}
                              />
                              <Input
                                s={6} name="access" validate type="select"
                                value={this.state.access === '' ?
                                 document.access :
                                  this.state.access} onChange={e =>
                                   this.fieldChange(e)}
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
                        </Modal>
                        <Prompt
                          trigger={
                            <Button
                              waves="light"
                              className="btn-floating red darken-2 left"
                            >
                              <i className="large material-icons">delete</i>
                            </Button>
                          }

                          onClickFunction={
                            () => { this.deleteDoc(document.id); }
                          }
                        />
                      </div>
                      <Modal
                        style={{
                          maxHeight: '100%',
                          width: '100%',
                          bottom: '0%',
                          top: '-1'
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
          : <div>No document</div>}
        {Pagination ? <Pagination
          items={Pagination.page_count}
          activePage={2} maxButtons={5} onSelect={e => this.onSelect(e)}
        /> : ''}
      </div>

    );
  }
}
OwnDocumentList.propTypes = {
  fetchOwnDocuments: React.PropTypes.func.isRequired,
  searchOwnDocuments: React.PropTypes.func.isRequired,
  updateDocument: React.PropTypes.func.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  // documentDetails: React.PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch => ({
  updateDocument: documentDetails =>
    dispatch(DocumentAction.updateDocument(documentDetails)),
  deleteDocument: id => dispatch(DocumentAction.deleteDocument(id)),
  fetchOwnDocuments: offset =>
    dispatch(DocumentAction.fetchOwnDocuments(offset)),
  searchOwnDocuments: queryString => dispatch(searchOwnDocuments(queryString))
});

const mapStateToProps = state => ({
  documentDetails: state.documents.documents
});

export { OwnDocumentList };

export default connect(mapStateToProps, mapDispatchToProps)(OwnDocumentList);
