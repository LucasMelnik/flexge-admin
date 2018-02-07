import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import Audios from '../inputs/Audios';

const TextItemForm = props => (
  <div>
    <Row>
      <Column size={12}>
        <TextInput
          fieldType="textarea"
          label="Text"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'text', '')}
          onChange={value => props.onChange('text', value)}
          errorText={get(props.errors, 'text', '')}
          textAreaRows="15"
        />
      </Column>
    </Row>
    <Audios values={props.values} />
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
  disabled: false,
};

export default TextItemForm;
