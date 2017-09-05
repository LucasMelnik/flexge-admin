import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';

const StudentPlacementItemList = props => (
  <Table
    columns={[
      {
        label: 'ID',
        path: 'id',
        isKey: true,
        hidden: true,
      },
      {
        label: 'Status',
        path: 'correct',
        render: (cell) => {
          return cell ? 'Correct' : 'Wrong';
        },
      },
      {
        label: 'Answer',
        path: 'answer',
      },
    ]}
    rows={props.items}
  />
);

StudentPlacementItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default StudentPlacementItemList;
