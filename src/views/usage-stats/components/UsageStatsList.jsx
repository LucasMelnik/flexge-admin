import React from 'react';
import PropTypes from 'prop-types';
import round from 'lodash/round';
import { formatTimeFromSeconds } from '../../../core/util';
import Table from '../../../core/form/Table';
import Tag from '../../../core/layout/Tag';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';

const UsageStatsList = props => (
  <div>
    <Table
      rowKey={row => row.academicPlan ? `${row.academicPlan.id}-${row.school}` : row.id}
      fetching={props.fetching}
      columns={[
        {
          label: 'School',
          path: 'name',
          defaultSortOrder: 'asc',
          sort: true,
          render: (value, row) => row.academicPlan ? row.academicPlan.name : row.name,
        },
        {
          label: 'Active Students',
          path: 'activeStudents',
          sort: true,
          width: '150px',
          align: 'center',
          render: cell => cell || 0,
        },
        {
          label: 'Placement Tests Only',
          path: 'placementCount',
          width: '180px',
          sort: true,
          align: 'center',
          render: cell => cell || 0,
        },
        {
          label: 'Students to Charge',
          path: 'charge',
          width: '180px',
          sort: true,
          align: 'center',
          render: (value, row) => !row.children ? 0 : row.children ? (
            <div>
              {row.activeStudents - row.placementCount}
            </div>
          ) : (
            <div>
              {row.activeStudents - row.placementCount}
              {!!row.chargeVariation && (<ColumnSeparator />)}
              {!!row.chargeVariation && (
                <Tag color={row.chargeVariation > 0 ? 'green' : 'red'}>
                  {round(row.chargeVariation, 1)}%
                </Tag>
              )}
            </div>
          ),
        },
        {
          label: 'Studied Time',
          path: 'studiedHours',
          width: '150px',
          sort: true,
          align: 'center',
          render: value => formatTimeFromSeconds(value, 'hh:mm'),
        },
      ]}
      rows={props.schools}
      showTableCount={false}
    />
    {!!props.schools.length && (
      <div
        style={{
          display: 'flex',
          padding: '5px 0px',
          border: '1px solid #e8e8e8',
          borderTop: 'none',
        }}
      >
        <span
          style={{
            display: 'flex',
            flex: 1,
            paddingLeft: 10,
          }}
        >
          Total
        </span>
        <span
          style={{
            width: 150,
            textAlign: 'center',
          }}
        >
          {props.schools.reduce((acc, school) => acc + (school.activeStudents || 0), 0)}
        </span>
        <span
          style={{
            width: 180,
            textAlign: 'center',
          }}
        >
          {props.schools.reduce((acc, school) => acc + (school.placementCount || 0), 0)}
        </span>
        <span
          style={{
            width: 180,
            textAlign: 'center',
          }}
        >
          {props.schools.reduce((acc, school) => acc + ((school.activeStudents || 0) - (school.placementCount || 0)), 0)}
        </span>
        <span
          style={{
            width: 150,
            textAlign: 'center',
          }}
        >
          {formatTimeFromSeconds(props.schools.reduce((acc, school) => acc + (school.studiedHours || 0), 0), 'hh:mm')}
        </span>
      </div>
    )}
  </div>
);

UsageStatsList.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    activeStudents: PropTypes.number,
    placementCount: PropTypes.number,
    studiedHours: PropTypes.number,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default UsageStatsList;
