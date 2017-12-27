import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';

const FreeSpeakItemForm = props => (
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
  </div>
);

FreeSpeakItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

FreeSpeakItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
};

export default FreeSpeakItemForm;
