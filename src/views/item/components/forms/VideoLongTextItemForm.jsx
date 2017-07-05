import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import VideoInputContainer from '../inputs/VideoInputContainer';
import Separator from '../../../../core/layout/Separator';
import FileInput from '../../../../core/form/FileInput';
import TextInput from '../../../../core/form/TextInput';
import Row from '../../../../core/layout/Row'
import Column from '../../../../core/layout/Column'
import SlicesInputContainer from '../inputs/SlicesInputContainer'

const VideoLongTextItemForm = props => (
  <div>
    <Row>
      <Column lgSize={6}>
        <TextInput
          rows={10}
          multiLine
          floatingLabel
          fullWidth
          label="Text"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'text', '')}
          onChange={value => props.onChange('text', value)}
          errorText={get(props.errors, 'text', '')}
        />
      </Column>
      <Column lgSize={6}>
        <SlicesInputContainer
          onChange={(answers) => {
            props.onChange('answers', answers);
            props.onChange('indexesToRemove', answers.filter(slice => slice.index !== undefined)); //this is to show errors
          }}
          text={get(props.values, 'text', '')}
          value={get(props.values, 'answers', [])}
          errorText={get(props.errors, 'indexesToRemove', '')}
          disabled={props.disabled}
        />
      </Column>
    </Row>
    <Separator size="xs" />
    <VideoInputContainer
      onChange={props.onChange}
      errors={props.errors}
      values={props.values}
      submitting={props.submitting}
      requiredCut
      disabled={props.disabled}
    />
    <Separator size="xs" />
    <FileInput
      label="Upload a video to the item"
      accept="video"
      value={get(props.values, 'video', '')}
      onChange={(key) => props.onChange('video', key)}
      errorText={get(props.errors, 'video', '')}
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
  onChange: () => false,
  disabled: false,
};

export default VideoLongTextItemForm;
