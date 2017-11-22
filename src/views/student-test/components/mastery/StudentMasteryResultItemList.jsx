import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';
import ItemFormContainer from '../../../item/components/ItemFormContainer';
import StatusItem from '../../../../core/layout/StatusItem';

const StudentMasteryResultItemList = props => (
  <Table
    columns={[
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
    expandableComponent={row => (
      <ItemFormContainer
        itemId={row.item}
        itemsTypeUrl="/item-types?query[allowedForMasteryTest]=true"
        endpointUrl={`students/${props.studentId}/mastery-tests/${props.masteryId}/executions/${props.executionId}/items`}
        timeProperty="defaultMasteryTestTime"
        isTestItem
        disabled
      />
    )}
  />
);

StudentMasteryResultItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  studentId: PropTypes.string.isRequired,
  masteryId: PropTypes.string.isRequired,
  executionId: PropTypes.string.isRequired,
};

export default StudentMasteryResultItemList;
