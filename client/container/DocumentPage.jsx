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
   *fetch user's document
   *
   * @param {props}  void
   * @return {fetchDocuments} function
   */
  componentDidMount() {
    this.props.fetchDocuments();
  }

  /**
   *
   * @param {object} event
   * @results {object} object
   * @memberOf SearchDocument
   * @returns {object}object
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
 * @param {object} dispatch
 * @returns {object}object
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
 * @param {object} state
 * @returns {object}object
 */
const mapStateToProps = state => ({
  documents: state.documents
});

export { DocumentPage };
export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
