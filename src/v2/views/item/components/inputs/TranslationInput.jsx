import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';

const TranslationInput = props => (
  <Row>
    <Column lgSize={props.isTestItem ? 12 : 6}>
      <TextInput
        label="Text"
        fieldType="textarea"
        disabled={props.submitting || props.disabled}
        value={get(props.values, 'text', '')}
        onChange={value => props.onChange('text', value)}
        description={get(props.errors, 'text', '')}
        fieldValidation={get(props.errors, 'text', null) && 'error'}
      />
    </Column>
    {!props.isTestItem && (
      <Column lgSize={6}>
        <TextInput
          label="Translation"
          fieldType="textarea"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'translation', '')}
          onChange={value => props.onChange('translation', value)}
          description={get(props.errors, 'translation', '')}
          fieldValidation={get(props.errors, 'translation', null) && 'error'}
        />
      </Column>
    )}
  </Row>
);

TranslationInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
};

TranslationInput.defaultProps = {
  values: {},
  errors: {},
  disabled: false,
  isTestItem: false,
};

export default TranslationInput;
