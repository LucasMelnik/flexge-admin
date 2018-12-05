import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import VideoInputContainer from '../inputs/VideoInputContainer';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import TextInput from '../../../../core/form/TextInput';
import SpellCheckInputContainer from '../inputs/SpellCheckInputContainer';
import Column from '../../../../core/layout/Column';
import Row from '../../../../core/layout/Row';

const VideoShortItemForm = props => (
  <div>
    <TextInput
      label="Title"
      disabled={props.submitting || props.disabled}
      value={get(props.values, 'title', '')}
      onChange={value => props.onChange('title', value)}
      errorText={get(props.errors, 'title', '')}
    />
    <Row>
      <Column size={12}>
        <TextInput
          required
          label="Text"
          fieldType="textarea"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'text', '')}
          onChange={value => props.onChange('text', value)}
          errorText={get(props.errors, 'text', '')}
        />
      </Column>
    </Row>
    {!props.isTestItem && (
      <TranslationInputContainer
        onChange={props.onChange}
        submitting={props.submitting}
        values={props.values}
        errors={props.errors}
        disabled={props.disabled}
      />
    )}
    <SpellCheckInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      disabled={props.disabled}
    />
    <VideoInputContainer
      onChange={props.onChange}
      errors={props.errors}
      values={props.values}
      submitting={props.submitting}
      requiredCut
      disabled={props.disabled}
    />
  </div>
);

VideoShortItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
};

VideoShortItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
  isTestItem: false,
};

export default VideoShortItemForm;
