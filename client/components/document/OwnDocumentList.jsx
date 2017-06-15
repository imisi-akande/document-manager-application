import React from 'react';
import renderHTML from 'react-render-html';
import TinyMCE from 'react-tinymce';
import { Modal, Button, Row, Input, Pagination } from 'react-materialize';
import moment from 'moment';
import { connect } from 'react-redux';
import DocumentContent from '../../components/document/DocumentContent';
import * as DocumentAction from '../../actions/DocumentActions';
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
   *
   * @param {object} props
   *
   * @memberOf OwnDocumentList
   */
  constructor(props) {
    super(props);
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
   *ComponentDidMount
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
   * @param {object} e
   * @returns {object} object
   *
   * @memberOf OwnDocumentList
   */
  onSearch(e) {
    const queryString = e.target.value;
    console.log('okay', queryString);
    return this.props.searchOwnDocuments(queryString);
  }

  /**
   * onSelect event for pagination
   *
   * @param {Number} pageNo
   *@returns {object}object
   * @memberOf OwnDocumentList
   */
  onSelect(pageNo) {
    const offset = (pageNo - 1) * 10;
    this.props.fetchOwnDocuments(offset);
  }

  /**
   * onSubmit event
   *
   * @param {object} e
   * @param {Number} documentId
   *@returns{object}object
   * @memberOf OwnDocumentList
   */
  onSubmit(e, documentId) {
    e.preventDefault();
    const title = e.target.title.value;
    const access = e.target.access.value;
    const content = this.state.content;
    const documentDetails = { id: documentId, title, access, content };
    this.props.updateDocument(documentDetails);
  }

  /**
   *fieldChange event
   *
   * @param {object} e
   * @returns {object}object
   * @memberOf OwnDocumentList
   */
  fieldChange(e) {
    return this.setState({ [e.target.name]: e.target.value, });
  }

  /**
   *Handles delete document
   *
   * @param {Number} id
   *@returns{object} object
   * @memberOf OwnDocumentList
   */
  deleteDoc(id) {
    this.props.deleteDocument(id);
  }

   /**
   *Handles editor change
   *
   * @param {object} e
   *@returns{object}object
   * @memberOf DocumentList
   */
  handleEditorChange(e) {
    this.setState({ content: e.target.getContent() });
  }

  /**
   * render method
   *
   * @returns{object}object
   *
   * @memberOf OwnDocumentList
   */
  render() {
    let pagination = null;
    let totalCount = null;
    let doc = null;
    const deleteButton = (
      <Button
        waves="light" id="deleteDocs"
        className="btn-floating red darken-2 left"
      >
        <i className="large material-icons">delete</i>
      </Button>
    );
    const readMoreButton = (
      <a
        href="readmore"
        className="read-more"
      >READ MORE</a>
    );
    if (this.props.documentDetails !== undefined &&
      this.props.documentDetails.rows.userDocuments !== undefined) {
      doc = this.props.documentDetails.rows.userDocuments.documents.rows;
      pagination = this.props.documentDetails.rows.pagination;
      totalCount = (pagination.total_count);
    }

    let noDoc = null;

    if (totalCount === 0) {
      noDoc = (
        <div className="container">
          <div className="row center-align">
            <div style={{ padding: '20px' }} />
            <h5>Sorry there are no documents to display.</h5>
          </div>
        </div>
      );
    }

    return (
      <div>


        { noDoc }

        {doc ?
          <div className="row">
            {doc.map(document =>
              <div key={document.id}>
                <div className="col s3">
                  <div
                    className="card white darken-1 activator"
                    style={{ height: 185 }}
                  >
                    <div
                      className="card-action"
                      id="card-container"
                      style={{ opacity: 0.9 }}
                    >
                      <h5
                        style={{ color: '#26a69a' }}
                      >{document.title}
                      </h5>
                      <h6 style={{ fontSize: '19px', marginTop: '7px' }}>
                        Access: {document.access}
                      </h6>
                      <br />
                      <a>Published: {moment(document.createdAt)
                        .format('MMMM Do YYYY')}
                      </a> <br />

                      <div className="card-action">
                        <Modal
                          header="Edit Document" id="editDocument"
                          trigger={
                            <Button
                              modal="close" waves="light" id="update"
                              className="btn-floating  teal darken-2 left"
                              style={{ marginRight: '5px' }}
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
                              id="updateDocument"
                              type="submit"
                            >UPDATE</Button>
                          </form>
                        </Modal>
                        <Prompt
                          trigger={
                            <Button
                              waves="light" id="deleteButton"
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
          : <h1>No document</h1>}
        {Pagination ? <Pagination
          items={Pagination.page_count}
          activePage={1} maxButtons={5} onSelect={e => this.onSelect(e)}
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
  documentDetails: React.PropTypes.obj,
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
