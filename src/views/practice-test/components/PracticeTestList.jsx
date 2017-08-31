import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';
import IconButton from '../../../core/form/IconButton';

const PracticeTestList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
          label: 'ID',
          path: 'id',
          isKey: true,
          hidden: true,
        },
        {
          label: 'Practice Test',
          path: 'index',
        },
        {
          label: 'Name',
          path: 'name',
        },
        {
          label: 'Actions',
          path: 'action',
          width: '120',
          render: (cell, row) => {
            return (
              <div>
                <IconButton
                  icon="fa-trash"
                  onClick={() => props.onDelete(row.id)}
                />
                {' '}
                <IconButton
                  icon="fa-edit"
                  onClick={() => browserHistory.push(`/practice-tests/${row.id}`)}
                />
              </div>
            );
          },
        },
      ]}
      rows={props.practiceTests}
    />
  </Async>
);

PracticeTestList.propTypes = {
  practiceTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
};

PracticeTestList.defaultProps = {
  onDelete: null,
};

export default PracticeTestList;
