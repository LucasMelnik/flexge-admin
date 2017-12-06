import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const StudentList = props => (
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
          label: 'School',
          path: 'schoolClass.school.name',
        },
        {
          label: 'School Class',
          path: 'schoolClass.name',
        },
        {
          label: 'Last PT',
          path: 'lastPlacementResult',
          render: (cell) => {
            if (cell === -2) {
              return 'N/A';
            } else if (cell === -1) {
              return 'Não Finalizado';
            }
            return cell;
          },
        },
      ],
      ...props.editable && [{
        label: 'Actions',
        patch: 'action',
        width: '115px',
        render: (cell, row) => (
          <div>
            <Button
              icon="delete"
              onClick={() => props.onDelete(row)}
            />
            {' '}
            <Button
              icon="edit"
              onClick={() => browserHistory.push(`${props.baseUrl}/students/${row.id}`)}
            />
            {' '}
            <Button
              icon="mail"
              onClick={() => alert('Email sent!')}
            />
          </div>
        ),
      }],
    ]}
    rows={props.students}
    selectable={!!props.onSelect}
    onSelect={row => props.onSelect && props.onSelect(row.id)}
  />
);

StudentList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  baseUrl: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
};

StudentList.defaultProps = {
  onSelect: null,
};

export default StudentList;
