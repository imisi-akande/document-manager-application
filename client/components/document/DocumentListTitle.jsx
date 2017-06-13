import React from 'react';

const DocumentTitle = ({ title }) =>
  <span className="card-title">{title}</span>;

DocumentTitle.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default DocumentTitle;
