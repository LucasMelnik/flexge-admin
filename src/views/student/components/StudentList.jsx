import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const StudentList = props => (
  <Table
    fetching={props.fetching}
    pagination={props.pagination}
    onChange={props.onChange}
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
          label: 'Initial Level',
          path: 'initialEnglishLevel',
          align: 'center',
          render: (value, row) => value && (
            <span>
              {value}<span style={{ color: 'red' }}>{(row.lastPlacementResult === -2 || row.lastPlacementResult !== value) ? '*' : ''}</span>
            </span>
          ),
        },
        {
          label: 'Current Level',
          path: 'currentEnglishLevel',
          align: 'center',
          render: (cell) => {
            if (cell === -2) {
              return 'N/A';
            } else if (cell === -1) {
              return 'Não Finalizado';
            }
            return cell;
          },
        },
        {
          label: 'Status',
          path: 'deletedAt',
          render: value => value ? `Disabled - ${moment(value).format('DD/MM/YYYY - HH:mm')}` : 'Active',
        },
      ],
      {
        label: 'Actions',
        patch: 'action',
        width: '125px',
        render: (cell, row) => (
          <div>
            {props.editable && (
              <span>
                {row.deleted ? (
                  <span>
                    <Button
                      icon="close"
                      onClick={() => props.onRemove(row)}
                    />
                    {' '}
                    <Button
                      icon="check"
                      onClick={() => props.onRestore(row)}
                    />
                  </span>
                ) : (
                  <span>
                    <Button
                      icon="delete"
                      onClick={() => props.onDisable(row)}
                    />
                    {' '}
                    <Button
                      icon="edit"
                      onClick={() => browserHistory.push(`${props.baseUrl}/students/${row.id}`)}
                    />
                  </span>
                )}
              </span>
            )}
            {!props.hasSchoolClass && (
              <span>
                {row.deleted ? (
                  <Button
                    icon="close"
                    onClick={() => props.onRemove(row)}
                  />
                ) : (
                  <span>
                    <Button
                      icon="delete"
                      onClick={() => props.onDisable(row)}
                    />
                    {' '}
                    <Button
                      icon="folder-open"
                      onClick={() => browserHistory.push(`/records/schools/${row.schoolClass.school.id}/classes/${row.schoolClass.id}/students/${row.id}/detail`)}
                    />
                    {' '}
                    <Button
                      icon="form"
                      onClick={() => browserHistory.push(`/schools/${row.schoolClass.school.id}/classes/${row.schoolClass.id}/students/${row.id}`)}
                    />
                  </span>
                )}
              </span>
            )}
          </div>
        ),
      },
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
  pagination: PropTypes.shape({
    current: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
  }).isRequired,
  baseUrl: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  onDisable: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onRestore: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  hasSchoolClass: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

StudentList.defaultProps = {
  onSelect: null,
};

export default StudentList;
