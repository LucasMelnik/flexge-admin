import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import FileInput from '../../../../core/form/FileInput';

const PresentationItemForm = props => (
  <div>
    <Row>
      <Column lgSize={12}>
        <TextInput
          floatingLabel
          fullWidth
          label="Title (The field is just required for Vocabulary units.)"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'title', '')}
          onChange={value => props.onChange('title', value)}
          errorText={get(props.errors, 'title', '')}
        />
      </Column>
    </Row>
    <TranslationInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
      disabled={props.disabled}
    />
    <Row>
      <Column lgSize={6}>
        <FileInput
          accept="audio"
          value={get(props.values, 'audio', '')}
          onChange={(key) => props.onChange('audio', key)}
          errorText={get(props.errors, 'audio', '')}
        />
      </Column>
      <Column lgSize={6}>
        <FileInput
          accept="image"
          value={get(props.values, 'image', '')}
          onChange={(key) => props.onChange('image', key)}
          errorText={get(props.errors, 'image', '')}
        />
      </Column>
    </Row>
  </div>
);

PresentationItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

PresentationItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
  disabled: false,
};

export default PresentationItemForm;
