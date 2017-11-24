import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';
import ItemFormContainer from '../../../item/components/ItemFormContainer';
import StatusItem from '../../../../core/layout/StatusItem';

const StudentPlacementItemList = props => (
  <Table
    columns={[
      {
        label: 'Item Location',
        render: (cell, row) => `Level: ${row.level} Order: ${row.order}`,
      },
      {
        label: 'Status',
        path: 'correct',
        width: '100',
        render: cell => (
          <StatusItem
            color={{
              CORRECT: '#009687',
              WRONG: '#FF5233',
            }[cell.toUpperCase()]}
            text={cell}
          />
        ),
      },
      {
        label: 'Answer',
        path: 'answer',
      },
    ]}
    rows={props.items}
    expandableComponent={(row) => (
      <ItemFormContainer
        itemId={row.item}
        itemsTypeUrl="/item-types?query[allowedForPlacementTest]=true"
        endpointUrl={`students/${props.studentId}/placement-tests/${props.placementTestId}/items`}
        timeProperty="defaultPlacementTestTime"
        isTestItem
        disabled
      />
    )}
  />
);

StudentPlacementItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  studentId: PropTypes.string.isRequired,
  placementTestId: PropTypes.string.isRequired,
};

export default StudentPlacementItemList;
