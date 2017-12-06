import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const AchievementList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Description',
        path: 'description',
        defaultSortOrder: 'ascend',
      },
      {
        label: 'Level',
        path: 'level',
      },
      {
        label: 'Type',
        path: 'type',
      },
      {
        label: 'Icon',
        path: 'icon',
        width: '80px',
        render: cell => (
          cell ? (
            <img
              src={`${process.env.REACT_APP_API_URL}/files/${cell}`}
              alt="icon"
              style={{
                height: 40,
              }}
            />
          ) : (
            'No Icon'
          )
        ),
      },
      {
        label: 'Actions',
        path: 'action',
        width: '105px',
        render: (cell, row) => {
          return (
            <div>
              <Button
                icon="delete"
                onClick={() => props.onDelete(row)}
              />
              {' '}
              <Button
                icon="edit"
                onClick={() => browserHistory.push(`/achievements/${row.id}`)}
              />
            </div>
          );
        },
      },
    ]}
    rows={props.achievements}
    expandableComponent={row => (
      <Table
        columns={[
          {
            label: 'Position',
            path: 'position',
          },
          {
            label: 'Icon',
            path: 'icon',
            width: '105px',
            render: cell => (
              <img
                src={`${process.env.REACT_APP_API_URL}/files/${cell}`}
                alt="icon"
                style={{
                  height: 40,
                }}
              />
            ),
          },
        ]}
        rows={row.iconByPosition}
      />
    )}
  />
);

AchievementList.propTypes = {
  achievements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    icon: PropTypes.string,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AchievementList;
