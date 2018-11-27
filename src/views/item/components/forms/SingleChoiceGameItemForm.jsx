import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import FileInput from '../../../../core/form/FileInput';
import AnswersInputContainer from '../inputs/AnswersInputContainer';

const SingleChoiceGameItemForm = props => (
  <div>
    <Row>
      <Column size={12}>
        <TextInput
          required
          label="Text"
          fieldType="input"
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
    </Row>
    <AnswersInputContainer
      value={get(props.values, 'answers', [])}
      onChange={answers => props.onChange('answers', answers)}
      errorText={get(props.errors, 'answers', '')}
      type="SINGLE_CHOICE_GAME"
      disabled={props.disabled}
    />
  </div>
);

SingleChoiceGameItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

SingleChoiceGameItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
};

export default SingleChoiceGameItemForm;
