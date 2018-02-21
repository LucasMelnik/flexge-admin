import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const EvaluationTemplateList = props => (
  <Table
    fetching={props.fetching}
    columns={[
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
          <Button
            icon="delete"
            onClick={() => props.onDelete(row)}
          />
        ),
      },
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
