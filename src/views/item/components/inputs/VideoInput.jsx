import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../../core/form/TextInput';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import MaskInput from '../../../../core/form/MaskInput';

const VideoInput = props => (
  <div>
    <Row>
      <Column size={8}>
        <TextInput
          label="Vimeo link"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'videoLink', '')}
          onChange={value => props.onChange('videoLink', value)}
          errorText={get(props.errors, 'videoLink', '')}
          fieldValidation={get(props.errors, 'videoLink', null) && 'error'}
        />
      </Column>
      {props.requiredCut && (
        <Column size={2}>
          <MaskInput
            floatingLabel
            fullWidth
            label="Start time (ex: 01:01:23)"
            disabled={props.submitting || props.disabled}
            value={get(props.values, 'videoStartTime', '')}
            onChange={value => props.onChange('videoStartTime', value)}
            errorText={get(props.errors, 'videoStartTime', '')}
            fieldValidation={get(props.errors, 'videoStartTime', null) && 'error'}
            delimiters={[':']}
            blocks={[2, 2, 2]}
            numericOnly
          />
        </Column>
      )}
      {props.requiredCut && (
        <Column size={2}>
          <MaskInput
            floatingLabel
            fullWidth
            label="End time (ex: 01:01:23)"
            disabled={props.submitting || props.disabled}
            value={get(props.values, 'videoEndTime', '')}
            onChange={value => props.onChange('videoEndTime', value)}
            errorText={get(props.errors, 'videoEndTime', '')}
            fieldValidation={get(props.errors, 'videoEndTime', null) && 'error'}
            delimiters={[':']}
            blocks={[2, 2, 2]}
            numericOnly
          />
        </Column>
      )}
    </Row>
  </div>
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
