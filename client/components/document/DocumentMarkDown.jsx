import React from 'react';
import TinyMCE from 'react-tinymce';

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

export default DocumentMarkdown;
