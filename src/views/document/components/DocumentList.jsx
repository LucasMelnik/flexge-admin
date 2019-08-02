import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const DocumentList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Title',
        path: 'title',
        sort: true,
        defaultSortOrder: 'ascend',
      },
      {
        label: 'File',
        path: 'fileUrl',
        render: value => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${process.env.REACT_APP_FILES_URL}/${value}`}
          >
            {value}
          </a>
        ),
      },
      {
        label: 'Actions',
        path: 'action',
        width: '100px',
        render: (cell, row) => (
          <div>
            <Button
              icon="edit"
              onClick={() => browserHistory.push(`/documents/${row.id}`)}
            />
            {' '}
            <Button
              icon="delete"
              onClick={() => props.onDelete(row)}
            />
          </div>
        ),
      },
    ]}
    rows={props.documents}
  />
);

DocumentList.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DocumentList;
