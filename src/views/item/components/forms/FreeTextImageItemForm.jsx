import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import FileInput from '../../../../core/form/FileInput';

const FreeTextImageItemForm = props => (
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
      <Column size={4}>
        <FileInput
          label="Upload an image to the item"
          accept="image"
          disabled={props.disabled}
          value={get(props.values, 'image', '')}
          onChange={(key) => props.onChange('image', key)}
          errorText={get(props.errors, 'image', '')}
        />
      </Column>
      <Column size={4}>
        <TextInput
          label="Min Characters"
          type="number"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'charactersMinLimit', '')}
          onChange={value => props.onChange('charactersMinLimit', value)}
          errorText={get(props.errors, 'charactersMinLimit', '')}
        />
      </Column>
      <Column size={4}>
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

FreeTextImageItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

FreeTextImageItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
};

export default FreeTextImageItemForm;
