import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';
import ItemFormContainer from '../../../item/components/ItemFormContainer';

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
    expandable
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
