import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FormButtons from '../../../core/form/FormButtons';
import FetchSelect from '../../../core/form/FetchSelect';
import Select from '../../../core/form/Select';

const PaymentForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={3}>
        <FetchSelect
          required
          showSearch
          isPaginated
          url="schools"
          disabled={props.submitting}
          label="School"
          value={get(props.values, 'school', '')}
          onChange={school => props.onChange('school', school)}
          errorText={get(props.errors, 'school', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={2}>
        <FetchSelect
          required
          isPaginated
          showSearch
          url={`schools/${get(props.values, 'school', undefined)}/classes`}
          disabled={props.submitting || !get(props.values, 'school', undefined)}
          label="Classroom"
          value={get(props.values, 'schoolClass', '')}
          onChange={value => props.onChange('schoolClass', value)}
          errorText={get(props.errors, 'schoolClasses', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={2.5}>
        <FetchSelect
          required
          url={`schools/${get(props.values, 'school', undefined)}/classes/${get(props.values, 'schoolClass', undefined)}/students`}
          disabled={props.submitting || !get(props.values, 'school', undefined) || !get(props.values, 'schoolClass', undefined)}
          label="Students"
          params={{
            query: {
              onlyRemoved: false,
            }
          }}
          value={get(props.values, 'student', '')}
          onChange={students => props.onChange('student', students)}
          errorText={get(props.errors, 'student', '')}
          resultTransformer={{
            text: 'name',
            textFunc: item => `${item.name} - ${item.email}`,
            value: 'id',
          }}
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
