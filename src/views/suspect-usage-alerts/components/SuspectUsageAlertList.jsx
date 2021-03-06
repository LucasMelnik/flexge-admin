import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tooltip } from 'antd';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';
import Tag from '../../../core/layout/Tag';
import { formatTimeFromSeconds } from '../../../core/util';

const SuspectUsageAlertList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Studied At',
        path: 'createdAt',
        render: value => moment(value).format('DD/MM/YYYY HH:mm'),
        width: '140px'
      },
      {
        label: 'Student',
        path: 'student.name',
      },
      {
        label: 'Classroom',
        path: 'student.schoolClass.name',
      },
      {
        label: 'School',
        path: 'student.schoolClass.school.name',
      },
      {
        label: 'Studied time',
        path: 'studiedTime',
        render: value => formatTimeFromSeconds(value),
        width: '100px',
      },
      {
        label: 'Repeats',
        path: 'repeatCount',
        align: 'center',
        width: '100px',
        render: (value, row) => (
          <div>
            {value}
            {' '}
            {row.suspiciousFields.filter(item => item.field === 'repeatCount').map(item => <Tag key={`${row.id}-${item.field}`} color="red">{item.percentage}%</Tag>)}
          </div>
        )
      },
      {
        label: 'Listens',
        path: 'listenCount',
        align: 'center',
        width: '100px',
        render: (value, row) => (
          <div>
            {value}
            {' '}
            {row.suspiciousFields.filter(item => item.field === 'listenCount').map(item => <Tag key={`${row.id}-${item.field}`} color="red">{item.percentage}%</Tag>)}
          </div>
        )
      },
      {
        label: 'Records',
        path: 'recordCount',
        align: 'center',
        width: '100px',
        render: (value, row) => (
          <div>
            {value}
            {' '}
            {row.suspiciousFields.filter(item => item.field === 'recordCount').map(item => <Tag key={`${row.id}-${item.field}`} color="red">{item.percentage}%</Tag>)}
          </div>
        )
      },
      {
        label: 'Reads',
        path: 'readCount',
        align: 'center',
        width: '100px',
        render: (value, row) => (
          <div>
            {value}
            {' '}
            {row.suspiciousFields.filter(item => item.field === 'readCount').map(item => <Tag key={`${row.id}-${item.field}`} color="red">{item.percentage}%</Tag>)}
          </div>
        )
      },
      {
        label: 'Translates',
        path: 'translateCount',
        align: 'center',
        width: '100px',
        render: (value, row) => (
          <div>
            {value}
            {' '}
            {row.suspiciousFields.filter(item => item.field === 'translateCount').map(item => <Tag key={`${row.id}-${item.field}`} color="red">{item.percentage}%</Tag>)}
          </div>
        )
      },
      {
        label: 'Away count',
        path: 'userAwayCount',
        align: 'center',
        width: '100px',
        render: (value, row) => (
          <div>
            {value}
            {' '}
            {row.suspiciousFields.filter(item => item.field === 'userAwayCount').map(item => <Tag key={`${row.id}-${item.field}`} color="red">{item.percentage}%</Tag>)}
          </div>
        )
      },
      {
        label: 'Errors',
        path: 'errorCount',
        align: 'center',
        width: '100px',
        render: (value, row) => (
          <div>
            {value}
            {' '}
            {row.suspiciousFields.filter(item => item.field === 'errorCount').map(item => <Tag key={`${row.id}-${item.field}`} color="red">{item.percentage}%</Tag>)}
          </div>
        )
      },
      {
        label: 'Resolved At',
        path: 'reviewedAt',
        render: value => value && moment(value).format('DD/MM/YYYY HH:mm'),
        width: '140px'
      },
      {
        label: 'Actions',
        path: 'action',
        width: '105px',
        render: (cell, row) => {
          return !row.reviewedAt && (
            <div>
              <Tooltip placement="top" title="Resolve alert">
                <span>
                  <Button
                    icon="issues-close"
                    onClick={() => props.onReview(row)}
                  />
                </span>
              </Tooltip>
              {' '}
              <Tooltip placement="top" title="Delete alert">
                <span>
                  <Button
                    icon="delete"
                    onClick={() => props.onDelete(row)}
                  />
                </span>
              </Tooltip>
            </div>
          );
        },
      },
    ]}
    rows={props.alerts}
    pagination={props.pagination}
    onChange={props.onChange}
  />
);

SuspectUsageAlertList.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReview: PropTypes.func.isRequired,
  pagination: PropTypes.shape({}).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default SuspectUsageAlertList;
