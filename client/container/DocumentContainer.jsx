import React from 'react';
import { connect } from 'react-redux';
import * as documentAction from '../actions/DocumentActions';
import DocumentForm from '../components/document/DocumentForm';
import DocumentMarkdown from '../components/document/DocumentMarkDown';


/**
 *
 *
 * @class DocumentContainer
 * @extends {React.Component}
 */
class DocumentContainer extends React.Component {

  /**
   * Creates an instance of DocumentContainer.
   * @param {any} props
   * @param {any} context
   *
   * @memberOf DocumentContainer
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: {
        title: '',
        content: '',
        access: 'public',
      },
      error: {},
      saving: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  /**
   *
   *
   * @param {any} event
   * @returns{function} object
   * @memberOf DocumentContainer
   */
  handleFormSubmit(event) {
    event.preventDefault();
    this.props.documentSaver(this.state.document);
    this.setState({ saving: true });
  }

  /**
   *
   *
   * @param {any} event
   * @returns {object} object
   *
   * @memberOf DocumentContainer
   */
  handleEditorChange(event) {
    const document = this.state.document;
    document.content = event.target.getContent({ format: 'raw' });
    return this.setState({ document });
  }

  /**
   *
   *
   * @param {any} event
   * @returns{object} object
   *
   * @memberOf DocumentContainer
   */
  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    return this.setState({ document });
  }

  /**
   *
   *
   * @returns {object} object
   *
   * @memberOf DocumentContainer
   */
  render() {
    return (
      <div className="container">
        <DocumentForm
          document={this.state.document}
          onChange={this.updateDocumentState}
          onSave={this.handleFormSubmit}
          errors={this.state.error}
        />
        <DocumentMarkdown
          document={this.state.document}
          onChange={this.handleEditorChange}
        />
        <center>
          <br />
          <br />
          <button
            type="submit" name="btn_login"
            className="col s12 btn btn-large waves-effect teal darken-2"
            onClick={this.handleFormSubmit}
          >
            Add Document
          </button>
        </center>
      </div>
    );
  }
}

DocumentContainer.defaultProps = {
  document: null,
};

DocumentContainer.propTypes = {
  documentSaver: React.PropTypes.func.isRequired,
};

/**
 *
 *
 * @param {any} dispatch
 * @returns {any} any
 */
const mapDispatchToProps = dispatch => ({
  fetchDocuments: () => dispatch(documentAction.fetchDocuments()),
  documentSaver: document => dispatch(documentAction.documentSaver(document))
});

/**
 *
 *
 * @param {any} state
 * @returns {any} any
 */
const mapStateToProps = () => {
  const document = { title: '', content: '', access: '', authorId: '' };
  return {
    documents: document
  };
};

export { DocumentContainer };
export default connect(mapStateToProps, mapDispatchToProps)(DocumentContainer);
