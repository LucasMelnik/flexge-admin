import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';
import IconButton from '../../../core/form/IconButton';

const AchievementList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
          label: 'ID',
          path: 'id',
          isKey: true,
          hidden: true,
        },
        {
          label: 'Description',
          path: 'description',
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
          width: '120',
          render: (cell, row) => {
            return (
              <div>
                <IconButton
                  icon="fa-trash"
                  onClick={() => props.onDelete(row)}
                />
                {' '}
                <IconButton
                  icon="fa-edit"
                  onClick={() => browserHistory.push(`/achievements/${row.id}`)}
                />
              </div>
            );
          },
        },
      ]}
      rows={props.achievements}
      expandable
      expandableComponent={row => (
        <Table
          columns={[
            {
              label: 'ID',
              path: 'id',
              isKey: true,
              hidden: true,
            },
            {
              label: 'Position',
              path: 'position',
            },
            {
              label: 'Icon',
              path: 'icon',
              width: '100px',
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
  </Async>
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
