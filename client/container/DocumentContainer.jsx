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
   * @param {object} props
   * @param {object} context
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
   * Handles form submit
   *
   * @param {object} event
   * @returns{function} object
   * @memberOf DocumentContainer
   */
  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.document.content === ' ' ||
    this.state.document.content === '') {
      Materialize.toast('Content Field Cannot Be Empty', 2000);
    } else if (
    this.state.document.title === ' ' ||
    this.state.document.title === '') {
      Materialize.toast('Title Field Cannot Be Empty', 2000);
    } else {
      this.props.documentSaver(this.state.document).then(() => {
        this.setState({
          title: '',
          content: ''
        });
        Materialize.toast('Document Successfully Created', 2000);
      }).catch((err) => {
        Materialize.toast('Please Choose Access Type', 2000);
      });
    }
  }

  /**
   *Handles editor change
   *
   * @param {object} event
   * @returns {object} object
   * @memberOf DocumentContainer
   */
  handleEditorChange(event) {
    const document = this.state.document;
    document.content = event.target.getContent({ format: 'raw' });
    return this.setState({ document });
  }

  /**
   * Update document state
   *
   * @param {object} event
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
   * renders document form and document markdown
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
            id="add-docs"
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
 * map action dispatched
 *
 * @param {object} dispatch
 * @returns {object} object
 */
const mapDispatchToProps = dispatch => ({
  fetchDocuments: () => dispatch(documentAction.fetchDocuments()),
  documentSaver: document => dispatch(documentAction.documentSaver(document))
});

/**
 *map state to props
 *
 * @param {object} state
 * @returns {object} object
 */
const mapStateToProps = () => {
  const document = { title: '', content: '', access: '', authorId: '' };
  return {
    documents: document
  };
};

export { DocumentContainer };
export default connect(mapStateToProps, mapDispatchToProps)(DocumentContainer);
