import React from 'react';
import TinyMCE from 'react-tinymce';

/**
* Document MarkDown
*
* @param {Object} props { document, onChange }
* @returns {Object} jsx object
*/
const DocumentMarkdown = ({ document, onChange }) => (
  <div>
    <TinyMCE
      content={document.content}
      config={{
        plugins: 'link image preview code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
      }}
      onChange={onChange}
    />
  </div>);

DocumentMarkdown.propTypes = {
  document: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.object.isRequired,
};

export default DocumentMarkdown;
