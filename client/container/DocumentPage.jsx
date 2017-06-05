import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as documentAction from '../actions/DocumentActions';
import DocumentList from '../components/document/DocumentList';
import SearchDocument from '../components/search/SearchDocument';
import {searchDocuments} from '../actions/SearchDocumentActions';
/**
  * @class DocumentPage
  */
class DocumentPage extends React.Component {
  /**
   * @constructor constructor
   * @param {props}  props
   */
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      title: '',
      content: '',
      access: '',
      authorId: '',
      ownerRoleId: '',
    };
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
  }

  /**
   *
   *
   * @param {any} event
   *
   * @memberOf SearchDocument
   */
  onSubmit(event){
    event.preventDefault();
    this.props.searchDocuments(this.state.search);
  }
  /**
   * componentDidMount
   * @param {props}  void
   * @return {fetchDocuments} function
   */
  componentDidMount() {
    this.props.fetchDocuments();
  }

  /**
   *
   *
   * @param {any} event
   *
   * @memberOf SearchDocument
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * redirectToRolePage
   * @returns {Object}  browserHistory
   */
  redirectToRolePage() {
    browserHistory.push('/documents');
  }

  /**
   * render
   * @returns {Object} allFiles
   */
  render() {
    const { documents } = this.props;
    return (
      <div>
        <DocumentList documents={documents} />
      </div>
    );
    return (
      <div className = "row">
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
       <Button type="submit" name="action" onClick={this.onSubmit}>Click Here
       <i className="material-icons right">send</i>
       </Button>  <br/><br/><br/>
      <div className = "row">
      <ul>
        {mappedResults}
      </ul>
      </div>
      </div>
    </div>
)
}
}

/**
 *
 *
 * @param {any} dispatch
 * @returns {any}
 */
const mapDispatchToProps = dispatch => ({
  documentSaver: documents => dispatch(documentAction.documentSaver(documents)),
  fetchDocuments: () => dispatch(documentAction.fetchDocuments()),
  updateDocument: () => dispatch(documentAction.updateDocument())
});

/**
 *
 *
 * @param {any} state
 * @returns {any}
 */
const mapStateToProps = state => ({
  documents: state.documents
});
export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
