import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Select from '../../../core/form/Select';
import Button from '../../../core/form/Button';
import StudentRecordSelectContainer from '../../message/components/StudentRecordSelectContainer';
import RangeDateInput from '../../../core/form/RangeDateInput';

const PaymentListFilter = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={2}>
        <RangeDateInput
          label="Creation Period"
          disabled={props.fetching}
          onChange={(dates) => {
            props.onChange('from', dates[0]);
            props.onChange('to', dates[1]);
          }}
          placeholder={['Created From', 'Created To']}
          value={[get(props.values, 'from', undefined), get(props.values, 'to', undefined)]}
          errorText={get(props.errors, 'from', '')}
        />
      </Column>
      <Column size={1.5}>
        <Select
          disabled={props.submitting}
          label="Plan"
          value={get(props.values, 'type', [])}
          onChange={value => props.onChange('type', value)}
          options={[
            { value: 'MONTHLY', label: 'Monthly' },
            { value: 'QUARTERLY', label: 'Quarterly' },
            { value: 'SEMIANNUALLY', label: 'Semiannually' },
            { value: 'KROTON-DEMO', label: 'Kroton' },
          ]}
        />
      </Column>
      <Column size={1.5}>
        <Select
          disabled={props.submitting}
          label="Status"
          value={get(props.values, 'status', [])}
          onChange={value => props.onChange('status', value)}
          options={[
            { value: 'DRAFT', label: 'Draft' },
            { value: 'PENDING', label: 'Pending' },
            { value: 'PAYED', label: 'Payed' },
            { value: 'CANCELLED', label: 'Cancelled' },
            { value: 'EXPIRED', label: 'Expired' },
          ]}
        />
      </Column>
      <Column size={3}>
        <StudentRecordSelectContainer
          disabled={props.submitting}
          value={get(props.values, 'student', '')}
          onSelect={(student) => {
            props.onChange('student', student);
          }}
          onChange={value => {
            props.onChange('student', value);
          }}
        />
      </Column>
      <Column size={1}>
        <div style={{ height: 43 }}></div>
        <Button
          icon="reload"
          buttonType="submit"
          disabled={props.submitting}
          onClick={props.submitting}
          label="Search"
        />
      </Column>
    </Row>
  </form>
);

PaymentListFilter.propTypes = {
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

PaymentListFilter.defaultProps = {
  values: {},
  submitting: false,
  onSubmit: () => alert('submitted'),
};

export default PaymentListFilter;
