import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from "../../../../core/layout/Row";
import Column from "../../../../core/layout/Column";
import TextInput from "../../../../core/form/TextInput";

const TextItemForm = props => (
  <div>
    <Row>
      <Column lgSize={12}>
        <TextInput
          fieldType="textarea"
          label="Text"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'text', '')}
          onChange={value => props.onChange('text', value)}
          description={get(props.errors, 'text', '')}
          fieldValidation={get(props.errors, 'text', null) && 'error'}
        />
      </Column>
    </Row>
  </div>
);

TextItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

TextItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
  disabled: false,
};

export default TextItemForm;
