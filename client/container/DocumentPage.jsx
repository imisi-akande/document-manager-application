import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as documentAction from '../actions/DocumentActions';
import DocumentList from '../components/document/DocumentList';

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
    this.state = {
      title: '',
      content: '',
      access: '',
      authorId: '',
    };
    this.redirectToRolePage = this.redirectToRolePage.bind(this);
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
   * @param {any} event
   * @results {any} any
   * @memberOf SearchDocument
   * @returns {any}any
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
  }
}

/**
 *
 *
 * @param {any} dispatch
 * @returns {any}any
 */
const mapDispatchToProps = dispatch => ({
  documentSaver: documents => dispatch(documentAction.documentSaver(documents)),
  fetchDocuments: () => dispatch(documentAction.fetchDocuments()),
  updateDocument: () => dispatch(documentAction.updateDocument())
});
DocumentPage.propTypes = {
  fetchDocuments: PropTypes.any.isRequired,
  documents: PropTypes.any.isRequired,
};
/**
 *
 *
 * @param {any} state
 * @returns {any}any
 */
const mapStateToProps = state => ({
  documents: state.documents
});

export { DocumentPage };
export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
