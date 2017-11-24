import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import VideoInputContainer from '../inputs/VideoInputContainer';
import TextInput from '../../../../core/form/TextInput';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import SlicesInputContainer from '../inputs/SlicesInputContainer';

const VideoLongTextItemForm = props => (
  <div>
    <TextInput
      label="Title"
      disabled={props.submitting || props.disabled}
      value={get(props.values, 'title', '')}
      onChange={value => props.onChange('title', value)}
      errorText={get(props.errors, 'title', '')}
    />
    <Row>
      <Column size={6}>
        <TextInput
          fieldType="textarea"
          label="Text"
          textAreaRows="25"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'text', '')}
          onChange={value => props.onChange('text', value)}
          description={get(props.errors, 'text', '')}
          fieldValidation={get(props.errors, 'text', null) && 'error'}
        />
      </Column>
      <Column size={6}>
        <SlicesInputContainer
          onChange={(answers) => {
            props.onChange('answers', answers);
            props.onChange('indexesToRemove', answers.filter(slice => slice.index !== undefined)); // this is to show errors
          }}
          text={get(props.values, 'text', '')}
          value={get(props.values, 'answers', [])}
          errorText={get(props.errors, 'indexesToRemove', '')}
          disabled={props.disabled}
        />
      </Column>
    </Row>
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

VideoLongTextItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

VideoLongTextItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
};

export default VideoLongTextItemForm;
