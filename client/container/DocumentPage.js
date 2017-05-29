import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as documentAction from '../actions/DocumentActions';
import DocumentList from '../components/DocumentList';

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
   * componentDidMount
   * @param {props}  void
   * @return {fetchDocuments} function
   */
  componentDidMount() {
    this.props.fetchDocuments();
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
