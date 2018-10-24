import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import FormButtons from '../../../../core/form/FormButtons';
import Select from '../../../../core/form/Select';
import DateInput from '../../../../core/form/DateInput';
import MaskInput from '../../../../core/form/MaskInput';

const ParentForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={4}>
        <TextInput
          required
          disabled={props.submitting}
          label="Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <Column size={2}>
        <MaskInput
          disabled={props.submitting}
          label="CPF"
          value={get(props.values, 'cpf', '')}
          onChange={value => props.onChange('cpf', value)}
          errorText={get(props.errors, 'cpf', '')}
          delimiters={['.', '.', '-']}
          blocks={[3, 3, 3, 2]}
          numericOnly
        />
      </Column>
      <Column size={4}>
        <TextInput
          required
          disabled={props.submitting}
          label="Email"
          value={get(props.values, 'email', '')}
          onChange={value => props.onChange('email', value)}
          errorText={get(props.errors, 'email', null)}
        />
      </Column>
      <Column size={2}>
        <TextInput
          required={!props.values.id}
          type="password"
          disabled={props.submitting}
          label="Password"
          value={get(props.values, 'password', '')}
          onChange={value => props.onChange('password', value)}
          errorText={get(props.errors, 'password', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={3}>
        <Select
          label="Gender"
          disabled={props.submitting}
          value={get(props.values, 'gender', '')}
          onChange={value => props.onChange('gender', value)}
          errorText={get(props.errors, 'gender', null)}
          options={[{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }].map(gender => ({
            label: gender.label,
            value: gender.value,
          }))}
        />
      </Column>
      <Column size={3}>
        <DateInput
          disabled={props.submitting}
          label="Birth Date"
          value={get(props.values, 'birthDate', null)}
          onChange={value => props.onChange('birthDate', value)}
          errorText={get(props.errors, 'birthDate', '')}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Parent' : 'Create Parent'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

ParentForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

ParentForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default ParentForm;
