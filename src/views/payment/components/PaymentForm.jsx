import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import moment from 'moment';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FormButtons from '../../../core/form/FormButtons';
import Select from '../../../core/form/Select';
import StudentAutoCompleteContainer from '../../../core/form/StudentAutoCompleteContainer';
import DateInput from '../../../core/form/DateInput';
import MaskInput from '../../../core/form/MaskInput';

const PaymentForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={3}>
        <StudentAutoCompleteContainer
          required
          disabled={props.submitting}
          value={get(props.values, 'student', get(props.values, 'studentSearch', ''))}
          errorText={get(props.errors, 'student', '')}
          onSelect={(student) => props.onChange('student', student)}
          onChange={value => {
            props.onChange('studentSearch', value)
            props.onChange('student', undefined);
          }}
        />
      </Column>
      <Column size={1.5}>
        <Select
          required
          disabled={props.submitting}
          label="Plan"
          value={get(props.values, 'type', [])}
          errorText={get(props.errors, 'type', '')}
          onChange={value => {
            props.onChange('type', value);
            props.onChange('price', {
              MONTHLY: 59.90,
              QUARTERLY: 44.90,
              SEMIANNUALLY: 29.90,
              'KROTON-DEMO': 20.00,
            }[value]);
          }}
          options={[
            { value: 'MONTHLY', label: 'Monthly' },
            { value: 'QUARTERLY', label: 'Quarterly' },
            { value: 'SEMIANNUALLY', label: 'Semiannually' },
            { value: 'KROTON-DEMO', label: 'Kroton' },
          ]}
        />
      </Column>
      <Column size={1.5}>
        <DateInput
          required
          disabled={props.submitting}
          label="Due Date"
          value={get(props.values, 'dueAt', undefined) ? props.values.dueAt.toDate() : undefined}
          onChange={(value) => props.onChange('dueAt', value)}
          errorText={get(props.errors, 'dueAt', '')}
          disabledDate={(date) => {
            if (!date) {
              return false;
            }
            return date.valueOf() <= moment().subtract(1, 'day').valueOf();
          }}
        />
      </Column>
      <Column size={1}>
        <MaskInput
          required
          disabled={props.submitting}
          label="Price (by month)"
          value={get(props.values, 'price', '')}
          onChange={value => props.onChange('price', value)}
          errorText={get(props.errors, 'price', '')}
          maskType="numeral"
        />
      </Column>
      <Column size={1.5}>
        <MaskInput
          disabled={props.submitting || props.values.type === 'KROTON-DEMO'}
          label="Discount (first payment)"
          value={get(props.values, 'discount', '')}
          onChange={value => props.onChange('discount', value)}
          errorText={get(props.errors, 'discount', '')}
          maskType="numeral"
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Payment' : 'Create Payment'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

PaymentForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

PaymentForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default PaymentForm;
