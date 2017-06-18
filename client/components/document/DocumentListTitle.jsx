import React from 'react';

/**
 * Renders DocumentTitle component
 *
 * @param  {object} title
 * @return {object} Document title
 */
const DocumentTitle = ({ title }) =>
  <span className="card-title">{title}</span>;

DocumentTitle.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default DocumentTitle;
