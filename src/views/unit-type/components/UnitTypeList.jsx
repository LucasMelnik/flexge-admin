import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const UnitTypeList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Academic Plan',
        path: 'academicPlan.name',
        sort: true,
        defaultSortOrder: 'ascend',
      },
      {
        label: 'Name',
        path: 'name',
        sort: true,
      },
      {
        label: 'Description',
        path: 'description.pt',
      },
      {
        label: 'Abilities',
        path: 'abilities',
        render: value => value.reduce((acc, item, index) => acc.concat(index ? ', ' : '').concat(startCase(item.toLowerCase())), '')
      },
      {
        label: 'Actions',
        path: 'action',
        width: '75px',
        render: (cell, row) => {
          return (
            <div>
              <Button
                icon="edit"
                onClick={() => browserHistory.push(`/unit-types/${row.id}`)}
              />
            </div>
          );
        },
      },
    ]}
    rows={props.types}
  />
);

UnitTypeList.propTypes = {
  types: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UnitTypeList;
