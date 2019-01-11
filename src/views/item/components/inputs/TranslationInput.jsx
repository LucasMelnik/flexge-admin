import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';

const TranslationInput = props => (
  <Row>
    <Column size={6}>
      <TextInput
        label="Translation"
        fieldType="textarea"
        disabled={props.submitting || props.disabled}
        value={get(props.values, 'translation', '')}
        onChange={value => props.onChange('translation', value)}
        errorText={get(props.errors, 'translation', '')}
      />
    </Column>
    <Column size={6}>
      <TextInput
        label="Spanish Translation"
        fieldType="textarea"
        disabled={props.submitting || props.disabled}
        value={get(props.values, 'spanishTranslation', '')}
        onChange={value => props.onChange('spanishTranslation', value)}
        errorText={get(props.errors, 'spanishTranslation', '')}
      />
    </Column>
  </Row>
);

TranslationInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

TranslationInput.defaultProps = {
  values: {},
  errors: {},
  disabled: false,
  submitting: false,
};

export default TranslationInput;
