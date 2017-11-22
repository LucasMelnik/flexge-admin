import React from 'react';
import PropTypes from 'prop-types';
import Separator from '../../../../core/layout/Separator';
import Table from '../../../../core/form/Table';
import UnitItemErrorListFilterContainer from './UnitItemErrorListFilterContainer';

const UnitItemErrorsRecordList = props => (
  <div>
    <UnitItemErrorListFilterContainer />
    <Separator />
    <Table
      fetching={props.fetching}
      columns={[
        {
          label: 'Course',
          path: 'name',
          width: '5%',
        },
        {
          label: 'Module',
          path: 'module.name',
          sort: true,
          width: '10%',
        },
        {
          label: 'Unit',
          path: 'unit.name',
          sort: true,
          width: '10%',
        },
        {
          label: 'Text',
          path: 'item.text',
          width: '25%',
        },
        {
          label: 'Errors',
          path: 'errors',
          width: '20%',
          render: (cell, row) => {
            if (row && row.errors) {
              const errors = row.errors.map(error => error.label).join(', ');
              return (
                <div>{errors}</div>
              );
            }
          },
        },
      ]}
      rows={props.items}
      selectable
      onSelect={row => window.open(`/modules/${row.module.id}/units/${row.unit.id}/items/`, '_blank')}
    />
  </div>
);

UnitItemErrorsRecordList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    unit: PropTypes.PropTypes.shape({}).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default UnitItemErrorsRecordList;
