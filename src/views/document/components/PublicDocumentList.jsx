import React from 'react';
import PropTypes from 'prop-types';
import Async from '../../../core/layout/Async';

const PublicDocumentList = props => (
  <Async fetching={props.fetching}>
    {props.documents.map(document => (
      <ul>
        <li>
          <p
            style={{
              marginBottom: 0,
            }}
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${process.env.REACT_APP_FILES_URL}/${document.fileUrl}`}
            >
              {document.title}
            </a>
          </p>
        </li>
      </ul>
    ))}
  </Async>
);

PublicDocumentList.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    fileUrl: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default PublicDocumentList;
