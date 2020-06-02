import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
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
        <TextInput
          required
          disabled={props.submitting}
          label="Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <Column size={1.5}>
        <FetchSelect
          url="academic-plans"
          fullWidth
          disabled={props.submitting || !!(props.values.id && props.values.currentCourse)}
          label="Academic Plan"
          value={get(props.values, 'academicPlan', '')}
          onChange={(value) => {
            props.onChange('academicPlan', value);
            props.onChange('currentCourse', null);
          }}
          errorText={get(props.errors, 'academicPlan', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={3}>
        <Select
          multiple
          disabled={props.submitting || !!props.values.id}
          label="Abilities"
          value={get(props.values, 'abilities', [])}
          onChange={value => props.onChange('abilities', value)}
          options={[
            { value: 'READING', label: 'Reading' },
            { value: 'WRITING', label: 'Writing' },
            { value: 'SPEAKING', label: 'Speaking' },
            { value: 'LISTENING', label: 'Listening' },
          ]}
        />
      </Column>
      <Column size={4.5}>
        <FetchSelect
          multiple
          required
          url={`item-types`}
          disabled={props.submitting}
          label="Items Type"
          value={get(props.values, 'itemsType', '')}
          onChange={value => props.onChange('itemsType', value)}
          errorText={get(props.errors, 'itemsType', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    </Row>
    <p>Description</p>
    <Row>
      <Column size={12}>
        <TextInput
          required
          disabled={props.submitting}
          label="Portuguese"
          value={get(props.values, 'description.pt', '')}
          onChange={value => props.onChange('description.pt', value)}
          errorText={get(props.errors, 'description.pt', null)}
        />
      </Column>
      <Column size={12}>
        <TextInput
          required
          disabled={props.submitting}
          label="Spanish"
          value={get(props.values, 'description.es', '')}
          onChange={value => props.onChange('description.es', value)}
          errorText={get(props.errors, 'description.es', null)}
        />
      </Column>
      <Column size={12}>
        <TextInput
          required
          disabled={props.submitting}
          label="English"
          value={get(props.values, 'description.en', '')}
          onChange={value => props.onChange('description.en', value)}
          errorText={get(props.errors, 'description.en', null)}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Unit Type' : 'Create Unit Type'}
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
