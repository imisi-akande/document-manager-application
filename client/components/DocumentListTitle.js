import React, { propTypes } from 'react';

const DocumentTitle = ({ title }) => {
    console.log(title, 'uuuuuuuuuu');
    return (
        <span className="card-title">{title}</span>
    );
};

export default DocumentTitle;