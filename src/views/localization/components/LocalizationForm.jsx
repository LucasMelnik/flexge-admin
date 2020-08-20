import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Select from '../../../core/form/Select';

const LocalizationForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={2}>
        <Select
          options={[
            {
              label: 'Student',
              value: 'STUDENT',
            },
            {
              label: 'Push Notifications',
              value: 'PUSH_NOTIFICATIONS',
            }
          ]}
          label="Type"
          required
          disabled={props.submitting}
          value={get(props.values, 'type', '')}
          onChange={value => props.onChange('type', value)}
          errorText={get(props.errors, 'key', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          required
          disabled={props.submitting}
          label="Key"
          value={get(props.values, 'key', '')}
          onChange={value => props.onChange('key', value)}
          errorText={get(props.errors, 'key', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <TextInput
          required
          disabled={props.submitting}
          label="Portuguese"
          value={get(props.values, 'portuguese', '')}
          onChange={value => props.onChange('portuguese', value)}
          errorText={get(props.errors, 'portuguese', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <TextInput
          required
          disabled={props.submitting}
          label="English"
          value={get(props.values, 'english', '')}
          onChange={value => props.onChange('english', value)}
          errorText={get(props.errors, 'english', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <TextInput
          required
          disabled={props.submitting}
          label="Spanish"
          value={get(props.values, 'spanish', '')}
          onChange={value => props.onChange('spanish', value)}
          errorText={get(props.errors, 'spanish', null)}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Localization' : 'Create Localization'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

LocalizationForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

LocalizationForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default LocalizationForm;
