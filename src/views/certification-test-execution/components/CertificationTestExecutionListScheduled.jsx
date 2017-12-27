import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

class CertificationTestExecutionListScheduled extends Component {
  render() {
    return (
      <Table
        fetching={this.props.fetching}
        columns={[
        {
          label: 'Student',
          path: 'student.name',
          sort: true,
        },
        {
          label: 'Schedule At',
          path: 'scheduledAt',
          render: (cell, row) => {
            return (
              <div>
                {moment(row.scheduledAt).format('DD/MM/YYYY HH:mm')}
              </div>
            );
          },
        },
        {
          label: 'Schedule For',
          path: 'scheduledFor',
          render: (cell, row) => {
            return (
              <div>
                {moment(row.scheduledFor).format('DD/MM/YYYY HH:mm')}
              </div>
            );
          },
        },
        {
          label: 'Actions',
          path: 'action',
          width: '85px',
          render: (cell, row) => {
            return (
              <div>
                <Button
                  icon="play-circle"
                  onClick={() => browserHistory.push(`/certification-test/${row.id}`)}
                />
              </div>
            );
          },
        },
      ]}
      rows={this.props.certificationTests}
    />
  );
  }
}

CertificationTestExecutionListScheduled.propTypes = {
  certificationTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default CertificationTestExecutionListScheduled;
