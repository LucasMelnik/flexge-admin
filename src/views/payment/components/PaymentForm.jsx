import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FormButtons from '../../../core/form/FormButtons';
import Select from '../../../core/form/Select';
import StudentAutoCompleteContainer from '../../../core/form/StudentAutoCompleteContainer';

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
          value={get(props.values, 'student', '')}
          onSelect={(student) => props.onChange('student', student)}
          onChange={value => props.onChange('student', value)}
        />
      </Column>
      <Column size={1.5}>
        <Select
          required
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
