import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import FormButtons from '../../../../core/form/FormButtons';
import LocaleSelect from '../../../../core/form/LocaleSelect';
import Select from '../../../../core/form/Select';

const InstructionForm = props => (
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
          label="Text"
          value={get(props.values, 'text', '')}
          onChange={value => props.onChange('text', value)}
          errorText={get(props.errors, 'text', null)}
        />
      </Column>
      <Column size={3}>
        <Select
          label="Type"
          required
          disabled={props.submitting}
          value={get(props.values, 'type', '')}
          onChange={value => props.onChange('type', value)}
          errorText={get(props.errors, 'type', null)}
          options={[
            {
              label: 'Initial',
              value: 'INITIAL',
            },
            {
              label: 'Between items',
              value: 'BETWEEN_ITEMS',
            },
          ]}
        />
      </Column>
      <Column size={3}>
        <LocaleSelect
          required
          disabled={props.submitting}
          value={get(props.values, 'locale', '')}
          onChange={value => props.onChange('locale', value)}
          errorText={get(props.errors, 'locale', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <input
          type="file"
          disabled={props.submitting}
          value={get(props.values, 'files', '')}
          onChange={value => props.onChange('files', value)}
          accept="audio/*"
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Instruction' : 'Create Instruction'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

InstructionForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

InstructionForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default InstructionForm;
