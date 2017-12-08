import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';
import Dialog from '../../../core/layout/Dialog';
import DateInput from '../../../core/form/DateInput';

class CertificationTestList extends Component {
  state = {
    visible: false,
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div>
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
            },
            {
              label: 'Schedule For',
              path: 'scheduledFor',
            },
            {
              label: 'Enabled At',
              path: 'enabledAt',
            },
            {
              label: 'Started At',
              path: 'startedAt',
            },
            {
              label: 'Completed At',
              path: 'completedAt',
            },
            {
              label: 'Reviewed At',
              path: 'reviewedAt',
            },
            {
              label: 'Approved At',
              path: 'approvedAt',
            },
            {
              label: 'Failed At',
              path: 'failedAt',
            },
            {
              label: 'Document',
              path: 'document',
            },
            {
              label: 'Comments',
              path: 'comments',
            },
            {
              label: 'Actions',
              path: 'action',
              width: '85px',
              render: (cell, row) => {
                return (
                  <div>
                    <Button
                      icon="calendar"
                      onClick={() => this.setState({ visible: true })}
                    />
                    {' '}
                    <Button
                      icon="edit"
                      onClick={() => browserHistory.push(`/certification-test/${row.id}`)}
                    />
                  </div>
                );
              },
            },
          ]}
          rows={this.props.certificationTests}
        />
        <Dialog
          title="Form Certification Test"
          isOpen={this.state.visible}
          onCancel={this.handleCancel}
          actions={[
            <Button
              label="Cancel"
              key="back"
              onClick={this.handleCancel}
            />,
            <Button
              label="Confirm"
              key="submit"
              type="primary"
              onClick={this.handleOk}
            />,
          ]}
        >
          <DateInput
            label="Schedule For"
            value={get(this.props.values, 'scheduleFor', null)}
            onChange={value => this.props.onChange('scheduleFor', value)}
            errorText={get(this.props.errors, 'scheduleFor', '')}
          />
        </Dialog>
      </div>
    );
  }
}

CertificationTestList.propTypes = {
  certificationTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

CertificationTestList.defaultProps = {
  values: {},
  errors: {},
};

export default CertificationTestList;
