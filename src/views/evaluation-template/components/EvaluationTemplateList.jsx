import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';
import { Roles } from '../../../core/util';

const EvaluationTemplateList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      ...(localStorage.role === Roles.ADMIN || localStorage.role === Roles.SUPPORT || localStorage.role === Roles.DISTRIBUTOR_MANAGER || localStorage.role === Roles.COMPANY_MANAGER) ? [
        {
          label: 'School',
          path: 'school.name',
          sort: true,
        },
      ] : [],
      ...[
        {
          label: 'Name',
          path: 'name',
          sort: true,
        },
        {
          label: 'Year',
          path: 'year',
          sort: true,
          width: '120px',
        },
        {
          label: 'Actions',
          path: 'action',
          width: '105px',
          render: (cell, row) => (
            <div>
              <Button
                icon="edit"
                onClick={() => browserHistory.push(`/evaluation-templates/${row.id}`)}
              />
              {' '}
              <Button
                icon="delete"
                onClick={() => props.onDelete(row)}
              />
            </div>
          ),
        },
      ],
    ]}
    rows={props.templates}
  />
);

EvaluationTemplateList.propTypes = {
  templates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EvaluationTemplateList;
