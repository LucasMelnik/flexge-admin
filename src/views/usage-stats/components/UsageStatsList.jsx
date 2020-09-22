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
          render: (value, row) => ({
            children: row.academicPlan ? row.academicPlan.name : row.name,
            props: {
              style: {
                backgroundColor: row.academicPlan ? '#fff' : '#eee',
              },
            }
          })
        },
        {
          label: 'Active Students',
          path: 'activeStudents',
          sort: true,
          width: '150px',
          align: 'center',
          render: (cell, row) => ({
            children: cell || 0,
            props: {
              style: {
                backgroundColor: row.academicPlan ? '#fff' : '#eee',
              },
            }
          })
        },
        {
          label: 'Placement Tests Only',
          path: 'placementCount',
          width: '180px',
          sort: true,
          align: 'center',
          render: (cell, row) => ({
            children: cell || 0,
            props: {
              style: {
                backgroundColor: row.academicPlan ? '#fff' : '#eee',
              },
            }
          })
        },
        {
          label: 'Students to Charge',
          path: 'chargeVariation',
          width: '180px',
          sort: true,
          align: 'center',
          render: (value, row) => ({
            children: (
              <div>
                {(row.activeStudents || 0) - (row.placementCount || 0)}
                {!!row.chargeVariation && (
                  <React.Fragment>
                    <ColumnSeparator/>
                    <Tag color={row.chargeVariation > 0 ? 'green' : 'red'}>
                      {round(row.chargeVariation, 1)}%
                    </Tag>
                  </React.Fragment>
                )}
              </div>
            ),
            props: {
              style: {
                backgroundColor: row.academicPlan ? '#fff' : '#eee',
              },
            }
          }),
        },
        {
          label: 'Studied Time',
          path: 'studiedHours',
          width: '150px',
          sort: true,
          align: 'center',
          render: (value, row) => ({
            children: formatTimeFromSeconds(value, 'hh:mm'),
            props: {
              style: {
                backgroundColor: row.academicPlan ? '#fff' : '#eee',
              },
            }
          })
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
