import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../../core/form/TextInput';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import MaskInput from '../../../../core/form/MaskInput';

const VideoInput = props => (
  <Row>
    <Column lgSize={8}>
      <TextInput
        floatingLabel
        fullWidth
        label="Youtube link"
        disabled={props.submitting || props.disabled}
        value={get(props.values, 'videoLink', '')}
        onChange={value => props.onChange('videoLink', value)}
        errorText={get(props.errors, 'videoLink', '')}
      />
    </Column>
    {props.requiredCut && (
      <Column lgSize={2}>
        <MaskInput
          floatingLabel
          fullWidth
          label="Start time"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'videoStartTime', '')}
          onChange={value => props.onChange('videoStartTime', value)}
          errorText={get(props.errors, 'videoStartTime', '')}
          delimiters={[':']}
          blocks={[2, 2]}
          numericOnly
        />
      </Column>
    )}
    {props.requiredCut && (
      <Column lgSize={2}>
        <MaskInput
          floatingLabel
          fullWidth
          label="End time"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'videoEndTime', '')}
          onChange={value => props.onChange('videoEndTime', value)}
          errorText={get(props.errors, 'videoEndTime', '')}
          delimiters={[':']}
          blocks={[2, 2]}
          numericOnly
        />
      </Column>
    )}
  </Row>
);

VideoInput.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  requiredCut: PropTypes.bool,
  disabled: PropTypes.bool,
};

VideoInput.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  requiredCut: false,
  onChange: () => false,
  disabled: false,
};

export default VideoInput;
