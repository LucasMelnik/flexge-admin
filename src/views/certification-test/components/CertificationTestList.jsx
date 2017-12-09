import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import get from 'lodash/get';
import moment from 'moment';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';
import Dialog from '../../../core/layout/Dialog';
import DateInput from '../../../core/form/DateInput';
import AntTimeInput from '../../../core/form/AntTimeInput';
import ImagePreview from '../../../core/layout/ImagePreview';

class CertificationTestList extends Component {
  state = {
    visible: false,
    certificationTest: '',
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    return (
      <form>
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
              label: 'Enabled At',
              path: 'enabledAt',
              render: (cell, row) => {
                return (
                  <div>
                    {moment(row.scheduledAt).format('DD/MM/YYYY HH:mm')}
                  </div>
                );
              },
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
              render: (cell, row) => {
                if (row.document) {
                  return (
                    <ImagePreview src={row.document} />
                  );
                }
              },
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
                    {!row.enabledAt && (
                      <Button
                        icon="calendar"
                        onClick={() =>{
                         this.setState({ visible: true, certificationTest: row });
                         this.props.onChange('scheduleForDate', moment(row.scheduledFor));
                         this.props.onChange('scheduleForTime', moment(row.scheduledFor));
                        }}
                      />
                    )}
                    {' '}
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
        <Dialog
          title="Schedule For Certification Test"
          isOpen={this.state.visible}
          onCancel={this.handleCancel}
          actions={[
            <Button label="Cancel" key="back" type="danger" onClick={this.handleCancel} />,
            <Button label="Confirm" key="submit" type="default" onClick={() => this.props.onSubmitSchedule(this.state.certificationTest, this.handleCancel)} />
          ]}
        >
          <div
            style={{
              display: 'flex'
            }}
          >
            <DateInput
              label="Date"
              showTime
              value={this.props.values.scheduleForDate}
              onChange={value => this.props.onChange('scheduleForDate', value)}
              errorText={get(this.props.errors, 'scheduleForDate', null)}
            />
            <div
              style={{
                marginLeft: 10,
              }}
            />
            <AntTimeInput label="Hour"
              value={get(this.props.values, 'scheduleForTime', null)}
              onChange={value => this.props.onChange('scheduleForTime', value)}
              errorText={get(this.props.errors, 'scheduleForTime', null)}
            />
          </div>
        </Dialog>
      </form>
    )
  }
}

CertificationTestList.propTypes = {
  certificationTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onSubmitSchedule: PropTypes.func.isRequired,
};

export default CertificationTestList;
