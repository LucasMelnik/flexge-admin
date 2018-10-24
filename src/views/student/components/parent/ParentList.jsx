import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';
import Button from '../../../../core/form/Button';

const ParentList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      ...[
        {
          label: 'Name',
          path: 'name',
          sort: true,
          defaultSortOrder: 'ascend',
        },
        {
          label: 'Email',
          path: 'email',
          sort: true,
        },
        {
          label: 'CPF',
          path: 'cpf',
        },
        {
          label: 'Sexo',
          path: 'gender',
        },
      ],
      {
        label: 'Actions',
        patch: 'action',
        width: '125px',
        render: (cell, row) => (
          <div>
            <Button
              icon="delete"
              onClick={() => props.onDelete(row)}
            />
            {' '}
            <Button
              icon="edit"
              onClick={() => props.onEdit(row)}
            />
          </div>
        ),
      },
    ]}
    rows={props.parents}
  />
);

ParentList.propTypes = {
  parents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ParentList;
