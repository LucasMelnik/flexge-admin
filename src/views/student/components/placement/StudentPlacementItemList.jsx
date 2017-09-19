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
        label: 'Item Location',
        render: (cell, row) => `Level: ${row.level} Order: ${row.order}`,
      },
      {
        label: 'Status',
        path: 'correct',
        render: cell =>
        (
          <div
            style={{
              color: '#fff',
              padding: 5,
              fontSize: 12,
              display: 'inline-block',
              fontWeight: 'bold',
              borderRadius: 5,
              backgroundColor: cell ? '#009687' : '#FF5233',
            }}
          >
            {cell ? 'Correct' : 'Wrong'}
          </div>
      ),
      },
      {
        label: 'Answer',
        path: 'answer',
        rowColumnStyle: {
          textOverflow: 'none',
          paddingTop: 5,
          paddingBottom: 5,
          paddingRight: 5,
          whiteSpace: 'normal',
          textAlign: 'justify',
          lineHeight: '18px',
        },
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
