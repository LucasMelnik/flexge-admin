import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import DateInput from '../../../core/form/DateInput';
import AntTimeInput from '../../../core/form/AntTimeInput';
import Dialog from '../../../core/layout/Dialog';

const CertificationTestScheduleDialog = props => (
  <div
    style={{
      display: 'inline-block'
    }}
  >
    <Button
      icon="calendar"
      onClick={props.onOpen}
    />
    <Dialog
      title="Schedule Certification Test"
      isOpen={props.isOpen}
      onCancel={props.onCancel}
      actions={[
        <Button label="Cancel" key="back" type="danger" onClick={props.onCancel} />,
        <Button label="Confirm" key="submit" type="default" onClick={props.onSubmitSchedule} />,
      ]}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        <DateInput
          label="Date"
          value={props.values.scheduleForDate}
          onChange={value => props.onChange('scheduleForDate', value)}
          errorText={get(props.errors, 'scheduleForDate', null)}
        />
        <div
          style={{
            marginLeft: 10,
          }}
        />
        <AntTimeInput
          label="Hour"
          value={get(props.values, 'scheduleForTime', null)}
          onChange={value => props.onChange('scheduleForTime', value)}
          errorText={get(props.errors, 'scheduleForTime', null)}
        />
      </div>
    </Dialog>
  </div>
);

CertificationTestScheduleDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSubmitSchedule: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    scheduleForDate: PropTypes.any,
    scheduleForTime: PropTypes.any,
  }).isRequired,
  errors: PropTypes.shape({}),
};

CertificationTestScheduleDialog.defaultProps = {
  errors: {},
};

export default CertificationTestScheduleDialog;
