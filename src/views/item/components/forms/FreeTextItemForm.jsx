import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';

const FreeTextItemForm = props => (
  <div>
    <Row>
      <Column size={12}>
        <TextInput
          fieldType="textarea"
          textAreaRows={4}
          label="Statement"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'text', '')}
          onChange={value => props.onChange('text', value)}
          errorText={get(props.errors, 'text', '')}
        />
      </Column>
    </Row>
    <Row>
      <Column size={6}>
        <TextInput
          label="Min Characters"
          type="number"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'charactersMinLimit', '')}
          onChange={value => props.onChange('charactersMinLimit', value)}
          errorText={get(props.errors, 'charactersMinLimit', '')}
        />
      </Column>
      <Column size={6}>
        <TextInput
          label="Max Characters"
          type="number"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'charactersMaxLimit', '')}
          onChange={value => props.onChange('charactersMaxLimit', value)}
          errorText={get(props.errors, 'charactersMaxLimit', '')}
        />
      </Column>
    </Row>
  </div>
);

FreeTextItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

FreeTextItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
};

export default FreeTextItemForm;
