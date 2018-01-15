import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Switch from '../../../core/form/Switch';

const CharacterForm = props => (
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
      <Column size={3}>
        <Switch
          required
          disabled={props.submitting}
          value={get(props.values, 'enableForRandom', false)}
          onChange={value => props.onChange('enableForRandom', value)}
          errorText={get(props.errors, 'enableForRandom', null)}
          label="Enable for Random"
          titleOff="No"
          titleOn="Yes"
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Character' : 'Create Character'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

CharacterForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

CharacterForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default CharacterForm;
