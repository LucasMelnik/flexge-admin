import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import FormButtons from '../../../../core/form/FormButtons';
import MaskInput from '../../../../core/form/MaskInput';

const ParentForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={6}>
        <TextInput
          required
          disabled={props.submitting}
          label="Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
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
        <TextInput
          disabled={props.submitting}
          placeholder="Father, Mother, Sister"
          label="Contact Type"
          value={get(props.values, 'contactType', '')}
          onChange={value => props.onChange('contactType', value)}
          errorText={get(props.errors, 'contactType', null)}
        />
      </Column>
      <Column size={3}>
        <MaskInput
          floatingLabel
          fullWidth
          disabled={props.submitting}
          label="Contact Phone"
          value={get(props.values, 'contactPhone', '')}
          onChange={value => props.onChange('contactPhone', value)}
          errorText={get(props.errors, 'contactPhone', '')}
          maskType="phone"
        />
      </Column>
      <Column size={6}>
        <TextInput
          disabled={props.submitting}
          label="Observations"
          value={get(props.values, 'observation', '')}
          onChange={value => props.onChange('observation', value)}
          errorText={get(props.errors, 'observation', null)}
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
