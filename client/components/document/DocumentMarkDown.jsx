import React from 'react';
import TinyMCE from 'react-tinymce';

const DocumentMarkdown = ({ document, onChange }) => (
  <div>
    <TinyMCE
      content={document.content}
      config={{
        plugins: 'link image preview',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
      }}
      onChange={onChange}
    />
  </div>);

export default DocumentMarkdown;
