import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import TrueFalseAnswerInputContainer from '../inputs/TrueFalseAnswerInputContainer';
import Audios from '../inputs/Audios';
import Column from '../../../../core/layout/Column';
import FileInput from '../../../../core/form/FileInput';
import Row from '../../../../core/layout/Row';

const TrueFalseItemForm = props => (
  <div>
    <TranslationInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
      disabled={props.disabled}
      isTestItem={props.isTestItem}
    />
    <Row>
      <Column size={4}>
        <Audios
          values={props.values}
          submitting={props.submitting}
          disabled={props.disabled}
          onChange={props.onChange}
          errors={props.errors}
        />
      </Column>
      {props.hasImage && (
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
      )}
    </Row>
    <TrueFalseAnswerInputContainer
      value={get(props.values, 'answers', [])}
      onChange={answers => props.onChange('answers', answers)}
      disabled={props.disabled}
    />
  </div>
);

TrueFalseItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
  hasImage: PropTypes.bool,
};

TrueFalseItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
  isTestItem: false,
  hasImage: false,
};

export default TrueFalseItemForm;
