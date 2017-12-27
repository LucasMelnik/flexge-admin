import React, { Component } from 'react';
import get from 'lodash/get';
import moment from 'moment';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';
import Dialog from '../../../core/layout/Dialog';
import DateInput from '../../../core/form/DateInput';
import AntTimeInput from '../../../core/form/AntTimeInput';

class CertificationTestExecutionListPending extends Component {
  state = {
    visible: false,
    certificationTest: '',
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
              render: (cell, row) => {
                return (
                  <div>
                    {moment(row.scheduledAt).format('DD/MM/YYYY HH:mm')}
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
                      icon="calendar"
                      onClick={() =>{
                       this.setState({ visible: true, certificationTest: row });
                       this.props.onChange('scheduleForDate', moment(row.scheduledFor));
                       this.props.onChange('scheduleForTime', moment(row.scheduledFor));
                      }}
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
            <Button label="Confirm" key="submit" type="default" onClick={() => this.props.onSubmitSchedule(this.state.certificationTest, this.handleCancel)} />,
          ]}
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <DateInput
              label="Date"
              value={this.props.values.scheduleForDate}
              onChange={value => this.props.onChange('scheduleForDate', value)}
              errorText={get(this.props.errors, 'scheduleForDate', null)}
            />
            <div
              style={{
                marginLeft: 10,
              }}
            />
            <AntTimeInput
              label="Hour"
              value={get(this.props.values, 'scheduleForTime', null)}
              onChange={value => this.props.onChange('scheduleForTime', value)}
              errorText={get(this.props.errors, 'scheduleForTime', null)}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

CertificationTestExecutionListPending.propTypes = {
  certificationTests: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSubmitSchedule: PropTypes.func.isRequired,
};

CertificationTestExecutionListPending.defaultProps = {
  values: {},
  errors: {},
};

export default CertificationTestExecutionListPending;
